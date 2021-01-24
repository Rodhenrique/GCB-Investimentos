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
    public class TipoUsuarioController : ControllerBase
    {
        private readonly ITipoUsuario _tipoUsuario;

        public TipoUsuarioController(ITipoUsuario tipoUsuario)
        {
            _tipoUsuario = tipoUsuario;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            try
            {
                var tipoUsuarios = _tipoUsuario.Get();
                if (tipoUsuarios.Count != 0)
                {
                    return Ok(tipoUsuarios);
                }
                else
                {
                    return NotFound("Nenhum tipo de usuário encontrado!!!");
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
                TbTipoUsuario tipoUsuario = _tipoUsuario.GetById(id);

                if (tipoUsuario != null)
                {
                    return Ok(tipoUsuario);
                }

                return NotFound("Nenhum tipo de usuário encontrado pelo ID informado!!!");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post(TbTipoUsuario tipoUsuario)
        {
            try
            {
                if (tipoUsuario != null)
                {

                    // Faz a chamada para o método
                    _tipoUsuario.Post(tipoUsuario);

                    // Retorna um status code
                    return StatusCode(201);
                }
                return StatusCode(404, "Ocorreu um erro ao cadastrar um tipo de usuário");
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
        public IActionResult Put(int id, TbTipoUsuario tipoUsuarioAtualizado)
        {
            try
            {
                TbTipoUsuario tipoUsuario = _tipoUsuario.GetById(id);

                if (tipoUsuario != null)
                {
                    _tipoUsuario.Update(id, tipoUsuarioAtualizado);
                    return StatusCode(204);
                }
                return NotFound("Nenhum tipo de usuário encontrado com o ID informado");
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
                TbTipoUsuario tipoUsuario = _tipoUsuario.GetById(id);

                if (tipoUsuario != null)
                {
                    _tipoUsuario.Delete(id);

                    return StatusCode(202);
                }

                return NotFound("Nenhuma tipo de usuário encontrado com o ID informado");
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }
    }
}