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
    public class Detail
    {
        public class Query : IRequest<Category>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Category>
        {
            private readonly NorthwindContext _context;

            public Handler(NorthwindContext context)
            {
                _context = context;
            }

            public async Task<Category> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == request.Id);
            }
        }
    }
}
