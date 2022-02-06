using AutenticacaoAPI.Data;
using AutenticacaoAPI.Models;
using AutenticacaoAPI.Service;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutenticacaoAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Configurando contexto
            services.AddDbContext<AutenticacaoDbContext>(options =>
                options.UseMySQL(Configuration.GetConnectionString("UserConnection"))
            );

            //Configurando Identity
            services.AddIdentity<CustomIdentity, IdentityRole<int>>(
                    opt => opt.SignIn.RequireConfirmedEmail = false
                ).
                AddEntityFrameworkStores<AutenticacaoDbContext>()
                .AddDefaultTokenProviders();

            //Configurando service
            services.AddScoped<UsuarioService, UsuarioService>();
            services.AddScoped<TokenService, TokenService>();
            services.AddScoped<LoginService, LoginService>();

            //Utilizando o mapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AutenticacaoAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Habilitando CORS
            app.UseCors(b =>
            {
                b.AllowAnyHeader();
                b.AllowAnyMethod();
                b.AllowAnyOrigin();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AutenticacaoAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
