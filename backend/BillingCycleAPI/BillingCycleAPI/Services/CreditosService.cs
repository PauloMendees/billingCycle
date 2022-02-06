using AutoMapper;
using BillingCycleAPI.Data;
using BillingCycleAPI.Data.DTOS.Credits;
using BillingCycleAPI.Models;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BillingCycleAPI.Services
{
    public class CreditosService
    {
        private BillingCycleContext _context;
        private IMapper _mapper;

        public CreditosService(IMapper mapper, BillingCycleContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public List<Credit> GetAllCreditsService()
        {
            return _context.Creditos.ToList();
        }

        public Result PostCreditoService(PostCreditDTO creditoDTO)
        {
            Credit credito = _mapper.Map<Credit>(creditoDTO);
            _context.Creditos.Add(credito);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Crédito cadastrado com sucesso");
        }

        public ReadCreditDTO FindCreditByIdService(int id)
        {
            Credit credito = _context.Creditos.FirstOrDefault(item => item.Id == id);
            if(credito == null)
            {
                return null;
            }
            return _mapper.Map<ReadCreditDTO>(credito);
        }

        public Result DeleteCreditByIdService(int id)
        {
            Credit credito = _context.Creditos.FirstOrDefault(item => item.Id == id);
            if (credito == null)
            {
                return null;
            }
            _context.Remove(credito);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Crédito deletado com sucesso");
        }

        public Result AlterarCreditoService(int id, PostCreditDTO creditDTO)
        {
            Credit credito = _context.Creditos.FirstOrDefault(item => item.Id == id);
            if(credito == null)
            {
                return Result.Fail("Crédito não encontrado");
            }
            _mapper.Map(creditDTO, credito);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Crédito alterado com sucesso");
        }
    }
}
