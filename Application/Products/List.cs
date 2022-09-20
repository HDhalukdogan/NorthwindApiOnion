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
    public class List
    {
        public class Query : IRequest<Result<PagedList<ProductDto>>>
        {
            public ProductParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ProductDto>>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Products.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsQueryable();
                if (request.Params.Search != null)
                {
                    query = query.Where(p => p.ProductName.ToLower().Contains(request.Params.Search.Trim().ToLower()));
                }
                if (request.Params.CategoryId != null)
                {
                    query = query.Where(p => p.CategoryId == request.Params.CategoryId);
                }
                if (request.Params.SupplierId != null)
                {
                    query = query.Where(p => p.SupplierId == request.Params.SupplierId);
                }

                return Result<PagedList<ProductDto>>.Success(await PagedList<ProductDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}
