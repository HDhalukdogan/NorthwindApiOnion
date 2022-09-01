using Application.Core;
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
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly NorthwindContext _context;

            public Handler(NorthwindContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == request.Id);
                _context.Remove(product);
                await _context.SaveChangesAsync();
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
