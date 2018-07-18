using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication5.Migrations
{
    public partial class AddedChapterID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Chapters_ChapterID",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "ChapterID",
                table: "Questions",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Chapters_ChapterID",
                table: "Questions",
                column: "ChapterID",
                principalTable: "Chapters",
                principalColumn: "ChapterID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Chapters_ChapterID",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "ChapterID",
                table: "Questions",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Chapters_ChapterID",
                table: "Questions",
                column: "ChapterID",
                principalTable: "Chapters",
                principalColumn: "ChapterID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
