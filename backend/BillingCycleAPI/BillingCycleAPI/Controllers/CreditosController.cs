using BillingCycleAPI.Data.DTOS.Credits;
using BillingCycleAPI.Models;
using BillingCycleAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BillingCycleAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CreditosController : ControllerBase
    {
        private CreditosService _service;

        public CreditosController(CreditosService service)
        {
            _service = service;
        }

        [HttpGet("api/getAll")]
        public IActionResult GetAllCreditos()
        {
            List<Credit> creditosDTO = _service.GetAllCreditsService();
            if(creditosDTO == null)
            {
                return NotFound("Erro ao buscar créditos");
            }
            return Ok(creditosDTO);
        }

        [HttpGet("api/getById/{id}")]
        public IActionResult GetCreditoById(int id)
        {
            ReadCreditDTO creditDTO = _service.FindCreditByIdService(id);
            if(creditDTO == null)
            {
                return NotFound("Crédito não encontrado");
            }
            return Ok(creditDTO);
        }

        [HttpPost("api/post")]
        public IActionResult PostCredito([FromBody] PostCreditDTO creditoDTO)
        {
            Result resultado = _service.PostCreditoService(creditoDTO);
            if (resultado.IsFailed) return StatusCode(500);
            return Ok(resultado.Successes);
        }


        [HttpDelete("api/deleteById/{id}")]
        public IActionResult DeleteCredit(int id)
        {
            Result success = _service.DeleteCreditByIdService(id);
            if (success.IsFailed)
            {
                return NotFound("Crédito não encontrado");
            }
            return Ok(success.Successes);
        }

        [HttpPut("api/alterar/{id}")]
        public  IActionResult AlterarCredito(int id, [FromBody] PostCreditDTO creditDTO)
        {
            Result result = _service.AlterarCreditoService(id, creditDTO);
            if (result.IsFailed)
            {
                return NotFound("Crédito não encontrado");
            }
            return Ok(result.Successes);
        }
    }
}
