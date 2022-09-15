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
    public class Detail
    {
        public class Query : IRequest<Result<CategoryDto>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<CategoryDto>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<CategoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.Include(c=>c.Products).ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(c => c.CategoryId == request.Id);
                return Result<CategoryDto>.Success(category);
            }
        }
    }
}
