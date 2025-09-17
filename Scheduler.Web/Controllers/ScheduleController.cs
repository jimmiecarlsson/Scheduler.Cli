using Microsoft.AspNetCore.Mvc;

namespace Scheduler.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController: ControllerBase
    {
        [HttpGet("today")]
        public IActionResult GetToday()
        {
            string day = DateTime.Now.DayOfWeek.ToString();
            return Ok(day);
        }
    }
}
