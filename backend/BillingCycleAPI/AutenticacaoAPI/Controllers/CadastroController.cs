using AutenticacaoAPI.Data.DTOS;
using AutenticacaoAPI.Models;
using AutenticacaoAPI.Service;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AutenticacaoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CadastroController : ControllerBase
    {
        private UsuarioService _service;

        public CadastroController(UsuarioService service)
        {
            _service = service;
        }

        [HttpPost("/api/cadastrarUsuario")]
        public IActionResult CadastrarUsuario(AddUsuario dto)
        {
            Result result = _service.CadastrarUsuarioService(dto);
            if (result.IsFailed) return StatusCode(500);
            return Ok(result.Successes);
        }

        [HttpGet("/api/usuarios")]
        public IActionResult ListarUsuarios()
        {
            List<CustomIdentity> lista = _service.ListarUsuariosService();
            if(lista != null)
            {
                return Ok(lista);
            }
            return StatusCode(500);
        }

        [HttpGet("/api/deletarUsuario/{id}")]
        public IActionResult BuscarUsuarioById(int id)
        {
            Usuario user = _service.BuscarUsuarioService(id);
            if(user != null)
            {
                return Ok(user);
            }
            return NotFound("Usuário não encontrado");
        }

        [HttpDelete("/api/deletarUsuario/{id}")]
        public IActionResult DeletarUsuario(int id)
        {
            Result resultado = _service.DeletarUsuarioService(id);
            if (resultado.IsFailed)
            {
                return NotFound("Usuário não encontrado");
            }
            return Ok(resultado.Successes);
        }

    }
}
