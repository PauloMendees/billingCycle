using BillingCycleAPI.Data.DTOS.BillingCycle;
using BillingCycleAPI.Models;
using BillingCycleAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Web.Http.Cors;

namespace BillingCycleAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BillingCycleController : ControllerBase
    {
        private BillingCycleService _service;

        public BillingCycleController(BillingCycleService service)
        {
            _service = service;
        }

        [HttpGet("api/getall")]
        public IActionResult ListarCiclos()
        {
            List<BillingCycle> listaCiclos = _service.ListarCiclosService();
            if(listaCiclos == null)
            {
                return NotFound("Erro ao buscar ciclos");
            }
            return Ok(listaCiclos);
        }

        [HttpGet("api/getById/{id}")]
        public IActionResult BuscarCicloPorId(int id)
        {
            ReadBillingCycleDTO billingCycleDTO = _service.BuscarCicloPorIdService(id);
            if(billingCycleDTO == null)
            {
                return NotFound("Ciclo não encontrado");
            }
            return Ok(billingCycleDTO);
        }

        [HttpPost("api/post")]
        public IActionResult PublicarCiclo([FromBody] PostBillingCycleDTO request)
        {
            ReadBillingCycleDTO result = _service.PublicarCicloService(request);
            return CreatedAtAction(nameof(BuscarCicloPorId), new { id = result.Id }, result);
        }

        [HttpDelete("api/deletar/{id}")]
        public IActionResult DeletarCiclo(int id)
        {
            Result result = _service.DeletarCicloService(id);
            if (result.IsFailed)
            {
                return NotFound("Ciclo não encontrado");
            }
            return Ok(result.Successes);
        }

        [HttpPut("api/alterar/{id}")]
        public IActionResult AlterarBillingCycle(int id, [FromBody] PostBillingCycleDTO billingCycleDto)
        {
            Result result = _service.AlterarBillingCycleService(id, billingCycleDto);
            if (result.IsFailed)
            {
                return NotFound("Usuário não encontrado");
            }
            return Ok(result.Successes);
        }
    }
}
