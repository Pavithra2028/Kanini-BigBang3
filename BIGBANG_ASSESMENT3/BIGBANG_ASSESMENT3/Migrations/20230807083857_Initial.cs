using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BIGBANG_ASSESMENT3.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admins",
                columns: table => new
                {
                    Admin_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Admin_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Admin_password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admins", x => x.Admin_id);
                });

            migrationBuilder.CreateTable(
                name: "imagegallery",
                columns: table => new
                {
                    TourId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1001, 1"),
                    TourName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocationImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imagegallery", x => x.TourId);
                });

            migrationBuilder.CreateTable(
                name: "travelAgents",
                columns: table => new
                {
                    traveller_agent_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "2001, 1"),
                    traveller_agent_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    traveller_agent_password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    agentimage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phonenumber = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travelAgents", x => x.traveller_agent_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admins");

            migrationBuilder.DropTable(
                name: "imagegallery");

            migrationBuilder.DropTable(
                name: "travelAgents");
        }
    }
}
