using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using zooplusplus_api.Models;

namespace zooplusplus_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok("available");
        }

    }
}
