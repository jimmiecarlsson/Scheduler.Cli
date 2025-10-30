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


builder.Services.AddScoped<SevenDaysService>();

//CORS
var corsPolicy = "FrontendPolicy";
builder.Services.AddCors(options =>
    {
        options.AddPolicy(corsPolicy, policy => 
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
            .AllowAnyHeader()
            .AllowAnyMethod());
    }
);



var app = builder.Build();

// Dev
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors(corsPolicy);
app.MapControllers();

// Add endpoints in /Controllers/

app.Run();

