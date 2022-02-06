using AutenticacaoAPI.Data.DTOS;
using AutenticacaoAPI.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AutenticacaoAPI.Profiles
{
    public class UsuarioProfile : Profile
    {
        public UsuarioProfile()
        {
            CreateMap<AddUsuario, Usuario>();
            CreateMap<Usuario, IdentityUser<int>>();
            CreateMap<Usuario, CustomIdentity>();
            CreateMap<IdentityUser<int>, Usuario>();
            CreateMap<CustomIdentity, Usuario>();
        }
    }
}
