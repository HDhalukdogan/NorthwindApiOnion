using Application.Core;
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
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Product Product { get; set; }
        }

        public class Hadler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly NorthwindContext _context;
            public Hadler(NorthwindContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {


                _context.Entry(request.Product).State = EntityState.Modified;

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update product");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
