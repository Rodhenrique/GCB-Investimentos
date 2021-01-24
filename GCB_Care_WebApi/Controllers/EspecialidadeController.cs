using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GCB_Care_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadeController : ControllerBase
    {
        private readonly IEspecialidades _especialidades;

        public EspecialidadeController(IEspecialidades especialidade)
        {
            _especialidades = especialidade;
        }

        /// <summary>
        /// Controller responsavél por listar todas as especialidades do sistema.
        /// </summary>
        /// <response code="200">Retorna status code 200, listar todos dados do sistema.</response>
        /// <response code="404">Retorna status code 404 um não encontrado, não tiver nenhum dado.</response>   
        /// <response code="400">Retorna stauts code 400 bad request, caso de conflito com api</response> 
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            try
            {
                var especialidades = _especialidades.Get();
                if (especialidades.Count != 0)
                {
                    return Ok(especialidades);
                }
                else
                {
                    return NotFound("Nenhuma especialidade encontrada!!!");
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
                TbEspecialidades especialidades = _especialidades.GetById(id);

                if (especialidades != null)
                {
                    return Ok(especialidades);
                }

                return NotFound("Nenhuma especialidade encontrada pelo ID informado!!!");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post(TbEspecialidades especialidades)
        {
            try
            {
                if (especialidades != null)
                {

                // Faz a chamada para o método
                _especialidades.Post(especialidades);

                // Retorna um status code
                return StatusCode(201);
                }
                return StatusCode(404, "Ocorreu um erro ao cadastrar a especialidade");
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
        public IActionResult Put(int id, TbEspecialidades especialidadesAtualizadas)
        {
            try
            {
                TbEspecialidades especialidades = _especialidades.GetById(id);

                if (especialidades != null)
                {
                    _especialidades.Update(id, especialidadesAtualizadas);
                    return StatusCode(204);
                }
                return NotFound("Nenhuma especialidade encontrada com o ID informado");
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
                TbEspecialidades especialidades = _especialidades.GetById(id);

                if (especialidades != null)
                {
                    _especialidades.Delete(id);

                    return StatusCode(202);
                }

                return NotFound("Nenhuma especialidade encontrada com o ID informado");
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }

    }
}