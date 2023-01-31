using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

namespace Zooplusplus
{
    public class ZooplusParser
    {
        private const string INVOICE_NO = "Rechnungsnummer";
        private const string INVOICE_AMOUNT = "Rechnungsbetrag";
        private const string INVOICE_DATE = "Rechnungsdatum";
        private const string CUSTOMER_NUMBER = "Kundennummer";

        private readonly CultureInfo deCulture = CultureInfo.CreateSpecificCulture("de-de");

        public ZooplusInvoiceDto ParseInvoice(PdfDocument pdfDoc)
        {
            var invoiceNr = string.Empty;
            var customerNr = string.Empty;
            var invoiceSum = 0.0d;
            var reNrFound = false;
            var kdNrFound = false;
            var totalFound = false;
            var dateFound = false;
            DateTime invoiceDate = DateTime.MinValue;

            foreach (Page page in pdfDoc.GetPages())
            {
                var words = page.GetWords().ToList();

                for (int i = 0; i < words.Count; i++)
                {

                    if (!reNrFound && String.Equals(words[i].Text, INVOICE_NO))
                    {
                        invoiceNr = words[i + 2].Text;
                        reNrFound = true;
                    }
                    else if (!totalFound && String.Equals(words[i].Text, INVOICE_AMOUNT))
                    {
                        var currentSumEntry = words[i + 1].Text;
                        invoiceSum = Double.Parse(currentSumEntry.Replace(",", "."), CultureInfo.InvariantCulture);
                        totalFound = true;
                    }
                    else if (!dateFound && String.Equals(words[i].Text, INVOICE_DATE))
                    {
                        var currentDateEntry = words[i + 2].Text;
                        invoiceDate = DateTime.Parse(currentDateEntry, deCulture);
                        dateFound = true;
                    } 
                    else if (!kdNrFound && String.Equals(words[i].Text, CUSTOMER_NUMBER))
                    {
                        customerNr = words[i + 2].Text;
                        kdNrFound = true;
                    }
                }
            }

            Console.WriteLine($"{invoiceNr} ({invoiceDate.ToShortDateString()}): {invoiceSum.ToString("N2")}");

            return new ZooplusInvoiceDto() {
                InvoiceNumber = invoiceNr, 
                CustomerNumber = customerNr, 
                Amount = invoiceSum, 
                InvoiceDate = invoiceDate, 
                Status = InvoiceStatus.Unpaid, 
                Id = Guid.NewGuid(),
                InvoiceDueDate = invoiceDate.AddDays(14),
             };
        }

        public ZooplusInvoiceDto ParseInvoice(string pdfFileName)
        {
            using (PdfDocument document = PdfDocument.Open(pdfFileName))
            {
                return ParseInvoice(document);
            }

        }

        public ZooplusInvoiceDto ParseInvoice(StreamReader sr)
        {
            using (PdfDocument document = PdfDocument.Open(sr.BaseStream))
            {
                return ParseInvoice(document);
            }
        }
    }
}
