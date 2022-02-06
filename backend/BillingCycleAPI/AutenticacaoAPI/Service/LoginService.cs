using AutenticacaoAPI.Data.DTOS;
using AutenticacaoAPI.Models;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;

namespace AutenticacaoAPI.Service
{
    public class LoginService
    {
        private TokenService _tokenService;
        private SignInManager<CustomIdentity> _manager;

        public LoginService(SignInManager<CustomIdentity> manager, TokenService tokenService)
        {
            _manager = manager;
            _tokenService = tokenService;
        }

        public Result LogarUsuarioService(LoginRequest dto)
        {
            //Realizando o login
            var resultadoLogin = _manager.PasswordSignInAsync(dto.UserName, dto.Password, false, false).Result;
            if (resultadoLogin.Succeeded)
            {
                //Gerando o token já incluindo roles
                CustomIdentity identityUser = _manager.UserManager.Users.FirstOrDefault(usuario => usuario.NormalizedUserName == dto.UserName.ToUpper());
                Token token = _tokenService.CreateToken(identityUser);
                return Result.Ok().WithSuccess(token.Value);
            }
            return Result.Fail("Login não pode ser executado");
        }
    }
}
