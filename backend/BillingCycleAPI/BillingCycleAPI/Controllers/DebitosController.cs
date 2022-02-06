using BillingCycleAPI.Data.DTOS.Debits;
using BillingCycleAPI.Models;
using BillingCycleAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BillingCycleAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DebitosController : ControllerBase
    {
        private DebitosService _service;

        public DebitosController(DebitosService service)
        {
            _service = service;
        }

        [HttpGet("api/getAll")]
        public IActionResult ListarDebitos()
        {
            List<Debit> listaDebito = _service.ListarDebitosService();
            if(listaDebito == null)
            {
                return NotFound("Erro ao buscar débitos");
            }
            return Ok(listaDebito);
        }

        [HttpGet("api/getById/{id}")]
        public IActionResult BuscarDebito(int id)
        {
            ReadDebitDTO debito = _service.BuscarDebitoService(id);
            if (debito == null) return NotFound("Debito não encontrado");
            return Ok(debito);
        }

        [HttpPost("api/post")]
        public IActionResult PublicarDebito([FromBody] PostDebitDTO debitDTO)
        {
            Result resultado = _service.PublicarDebitoService(debitDTO);
            if (resultado.IsFailed) return StatusCode(500);
            return Ok(resultado.Successes);
        }

        [HttpPut("api/alterar/{id}")]
        public IActionResult AlterarDebito(int id, [FromBody] PostDebitDTO debitDTO)
        {
            Result resultado = _service.AlterarDebitoService(id, debitDTO);
            if (resultado.IsFailed) return NotFound("Débito não encontrado");
            return Ok(resultado.Successes);
        }

        [HttpDelete("api/delete/{id}")]
        public IActionResult DeletarDebito(int id)
        {
            Result resultado = _service.DeletarDebitoService(id);
            if (resultado.IsFailed) return NotFound("Débito não encontrado");
            return Ok(resultado.Successes);
        }
    }
}
