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

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<Result<IEnumerable<CategoryDto>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<CategoryDto>>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var response = await _context.Categories.ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToListAsync();
                return Result<IEnumerable<CategoryDto>>.Success(response);
            }
        }
    }
}
