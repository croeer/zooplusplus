using zooplusplus;
using Zooplusplus;

var totalSum = 0.0d;
var parser = new ZooplusParser();

var qrGenerator = new QrGenerator();

foreach (var pdfFileName in System.IO.Directory.GetFiles("C:\\dev\\null\\bezahlt", "*.pdf"))
{
    var invooiceDto = parser.ParseInvoice(pdfFileName);
    totalSum += invooiceDto.Amount;
    //Console.WriteLine(qrGenerator.GenerateGiroCodeAscii(invooiceDto));
    //Console.WriteLine(qrGenerator.GenerateGiroCodeAscii(invooiceDto));
}
Console.WriteLine($"Total Sum: {totalSum.ToString("N2")}");