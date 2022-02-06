using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace BillingCycleAPI.Migrations
{
    public partial class Criandotabelacreditos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BillingCycles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Mes = table.Column<int>(type: "int", nullable: false),
                    Ano = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingCycles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Creditos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    billingCycleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Creditos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Creditos_BillingCycles_billingCycleId",
                        column: x => x.billingCycleId,
                        principalTable: "BillingCycles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Debitos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    billingCycleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Debitos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Debitos_BillingCycles_billingCycleId",
                        column: x => x.billingCycleId,
                        principalTable: "BillingCycles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Creditos_billingCycleId",
                table: "Creditos",
                column: "billingCycleId");

            migrationBuilder.CreateIndex(
                name: "IX_Debitos_billingCycleId",
                table: "Debitos",
                column: "billingCycleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Creditos");

            migrationBuilder.DropTable(
                name: "Debitos");

            migrationBuilder.DropTable(
                name: "BillingCycles");
        }
    }
}
