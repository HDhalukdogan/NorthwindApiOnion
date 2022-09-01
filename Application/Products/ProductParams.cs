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
        public string? Search { get; set; }
    }
}
