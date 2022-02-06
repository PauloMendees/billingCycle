using AutoMapper;
using BillingCycleAPI.Data.DTOS.Credits;
using BillingCycleAPI.Models;

namespace BillingCycleAPI.Profiles
{
    public class CreditProfile : Profile
    {
        public CreditProfile()
        {
            CreateMap<PostCreditDTO, Credit>();
            CreateMap<Credit, ReadCreditDTO>();
            CreateMap<ReadCreditDTO, Credit>();
        }
    }
}
