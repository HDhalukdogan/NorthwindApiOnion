using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.Products.Create;
using static Application.Products.List;

namespace NorthwindApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : BaseApiController
    {
        private readonly NorthwindContext _context;
        private readonly IMediator _mediator;

        public ProductsController(NorthwindContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        // GET: api/Products
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] ProductParams param)
        {
            //if (_context.Products == null)
            //{
            //    return NotFound();
            //}
            //  return await _context.Products.ToListAsync();
            //var products = await _mediator.Send(new Query() { Params = param });
            //if (products == null)
            //{
            //    return NotFound();
            //}
            //return Ok(products);
            return HandlePagedResult(await Mediator.Send(new Query { Params = param }));
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            //if (_context.Products == null)
            //{
            //    return NotFound();
            //}
            //  var product = await _context.Products.FindAsync(id);
            return HandleResult(await Mediator.Send(new Application.Products.Detail.Query() { Id = id }));

        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            //_context.Entry(product).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!ProductExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();
            var response = await _mediator.Send(new Application.Products.Edit.Command() { Product = product });
            return Ok(response);
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostProduct(Product product)
        {
            var response = await _mediator.Send(new Command() { Product = product });
            return Ok(response);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            //if (_context.Products == null)
            //{
            //    return NotFound();
            //}
            //var product = await _context.Products.FindAsync(id);
            //if (product == null)
            //{
            //    return NotFound();
            //}

            //_context.Products.Remove(product);
            //await _context.SaveChangesAsync();

            //return NoContent();
            var response = await _mediator.Send(new Application.Products.Delete.Command() { Id = id });

            return Ok(response);
        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.ProductId == id)).GetValueOrDefault();
        }
    }
}
