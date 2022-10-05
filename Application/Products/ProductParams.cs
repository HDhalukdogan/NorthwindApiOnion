using Application.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class ProductParams : PagingParams
    {
        public string? OrderBy { get; set; }
        public string? Search { get; set; }
        public int? CategoryId { get; set; }
        public int? SupplierId { get; set; }
    }
}
