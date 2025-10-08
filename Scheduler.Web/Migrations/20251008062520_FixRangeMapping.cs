using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scheduler.Web.Migrations
{
    /// <inheritdoc />
    public partial class FixRangeMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_ScheduleBlocks_ScheduleBlockId",
                table: "Guests");

            migrationBuilder.DropForeignKey(
                name: "FK_Presenters_ScheduleBlocks_ScheduleBlockId",
                table: "Presenters");

            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleBlocks_ScheduleDays_ScheduleDayId",
                table: "ScheduleBlocks");

            migrationBuilder.RenameColumn(
                name: "Range_Start",
                table: "ScheduleBlocks",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "Range_End",
                table: "ScheduleBlocks",
                newName: "EndTime");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_ScheduleBlocks_ScheduleBlockId",
                table: "Guests",
                column: "ScheduleBlockId",
                principalTable: "ScheduleBlocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Presenters_ScheduleBlocks_ScheduleBlockId",
                table: "Presenters",
                column: "ScheduleBlockId",
                principalTable: "ScheduleBlocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleBlocks_ScheduleDays_ScheduleDayId",
                table: "ScheduleBlocks",
                column: "ScheduleDayId",
                principalTable: "ScheduleDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_ScheduleBlocks_ScheduleBlockId",
                table: "Guests");

            migrationBuilder.DropForeignKey(
                name: "FK_Presenters_ScheduleBlocks_ScheduleBlockId",
                table: "Presenters");

            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleBlocks_ScheduleDays_ScheduleDayId",
                table: "ScheduleBlocks");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "ScheduleBlocks",
                newName: "Range_Start");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "ScheduleBlocks",
                newName: "Range_End");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_ScheduleBlocks_ScheduleBlockId",
                table: "Guests",
                column: "ScheduleBlockId",
                principalTable: "ScheduleBlocks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Presenters_ScheduleBlocks_ScheduleBlockId",
                table: "Presenters",
                column: "ScheduleBlockId",
                principalTable: "ScheduleBlocks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleBlocks_ScheduleDays_ScheduleDayId",
                table: "ScheduleBlocks",
                column: "ScheduleDayId",
                principalTable: "ScheduleDays",
                principalColumn: "Id");
        }
    }
}
