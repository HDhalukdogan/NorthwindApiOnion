using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Suppliers
{
    public class Detail
    {
        public class Query : IRequest<Result<SupplierDto>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<SupplierDto>>
        {
            private readonly NorthwindContext _context;
            private readonly IMapper _mapper;

            public Handler(NorthwindContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<SupplierDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var supplier = await _context.Suppliers.ProjectTo<SupplierDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(c => c.SupplierId == request.Id);
                return Result<SupplierDto>.Success(supplier);
            }
        }
    }
}
