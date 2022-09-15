using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class Detail
    {
        public class Query : IRequest<Result<ProductDto>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<ProductDto>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var response = await _context.Products.Include(p=>p.Category).ProjectTo<ProductDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(c => c.ProductId == request.Id, cancellationToken: cancellationToken);
                return Result<ProductDto>.Success(response);
            }
        }
    }
}
