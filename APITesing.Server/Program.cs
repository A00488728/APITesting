using Microsoft.EntityFrameworkCore;
using APITesing.Server.Data;
using APITesing.Server.Models;
using APITesing.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy => {
            policy.WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

string DefaultConnection = "Server=dev.cs.smu.ca;Database=u2410;User Id=u2410;Password=WheelReadyThen57;TrustServerCertificate=True;";

try
{
    builder.Services.AddDbContext<DatabaseContext>(options =>
        options.UseSqlServer(
            DefaultConnection,
            sqlServerOptions => sqlServerOptions.EnableRetryOnFailure()));
    builder.Services.AddHttpContextAccessor();
}
catch (Exception e)
{
    Console.WriteLine(e.Message);
}


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowSpecificOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();