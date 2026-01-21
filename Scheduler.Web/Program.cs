using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using OpenAI.Chat;
using Scalar.AspNetCore;
using Scheduler.Application;
using Scheduler.Web.Data;
using System.ClientModel;

var builder = WebApplication.CreateBuilder(args);


// DotNetEnv
DotNetEnv.Env.Load();

// Open AI

var token = Environment.GetEnvironmentVariable("OPENAI_TOKEN");

if (string.IsNullOrWhiteSpace(token))
    throw new Exception("OPENAI_TOKEN is missing");

builder.Services.AddSingleton(_ =>
    new ChatClient(
        model: "gpt-4o-mini",
        credential: new ApiKeyCredential(token)
    )
);


// Database
builder.Services.AddDbContext<SchedulerDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity (utan UI, utan redirects — rätt för API)
builder.Services.AddIdentityCore<IdentityUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<SchedulerDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();


// Cookie authentication (API-style: returnera 401, inte redirect)
builder.Services.AddAuthentication(IdentityConstants.BearerScheme)
    .AddCookie(IdentityConstants.BearerScheme, options =>
    {
        options.LoginPath = string.Empty; // inga redirect-vägar
        options.AccessDeniedPath = string.Empty;

        options.Cookie.SameSite = SameSiteMode.None;   // <- KRITISK
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

        // Ingen redirect för API
        options.Events.OnRedirectToLogin = ctx =>
        {
            ctx.Response.StatusCode = 401;
            return Task.CompletedTask;
        };

        options.Events.OnRedirectToAccessDenied = ctx =>
        {
            ctx.Response.StatusCode = 403;
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddControllers();

// CORS
var corsPolicy = "Frontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// Identity API endpoints (ex: /login, /register, /logout)
builder.Services.AddOpenApi();
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender>();

var app = builder.Build();


// Dev tools
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Seed roles/users
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    await IdentitySeeder.SeedAsync(roleManager, userManager);
}

app.UseHttpsRedirection();
app.UseCors(corsPolicy);

app.UseAuthentication();
app.UseAuthorization();

// Identity API (login, logout, manage, reset password, etc.)
app.MapIdentityApi<IdentityUser>();

// Controllers
app.MapControllers();

app.Run();
