using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest<Unit>
        {
            public Product Product { get; set; }
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
                _context.Products.Add(request.Product);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}
