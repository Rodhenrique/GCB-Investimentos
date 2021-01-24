using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GCB_Care_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuario _usuario;

        public UsuarioController(IUsuario usuario)
        {
            _usuario = usuario;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            try
            {
                var usuarios = _usuario.Get();
                if (usuarios.Count != 0)
                {
                    return Ok(usuarios);
                }
                else
                {
                    return NotFound("Nenhum usuário encontrado!!!");
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetById(int id)
        {
            try
            {
                TbUsuarios usuarios = _usuario.GetById(id);

                if (usuarios != null)
                {
                    return Ok(usuarios);
                }

                return NotFound("Nenhum usuário encontrado pelo ID informado!!!");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post(TbUsuarios usuarios)
        {
            try
            {
                if (usuarios != null)
                {

                    // Faz a chamada para o método
                    _usuario.Post(usuarios);

                    // Retorna um status code
                    return StatusCode(201);
                }
                return StatusCode(404, "Ocorreu um erro ao cadastrar um usuário");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put(int id, TbUsuarios usuariosAtualizado)
        {
            try
            {
                TbUsuarios usuario = _usuario.GetById(id);

                if (usuario != null)
                {
                    _usuario.Update(id, usuariosAtualizado);
                    return StatusCode(204);
                }
                return NotFound("Nenhum usuário encontrado com o ID informado");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }



        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            try
            {
                TbUsuarios usuarios = _usuario.GetById(id);

                if (usuarios != null)
                {
                    _usuario.Delete(id);

                    return StatusCode(202);
                }

                return NotFound("Nenhuma usuário encontrado com o ID informado");
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }
    }
}