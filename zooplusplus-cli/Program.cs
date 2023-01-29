﻿using zooplusplus;
using Zooplusplus;

var totalSum = 0.0d;
var parser = new ZooplusParser();

var qrGenerator = new QrGenerator();

foreach (var pdfFileName in System.IO.Directory.GetFiles("C:\\dev\\null\\bezahlt", "*.pdf"))
{
    var billDto = parser.ParseBill(pdfFileName);
    totalSum += billDto.Amount;
    //Console.WriteLine(qrGenerator.GenerateGiroCodeAscii(billDto));
    //Console.WriteLine(qrGenerator.GenerateGiroCodeAscii(billDto));
}
Console.WriteLine($"Total Sum: {totalSum.ToString("N2")}");