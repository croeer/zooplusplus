using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using zooplusplus;
using Zooplusplus;
using zooplusplus_api.Models;

namespace zooplusplus_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetConfig()
        {
            var config = new Config()
            {
                BeneficiaryName = "Zooplus AG",
                Iban = "DE64700400410211441101",
                Bic = "COBADEFF700",
                CustomerName = "Kundi Kundermann",
                CustomerNumber = "54321"
            };

            return Ok(config);

        }

    }
}
