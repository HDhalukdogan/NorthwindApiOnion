using Application.Categories;
using Application.Orders;
using Application.Products;
using Application.Suppliers;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Product, ProductDto>()
                .ForMember(d => d.CategoryName, s => s.MapFrom(c => c.Category.CategoryName))
                .ForMember(d => d.SupplierName, s => s.MapFrom(c => c.Supplier.CompanyName));
            CreateMap<Supplier, SupplierDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderDetail, OrderDetailDto>();
        }
    }
}
