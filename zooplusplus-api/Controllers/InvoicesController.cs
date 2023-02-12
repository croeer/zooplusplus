using Microsoft.AspNetCore.Mvc;
using Zooplusplus;
using zooplusplus_api.Models;

namespace zooplusplus_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private ZooplusParser parser = new ZooplusParser();

        // POST api/<InvoicesController>
        [HttpPost("upload")]
        public IActionResult UploadPdfViaPost([FromForm] FileModel file)
        {
            Console.WriteLine($"uploaded {file.FileName}");
            var dto = parser.ParseInvoice(file.FormFile.OpenReadStream());
            Console.WriteLine(dto.InvoiceNumber);
            return Ok(dto);
        }

        // GET: api/<InvoicesController>
        [HttpGet]
        public IEnumerable<ZooplusInvoiceDto> Get()
        {
            return new List<ZooplusInvoiceDto>();
        }

        // GET api/<InvoicesController>/5
        [HttpGet("{guid}")]
        public string Get(Guid guid)
        {
            return "value";
        }

        // POST api/<InvoicesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<InvoicesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<InvoicesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
