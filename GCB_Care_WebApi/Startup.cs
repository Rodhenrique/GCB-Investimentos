using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using GCB_CARE_API.Interfaces;
using GCB_CARE_API.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace GCB_Care_WebApi
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
          .AddMvc()
          .AddJsonOptions(options => {
              options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
              options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
          })

          // Define a versão do .NET Core
          .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "GCB.Care.WebApi", Version = "v1" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services
              .AddAuthentication(options =>
              {
                  options.DefaultAuthenticateScheme = "JwtBearer";
                  options.DefaultChallengeScheme = "JwtBearer";
              })

              .AddJwtBearer("JwtBearer", options =>
              {
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                       ValidateIssuer = true,

                       ValidateAudience = true,

                       ValidateLifetime = true,

                       IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("GcbCare-key-autentication")),

                       ClockSkew = TimeSpan.FromMinutes(30),

                       ValidIssuer = "GcbCare.WebApi.C#",

                       ValidAudience = "GcbCare.WebApi.C#"
                  };
              });

            services.AddTransient<IUsuario, UsuarioRepository>();
            services.AddTransient<ITipoUsuario, TipoUsuarioRepository>();
            services.AddTransient<IMedicoEspecialidade, MedicoEspecialidadeRepository>();
            services.AddTransient<IMedico, MedicoRepository>();
            services.AddTransient<IEspecialidades, EspecialidadesRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder
             .AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader());

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "GCB.Care.WebApi");
                c.RoutePrefix = string.Empty;
            });

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
