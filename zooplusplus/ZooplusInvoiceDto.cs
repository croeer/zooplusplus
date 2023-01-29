using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zooplusplus
{

    public enum InvoiceStatus
    {
        Undefined,
        Unpaid,
        Paid,
        InArrears
    }

    public class ZooplusInvoiceDto
    {
        public Guid Id { get; set; }

        public string? InvoiceNumber { get; set; }

        public DateTime InvoiceDate { get; set; }

        public DateTime InvoiceDueDate { get; set; }

        public double Amount { get; set; }

        public InvoiceStatus Status { get; set; }

    }
}
