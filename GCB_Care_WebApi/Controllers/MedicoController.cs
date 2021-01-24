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
    public class MedicoController : ControllerBase
    {
        private readonly IMedico _medico;

        public MedicoController(IMedico medico)
        {
            _medico = medico;
        }

    
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            try
            {
                var medicos = _medico.Get();
                if (medicos.Count != 0)
                {
                    return Ok(medicos);
                }
                else
                {
                    return NotFound("Nenhum médico encontrado!!!");
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
                TbMedicos medicos = _medico.GetById(id);

                if (medicos != null)
                {
                    return Ok(medicos);
                }

                return NotFound("Nenhum médico encontrado pelo ID informado!!!");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post(TbMedicos medicos)
        {
            try
            {
                if (medicos != null)
                {

                    // Faz a chamada para o método
                    _medico.Post(medicos);
                    // Retorna um status code
                    return StatusCode(201);
                }
                return StatusCode(404, "Ocorreu um erro ao cadastrar o médico");
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
        public IActionResult Put(int id, TbMedicos medicosAtualizado)
        {
            try
            {
                TbMedicos especialidades = _medico.GetById(id);

                if (especialidades != null)
                {
                    _medico.Update(id, medicosAtualizado);
                    return StatusCode(204);
                }
                return NotFound("Nenhum médico encontrado com o ID informado");
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
                TbMedicos medicos = _medico.GetById(id);

                if (medicos != null)
                {
                    _medico.Delete(id);

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