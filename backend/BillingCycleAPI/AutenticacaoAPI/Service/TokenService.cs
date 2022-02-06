using AutenticacaoAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AutenticacaoAPI.Service
{
    public class TokenService
    {
        //Configurações de token
        public Token CreateToken(CustomIdentity user)
        {
            Claim[] direitoUsuario = new Claim[]
            {
                new Claim("user", user.UserName),
                new Claim("id", user.Id.ToString()),
            };

            var chave = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("0asdjas09djsa09djasdjsadajsd09asjd09sajcnzxn"));
            var credentials = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: direitoUsuario,
                signingCredentials: credentials,
                //Expiração do token
                expires: DateTime.UtcNow.AddHours(1)
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return new Token(tokenString);
        }
    }
}
