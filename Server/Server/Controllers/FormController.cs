using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Server.Services.TokenService;
using System.Security.Claims;
using Server.Services.UserService;
using Server.Services.CreateFormService;
using Server.Models.Identity;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class FormController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IFormService _formService;
        
        public FormController(ITokenService tokenService, IUserService userService, IFormService formService)
        {
            _tokenService = tokenService;
            _userService = userService;
            _formService = formService;
        }

        [HttpPost("createForm")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> CreateForm(CreateFormRequest request)
        {
            var jwt = _tokenService.GetTokenFromHeaders();
            var userDataFromJwt = _tokenService.DecodeJwt(jwt);
            var userEmail = userDataFromJwt.FindFirstValue("Email");
            var userRole = userDataFromJwt.FindFirstValue("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");

            var user = await _userService.GetUserByEmailAndRole(userEmail, userRole);
            var userName = user.FirstName + " " + user.SecondName;

            _formService.CreateForm(request.FormTitle, userName, request.Questions);

            return Ok("The form has been created successfully");
        }

        [HttpGet("getAllForms")]
        [Authorize(Roles = "User")]
        public IActionResult GetAllForms ()
        {
            var forms = _formService.GetAllForms();

            return Ok(forms);
        }

        [HttpGet("getForm")]
        [Authorize(Roles = "User")]
        public IActionResult GetForm([FromQuery] Guid id)
        {
            var form = _formService.GetForm(id);

            return Ok(form);
        }

        [HttpPost("fillForm")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> FillInTheForm(List<FillFormRequest> request, [FromQuery] Guid FormId)
        {
            var jwt = _tokenService.GetTokenFromHeaders();
            var userDataFromJwt = _tokenService.DecodeJwt(jwt);
            var userEmail = userDataFromJwt.FindFirstValue("Email");
            var userRole = userDataFromJwt.FindFirstValue("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");

            var user = await _userService.GetUserByEmailAndRole(userEmail, userRole);

            var result = _formService.FillForm(request, user.Id, FormId);
            return Ok(result);
        }
    }
}
