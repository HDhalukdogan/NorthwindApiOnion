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

namespace Application.Orders
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<OrderDto>>>
        {
            public OrderParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<OrderDto>>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Orders.ProjectTo<OrderDto>(_mapper.ConfigurationProvider).AsQueryable();
                if (request.Params.EmployeeId != null)
                {
                    query = query.Where(o => o.EmployeeId == request.Params.EmployeeId);
                }
                if (request.Params.CustomerId != null)
                {
                    query = query.Where(o => o.CustomerId == request.Params.CustomerId);
                }                
                if (request.Params.ProductId != null)
                {
                    query = query.Where(o => o.OrderDetails.Any(od=>od.ProductId ==request.Params.ProductId) );
                }

                return Result<PagedList<OrderDto>>.Success(await PagedList<OrderDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}
