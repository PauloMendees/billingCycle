using AutoMapper;
using BillingCycleAPI.Data.DTOS.BillingCycle;
using BillingCycleAPI.Models;

namespace BillingCycleAPI.Profiles
{
    public class BillingCycleProfile : Profile
    {
        public BillingCycleProfile()
        {
            CreateMap<PostBillingCycleDTO, BillingCycle>();
            CreateMap<BillingCycle, ReadBillingCycleDTO>();
            CreateMap<ReadBillingCycleDTO, BillingCycle>();
        }
    }
}
