using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using zooplusplus;
using Zooplusplus;

namespace zooplusplus_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QrcodeController : ControllerBase
    {

        QrGenerator qrGenerator = new QrGenerator();

        [HttpGet]
        public IActionResult GetQrcodeAsPng([FromQuery] ZooplusInvoiceDto invoice)
        {
            Byte[] b;
            b = qrGenerator.GenerateGiroCodePng(invoice);
            return File(b, "image/png");
        }

    }
}
