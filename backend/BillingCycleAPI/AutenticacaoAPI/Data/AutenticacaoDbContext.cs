using AutenticacaoAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AutenticacaoAPI.Data
{
    public class AutenticacaoDbContext : IdentityDbContext<CustomIdentity, IdentityRole<int>, int>
    {
        public AutenticacaoDbContext(DbContextOptions<AutenticacaoDbContext> opt) : base(opt)
        {

        }
    }
}
