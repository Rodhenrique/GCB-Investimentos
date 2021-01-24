using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace GCB_Care_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsuario _usuarios;
        private readonly IMedico _medico;

        public LoginController(IUsuario usuario, IMedico medico)
        {
            _usuarios = usuario;
            _medico = medico;
        }
        [HttpPost]
        public IActionResult Login(LoginViewModel Usuario)
        {
            var buscarMedico = _medico.GetByEmailAndPass(Usuario);
            var buscarUsuario = _usuarios.GetByEmailAndPass(Usuario);
           
            if (buscarMedico != null)
            {
                var usuarioSelecionado = buscarMedico;
                var claims = new[]
              {
                new Claim(JwtRegisteredClaimNames.Email, usuarioSelecionado.Email),
                new Claim(JwtRegisteredClaimNames.Jti, usuarioSelecionado.Id.ToString()),
                new Claim(ClaimTypes.Role, usuarioSelecionado.IdTipoUsuario.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("GcbCare-key-autentication"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "GcbCare.WebApi.C#", 
                    audience: "GcbCare.WebApi.C#",
                    claims: claims, 
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            else if (buscarUsuario != null)
            {
                var usuarioSelecionado = buscarUsuario;
                var claims = new[]
                {
                new Claim(JwtRegisteredClaimNames.Email, usuarioSelecionado.Email),
                new Claim(JwtRegisteredClaimNames.Jti, usuarioSelecionado.Id.ToString()),
                new Claim(ClaimTypes.Role, usuarioSelecionado.IdTipoUsuario.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("GcbCare-key-autentication"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "GcbCare.WebApi.C#", 
                    audience: "GcbCare.WebApi.C#", 
                    claims: claims, 
                    expires: DateTime.Now.AddMinutes(30), 
                    signingCredentials: creds 
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            else
            {
                return NotFound("Email ou senha invalidos");
            }

        }
    }
}