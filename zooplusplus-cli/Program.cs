using zooplusplus;
using Zooplusplus;

var totalSum = 0.0d;
var parser = new ZooplusParser();

var qrGenerator = new QrGenerator();

var path = "C:\\dev\\null\\bezahlt";

if (args.Length > 0)
{
    path = args[0];
    Console.WriteLine(path);
}

foreach (var pdfFileName in System.IO.Directory.GetFiles(path, "*.pdf"))
{
    var invooiceDto = parser.ParseInvoice(pdfFileName);
    totalSum += invooiceDto.Amount;
    Console.WriteLine(qrGenerator.GenerateGiroCodeAscii(invooiceDto));
}
Console.WriteLine($"Total Sum: {totalSum.ToString("N2")}");