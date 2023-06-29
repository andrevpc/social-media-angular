using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

using Security.Jwt;

using Back;
using Back.Model;
using Back.Services;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ProjetoAngularContext>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IForumRepository, ForumRepository>();
builder.Services.AddTransient<IPostRepository, PostRepository>();

builder.Services.AddTransient<ISecurityService, SecurityService>();


builder.Services.AddTransient<IPasswordProvider>(
    p => new PasswordProvider("senhadoandre"));

builder.Services.AddTransient<JwtService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MainPolicy",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
        });
});

// builder.Services.AddTransient<INewUser<UserTable>, NewUser>(); 

var app = builder.Build();

app.UseCors();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();