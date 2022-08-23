using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class List
    {
        public class Query: IRequest<IEnumerable<Product>>
        {

        }
        public class Handler : IRequestHandler<Query, IEnumerable<Product>>
        {
            private readonly NorthwindContext _context;

            public Handler(NorthwindContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Products.ToListAsync();
            }
        }
    }
}
