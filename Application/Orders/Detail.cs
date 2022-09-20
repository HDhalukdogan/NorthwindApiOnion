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
    public class Detail
    {
        public class Query : IRequest<Result<OrderDto>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<OrderDto>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<OrderDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.ProjectTo<OrderDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(c => c.OrderId == request.Id);
                return Result<OrderDto>.Success(order);
            }
        }
    }
}
