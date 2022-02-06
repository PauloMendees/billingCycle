using AutoMapper;
using BillingCycleAPI.Data.DTOS.Debits;
using BillingCycleAPI.Models;

namespace BillingCycleAPI.Profiles
{
    public class DebitProfile : Profile
    {
        public DebitProfile()
        {
            CreateMap<PostDebitDTO, Debit>();
            CreateMap<Debit, ReadDebitDTO>();
            CreateMap<ReadDebitDTO, Debit>();
        }
    }
}
