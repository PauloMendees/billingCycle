using AutenticacaoAPI.Data.DTOS;
using AutenticacaoAPI.Service;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace AutenticacaoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private LoginService _service;

        public LoginController(LoginService service)
        {
            _service = service;
        }

        [HttpPost("/api/login")]
        public IActionResult LogarUsuario(LoginRequest dto)
        {
            Result loginResult = _service.LogarUsuarioService(dto);
            if (loginResult.IsFailed) return Unauthorized("Login não autorizado");
            return Ok(loginResult.Successes);
        }
    }
}
