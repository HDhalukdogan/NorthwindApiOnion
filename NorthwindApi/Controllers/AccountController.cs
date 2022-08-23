using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthwindApi.DTOs;
using NorthwindApi.Services;

namespace NorthwindApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(string name, string email, string password)
        {
            var user = new User { UserName = name, Email = email };

            IdentityResult result = await _userManager.CreateAsync(user, password);

            //await _userManager.AddToRoleAsync(user, "member");

            //if (result.Succeeded)
            //{
            //    string confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            //    string link = Url.Action("ConfirmEmail", "Home", new
            //    {
            //        userId = user.Id,
            //        token = confirmationToken
            //    }, protocol: HttpContext.Request.Scheme

            //    );

            //    EmailHelper.EmailConfirmationSendEmail(link, user.Email);

            //}
            //else
            //{
            //    //throw exception
            //}

            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(string name, string password)
        {
            var user = await _userManager.FindByNameAsync(name);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                return Unauthorized();



            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpGet("getAllUser")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersAsync()
        {
            return await _userManager.Users.ToListAsync();

        }
    }
}
