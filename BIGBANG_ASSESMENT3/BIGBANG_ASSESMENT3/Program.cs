using BIGBANG_ASSESMENT3.Context;
using BIGBANG_ASSESMENT3.Interface;
using BIGBANG_ASSESMENT3.Models;
using BIGBANG_ASSESMENT3.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AdminContext>(op => op.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));
builder.Services.AddScoped<ITravelagentRepo, TravelAgentRepo>();
builder.Services.AddScoped<IGalleryRepo, ImagegalleryRepo>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                     {
                           new OpenApiSecurityScheme
                             {
                                 Reference = new OpenApiReference
                                 {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                 }
                             },
                             new string[] {}

                     }
                 });
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

      // Adding Jwt Bearer
      .AddJwtBearer(options =>
      {
          options.SaveToken = true;
          options.RequireHttpsMetadata = false;
          options.TokenValidationParameters = new TokenValidationParameters()
          {
              ValidateIssuer = true,
              ValidateAudience = true,
              ValidAudience = builder.Configuration["JWT:ValidAudience"],
              ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
          };
      });
builder.Services.AddCors(options =>
{
    options.AddPolicy("Corspolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Corspolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();
app.Run();
