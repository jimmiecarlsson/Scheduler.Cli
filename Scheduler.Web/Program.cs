using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Scheduler.Application;
using Scheduler.Web.Data;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; //Added to prohibit circular cycles
    });

builder.Services.AddDbContext<SchedulerDbContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDataProtection();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.BearerScheme;
    options.DefaultChallengeScheme = IdentityConstants.BearerScheme;
})
.AddBearerToken(IdentityConstants.BearerScheme);


// Identity med cookies
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<SchedulerDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDataProtection();



builder.Services.AddScoped<SevenDaysService>();

//CORS
var corsPolicy = "FrontendPolicy";
builder.Services.AddCors(options =>
    {
        options.AddPolicy(corsPolicy, policy => 
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            );
    }
);

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender>();


var app = builder.Build();

// Dev
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    await IdentitySeeder.SeedAsync(roleManager, userManager);
}




app.UseHttpsRedirection();
app.UseCors(corsPolicy);


app.MapIdentityApi<IdentityUser>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Add endpoints in /Controllers/

app.Run();

