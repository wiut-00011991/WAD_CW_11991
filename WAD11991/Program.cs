using Microsoft.EntityFrameworkCore;
using WAD11991.DAL.Data;
using WAD11991.DAL.Repositories;
using WAD11991.DAL.Models;

var allowSpecificOrigins = "_allowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(allowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
}); // add cors to allow send requests with any headers/methods from the origin of localhost:4200
// localhost:4200 is where Angular app runs

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TaskTrackerDbContext>(options =>
    options.UseSqlServer(
            builder.Configuration.GetConnectionString("TaskTrackerConnectionString")
        )
    );

builder.Services.AddScoped<IRepository<TaskItem>, TaskItemRepository>();
builder.Services.AddScoped<IRepository<ProjectItem>, ProjectItemRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(allowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
