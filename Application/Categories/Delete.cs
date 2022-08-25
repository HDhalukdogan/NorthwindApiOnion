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
    public class Delete
    {
        public class Command : IRequest<Unit>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly NorthwindContext _context;

            public Handler(NorthwindContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FirstOrDefaultAsync(c=>c.CategoryId == request.Id);
                _context.Remove(category);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
