using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id_question = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Question_title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id_question);
                });

            migrationBuilder.CreateTable(
                name: "User_form",
                columns: table => new
                {
                    User_form_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Form_status = table.Column<int>(type: "integer", nullable: false),
                    Rejected_comment = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_form", x => x.User_form_id);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id_answer = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_form_id = table.Column<int>(type: "integer", nullable: false),
                    Free_text = table.Column<string>(type: "text", nullable: false),
                    QuestionId_question = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id_answer);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId_question",
                        column: x => x.QuestionId_question,
                        principalTable: "Questions",
                        principalColumn: "Id_question");
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    First_name = table.Column<string>(type: "text", nullable: false),
                    Second_name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    User_form_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Persons_User_form_User_form_id",
                        column: x => x.User_form_id,
                        principalTable: "User_form",
                        principalColumn: "User_form_id");
                });

            migrationBuilder.CreateTable(
                name: "Forms",
                columns: table => new
                {
                    Id_form = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<int>(type: "integer", nullable: false),
                    Form_title = table.Column<string>(type: "text", nullable: false),
                    QuestionId_question = table.Column<int>(type: "integer", nullable: true),
                    User_form_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.Id_form);
                    table.ForeignKey(
                        name: "FK_Forms_Persons_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Forms_Questions_QuestionId_question",
                        column: x => x.QuestionId_question,
                        principalTable: "Questions",
                        principalColumn: "Id_question");
                    table.ForeignKey(
                        name: "FK_Forms_User_form_User_form_id",
                        column: x => x.User_form_id,
                        principalTable: "User_form",
                        principalColumn: "User_form_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId_question",
                table: "Answers",
                column: "QuestionId_question");

            migrationBuilder.CreateIndex(
                name: "IX_Forms_CreatorId",
                table: "Forms",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Forms_QuestionId_question",
                table: "Forms",
                column: "QuestionId_question");

            migrationBuilder.CreateIndex(
                name: "IX_Forms_User_form_id",
                table: "Forms",
                column: "User_form_id");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_User_form_id",
                table: "Persons",
                column: "User_form_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Forms");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "User_form");
        }
    }
}
