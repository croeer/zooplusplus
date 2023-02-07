using QRCoder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zooplusplus;
using static QRCoder.PayloadGenerator;

namespace zooplusplus
{
    public class QrGenerator
    {

        const string ZOOPLUS_IBAN = "DE64700400410211441101";
        const string ZOOPLUS_BIC = "COBADEFF700";
        const string ZOOPLUS_NAME = "Zooplus AG";
        const string CUSTOMER_NAME = "V Nachname";

        public string GenerateGiroCodeAscii(ZooplusInvoiceDto invoiceDto)
        {
            Girocode generator = new Girocode(ZOOPLUS_IBAN, ZOOPLUS_BIC, ZOOPLUS_NAME, (decimal)invoiceDto.Amount, $"ReNr {invoiceDto.InvoiceNumber}, KdNr {invoiceDto.CustomerNumber} {CUSTOMER_NAME}");
            string payload = generator.ToString();

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(payload, QRCodeGenerator.ECCLevel.M);
            AsciiQRCode qrCode = new AsciiQRCode(qrCodeData);
            return qrCode.GetGraphic(1);
        }

        public byte[] GenerateGiroCodePng(ZooplusInvoiceDto invoiceDto)
        {
            Girocode generator = new Girocode(ZOOPLUS_IBAN, ZOOPLUS_BIC, ZOOPLUS_NAME, (decimal)invoiceDto.Amount, $"ReNr {invoiceDto.InvoiceNumber}, KdNr {invoiceDto.CustomerNumber} {CUSTOMER_NAME}");
            string payload = generator.ToString();

            return CreateQrFromPayload(payload);
        }

        public byte[] GenerateGiroCodePng(string iban, string bic, string name, double amount, string invoiceNumber, string customerNumber, string customerName)
        {
            Girocode generator = new Girocode(iban, bic, name, (decimal)amount, $"ReNr {invoiceNumber}, KdNr {customerNumber} {customerName}");
            string payload = generator.ToString();

            return CreateQrFromPayload(payload);
        }

        private byte[] CreateQrFromPayload(string payload)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(payload, QRCodeGenerator.ECCLevel.M);
            PngByteQRCode qrCode = new PngByteQRCode(qrCodeData);
            return qrCode.GetGraphic(5);
        }
    }
}
