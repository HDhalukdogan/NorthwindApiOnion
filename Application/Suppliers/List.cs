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

namespace Application.Suppliers
{
    public class List
    {
        public class Query : IRequest<Result<IEnumerable<SupplierDto>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<SupplierDto>>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<SupplierDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var response = await _context.Suppliers.ProjectTo<SupplierDto>(_mapper.ConfigurationProvider).ToListAsync();
                return Result<IEnumerable<SupplierDto>>.Success(response);
            }
        }
    }
}
