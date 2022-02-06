using AutoMapper;
using BillingCycleAPI.Data;
using BillingCycleAPI.Data.DTOS.Debits;
using BillingCycleAPI.Models;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BillingCycleAPI.Services
{
    public class DebitosService
    {
        private BillingCycleContext _context;

        private IMapper _mapper;
        public DebitosService(BillingCycleContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<Debit> ListarDebitosService()
        {
            return _context.Debitos.ToList();
        }

        public Result PublicarDebitoService(PostDebitDTO debitDTO)
        {
            Debit debit = _mapper.Map<Debit>(debitDTO);
            _context.Add(debit);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Débito cadastrado com sucesso");
        }

        public Result AlterarDebitoService(int id, PostDebitDTO debitDTO)
        {
            Debit debito = _context.Debitos.FirstOrDefault(de => de.Id == id);
            if(debito == null)
            {
                return Result.Fail("Débito não encontrado");
            }
            _mapper.Map(debitDTO, debito);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Débito alterado com sucesso");
        }

        public Result DeletarDebitoService(int id)
        {
            Debit debito = _context.Debitos.FirstOrDefault(de => de.Id == id);
            if (debito == null)
            {
                return Result.Fail("Débito não encontrado");
            }
            _context.Remove(debito);
            _context.SaveChanges();
            return Result.Ok().WithSuccess("Débito deletado com sucesso");
        }

        public ReadDebitDTO BuscarDebitoService(int id)
        {
            Debit debito = _context.Debitos.FirstOrDefault(item => item.Id == id);
            return _mapper.Map<ReadDebitDTO>(debito);
        }
    }
}
