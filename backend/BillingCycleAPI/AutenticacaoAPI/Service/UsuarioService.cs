using AutenticacaoAPI.Data;
using AutenticacaoAPI.Data.DTOS;
using AutenticacaoAPI.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AutenticacaoAPI.Service
{
    public class UsuarioService
    {
        private IMapper _mapper;
        private UserManager<CustomIdentity> _userManager;
        private AutenticacaoDbContext _context;
        private RoleManager<IdentityRole<int>> _roleManager;

        public UsuarioService(RoleManager<IdentityRole<int>> roleManager, AutenticacaoDbContext context, UserManager<CustomIdentity> userManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public Result CadastrarUsuarioService(AddUsuario dto)
        {
            Usuario usuario = _mapper.Map<Usuario>(dto);
            CustomIdentity customIdentity = _mapper.Map<CustomIdentity>(usuario);
            //Criando usuário
            var resultadoIdentity = _userManager
                .CreateAsync(customIdentity, dto.Password);

            if (resultadoIdentity.Result.Succeeded)
            {
                return Result.Ok().WithSuccess("Usuário criado com sucesso");
            }
            return Result.Fail("Falha ao criar usuário");
        }

        public Result DeletarUsuarioService(int id)
        {
            CustomIdentity identityUser = _userManager.Users.FirstOrDefault(x => x.Id == id);
            var result = _userManager.DeleteAsync(identityUser).Result;
            if (result.Succeeded) return Result.Ok().WithSuccess("Usuário deletado com sucesso");
            return Result.Fail("Falha ao deletar Usuário");
        }

        public Usuario BuscarUsuarioService(int id)
        {
            CustomIdentity identityUser = _userManager.Users.First(x => x.Id == id);
            Usuario finalUser = _mapper.Map<Usuario>(identityUser);
            return finalUser;
        }

        public List<CustomIdentity> ListarUsuariosService()
        {
            return _userManager.Users.ToList();
        }
    }
}
