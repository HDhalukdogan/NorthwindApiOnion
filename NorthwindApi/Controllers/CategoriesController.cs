using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using MediatR;
using static Application.Categories.Create;
using static Application.Categories.List;
using Application.Core;
using Application.Categories;

namespace NorthwindApi.Controllers
{

    public class CategoriesController : BaseApiController
    {


        // GET: api/Categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return HandleResult(await Mediator.Send(new Query()));

        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result<CategoryDto>>> GetCategory(int id)
        {
            return HandleResult(await Mediator.Send(new Application.Categories.Detail.Query() { Id = id }));


        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }


            return HandleResult(await Mediator.Send(new Application.Categories.Edit.Command() { Category = category }));

        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostCategory(Category category)
        {
            return HandleResult( await Mediator.Send(new Command() { Category = category }));
             
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {

            return HandleResult( await Mediator.Send(new Application.Categories.Delete.Command() { Id = id }));

             
        }

    }
}
