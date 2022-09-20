using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using static Application.Orders.List;
using static Application.Orders.Create;
using Application.Orders;

namespace NorthwindApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] OrderParams orderParams)
        {
            return HandleResult(await Mediator.Send(new Query() { Params = orderParams }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return HandleResult(await Mediator.Send(new Application.Orders.Detail.Query() { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            return HandleResult(await Mediator.Send(new Application.Orders.Edit.Command() { Order = order }));
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            return HandleResult(await Mediator.Send(new Command() { Order = order }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            return HandleResult(await Mediator.Send(new Application.Orders.Delete.Command() { Id = id }));
        }
    }
}
