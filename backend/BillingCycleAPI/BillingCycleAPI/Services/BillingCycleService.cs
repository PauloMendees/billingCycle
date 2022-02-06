using AutoMapper;
using BillingCycleAPI.Data;
using BillingCycleAPI.Data.DTOS.BillingCycle;
using BillingCycleAPI.Models;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BillingCycleAPI.Services
{
    public class BillingCycleService
    {
        private BillingCycleContext _context;
        private IMapper _mapper;
        public BillingCycleService(BillingCycleContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<BillingCycle> ListarCiclosService()
        {
            return _context.BillingCycles.ToList();
        }

        public ReadBillingCycleDTO BuscarCicloPorIdService(int id)
        {
            BillingCycle billingCycle = _context.BillingCycles.FirstOrDefault(item => item.Id == id);
            if(billingCycle == null)
            {
                return null;
            }
            ReadBillingCycleDTO billingCycleDto = _mapper.Map<ReadBillingCycleDTO>(billingCycle);
            return billingCycleDto;
        }

        public Result AlterarBillingCycleService(int id, PostBillingCycleDTO billingCycleDto)
        {
            BillingCycle billingCycle = _context.BillingCycles.FirstOrDefault(item => item.Id == id);
            if(billingCycle == null)
            {
                return Result.Fail("Usuário não encontrado.");
            }
            _mapper.Map(billingCycleDto, billingCycle);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Ciclo alterado com sucesso.");
        }

        public ReadBillingCycleDTO PublicarCicloService(PostBillingCycleDTO request)
        {
            BillingCycle ciclo = _mapper.Map<BillingCycle>(request);
            _context.Add(ciclo);
            _context.SaveChanges();
            return _mapper.Map<ReadBillingCycleDTO>(ciclo);
        }

        public Result DeletarCicloService(int id)
        {
            BillingCycle billingCycle = _context.BillingCycles.FirstOrDefault(item => item.Id == id);
            if(billingCycle == null)
            {
                return Result.Fail("Ciclo não encontrado");
            }
            _context.Remove(billingCycle);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Ciclo deletado com sucesso");
        }
    }
}
