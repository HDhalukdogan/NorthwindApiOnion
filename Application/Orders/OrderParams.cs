using Application.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders
{
    public class OrderParams : PagingParams
    {
        public string? CustomerId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProductId { get; set; }
    }
}
