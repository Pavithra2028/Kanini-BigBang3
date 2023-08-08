using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Travellers.Migrations
{
    /// <inheritdoc />
    public partial class Begin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "travellers",
                columns: table => new
                {
                    travellers_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "101, 1"),
                    travellers_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travellers", x => x.travellers_id);
                });

            migrationBuilder.CreateTable(
                name: "booking",
                columns: table => new
                {
                    booking_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "201, 1"),
                    travellers_id = table.Column<int>(type: "int", nullable: false),
                    package_id = table.Column<int>(type: "int", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    city_of_residence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    no_of_people = table.Column<int>(type: "int", nullable: false),
                    phone_number = table.Column<long>(type: "bigint", nullable: false),
                    price = table.Column<int>(type: "int", nullable: false),
                    IsConfirmed = table.Column<int>(type: "int", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_booking", x => x.booking_id);
                    table.ForeignKey(
                        name: "FK_booking_travellers_travellers_id",
                        column: x => x.travellers_id,
                        principalTable: "travellers",
                        principalColumn: "travellers_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "feedback",
                columns: table => new
                {
                    feedback_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "301, 1"),
                    travellers_id = table.Column<int>(type: "int", nullable: false),
                    package_id = table.Column<int>(type: "int", nullable: false),
                    rating = table.Column<int>(type: "int", nullable: false),
                    comments = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_feedback", x => x.feedback_id);
                    table.ForeignKey(
                        name: "FK_feedback_travellers_travellers_id",
                        column: x => x.travellers_id,
                        principalTable: "travellers",
                        principalColumn: "travellers_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "payment",
                columns: table => new
                {
                    payment_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "401, 1"),
                    booking_id = table.Column<int>(type: "int", nullable: false),
                    card_number = table.Column<long>(type: "bigint", nullable: false),
                    Expirymonth = table.Column<int>(type: "int", nullable: false),
                    Expiryyear = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cvv_number = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payment", x => x.payment_id);
                    table.ForeignKey(
                        name: "FK_payment_booking_booking_id",
                        column: x => x.booking_id,
                        principalTable: "booking",
                        principalColumn: "booking_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_booking_travellers_id",
                table: "booking",
                column: "travellers_id");

            migrationBuilder.CreateIndex(
                name: "IX_feedback_travellers_id",
                table: "feedback",
                column: "travellers_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_booking_id",
                table: "payment",
                column: "booking_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "feedback");

            migrationBuilder.DropTable(
                name: "payment");

            migrationBuilder.DropTable(
                name: "booking");

            migrationBuilder.DropTable(
                name: "travellers");
        }
    }
}
