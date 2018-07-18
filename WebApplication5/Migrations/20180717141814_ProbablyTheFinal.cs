using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication5.Migrations
{
    public partial class ProbablyTheFinal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapters_Subjects_SubjectID",
                table: "Chapters");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectID",
                table: "Chapters",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Chapters_Subjects_SubjectID",
                table: "Chapters",
                column: "SubjectID",
                principalTable: "Subjects",
                principalColumn: "SubjectID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapters_Subjects_SubjectID",
                table: "Chapters");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectID",
                table: "Chapters",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Chapters_Subjects_SubjectID",
                table: "Chapters",
                column: "SubjectID",
                principalTable: "Subjects",
                principalColumn: "SubjectID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
