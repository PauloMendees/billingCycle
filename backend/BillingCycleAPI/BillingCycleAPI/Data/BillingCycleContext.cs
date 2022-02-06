using BillingCycleAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillingCycleAPI.Data
{
    //Criando contexto
    public class BillingCycleContext : DbContext
    {
        public BillingCycleContext(DbContextOptions<BillingCycleContext> opt) : base(opt)
        {

        }

        //Linkando entidades
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Criando relação entre credito e billingCycle   -->  1:n
            modelBuilder.Entity<Credit>()
                .HasOne(credito => credito.BillingCycle)
                .WithMany(billingCycle => billingCycle.Creditos)
                .HasForeignKey(credito => credito.billingCycleId)
                .OnDelete(DeleteBehavior.Restrict);

            //Criando relação entre debito e billingCycle    -->  1:n
            modelBuilder.Entity<Debit>()
                .HasOne(debito => debito.BillingCycle)
                .WithMany(billingCycle => billingCycle.Debitos)
                .HasForeignKey(debito => debito.billingCycleId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        //Criando tabelas no banco de dados
        public DbSet<Debit> Debitos { get; set; }
        public DbSet<Credit> Creditos { get; set; }
        public DbSet<BillingCycle> BillingCycles { get; set;}
    }
}
