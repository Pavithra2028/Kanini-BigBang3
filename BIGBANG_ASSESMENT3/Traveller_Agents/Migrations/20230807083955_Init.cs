using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Traveller_Agents.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tour",
                columns: table => new
                {
                    package_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "3001, 1"),
                    traveller_agent_id = table.Column<int>(type: "int", nullable: true),
                    TourId = table.Column<int>(type: "int", nullable: true),
                    packagename = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hotel_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    food_details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    speciality_of_the_place = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    iternary_details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<int>(type: "int", nullable: true),
                    vacation_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    duration = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour", x => x.package_id);
                });

            migrationBuilder.CreateTable(
                name: "spots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "4001, 1"),
                    spot_id = table.Column<int>(type: "int", nullable: false),
                    image1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    package_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_spots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_spots_tour_package_id",
                        column: x => x.package_id,
                        principalTable: "tour",
                        principalColumn: "package_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_spots_package_id",
                table: "spots",
                column: "package_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "spots");

            migrationBuilder.DropTable(
                name: "tour");
        }
    }
}
