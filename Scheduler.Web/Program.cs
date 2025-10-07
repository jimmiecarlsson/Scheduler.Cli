using Scalar.AspNetCore;
using Scheduler.Application;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(opt =>
        opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles); //Added to prohibit circular cycles

builder.Services.AddScoped<SevenDaysService>();


var app = builder.Build();

// Dev
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.MapControllers();

// Add endpoints in /Controllers/

app.Run();

