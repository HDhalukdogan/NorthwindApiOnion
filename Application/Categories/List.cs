using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<IEnumerable<Category>>
        {

        }
        public class Handler : IRequestHandler<Query, IEnumerable<Category>>
        {
            private readonly NorthwindContext _context;

            public Handler(NorthwindContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Categories.ToListAsync();
            }
        }
    }
}
