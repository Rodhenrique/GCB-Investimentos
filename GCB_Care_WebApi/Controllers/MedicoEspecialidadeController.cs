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
    public class MedicoEspecialidadeController : ControllerBase
    {
        private readonly IMedicoEspecialidade _medicoEspecialidade;

        public MedicoEspecialidadeController(IMedicoEspecialidade especialidade)
        {
            _medicoEspecialidade = especialidade;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            try
            {
                var tbMedicosEspecialidades = _medicoEspecialidade.Get();
                if (tbMedicosEspecialidades.Count != 0)
                {
                    return Ok(tbMedicosEspecialidades);
                }
                else
                {
                    return NotFound("Nenhuma especialidade médica encontrada!!!");
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet("List/id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult ListById(int id)
        {
            try
            {
                var tbMedicosEspecialidades = _medicoEspecialidade.ListById(id);
                if (tbMedicosEspecialidades.Count != 0)
                {
                    return Ok(tbMedicosEspecialidades);
                }
                else
                {
                    return NotFound("Nenhuma especialidade médica encontrada!!!");
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
                TbMedicosEspecialidades tbMedicosEspecialidades = _medicoEspecialidade.GetById(id);

                if (tbMedicosEspecialidades != null)
                {
                    return Ok(tbMedicosEspecialidades);
                }

                return NotFound("Nenhuma especialidade médica encontrada pelo ID informado!!!");
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post(TbMedicosEspecialidades tbMedicosEspecialidades)
        {
            try
            {
                if (tbMedicosEspecialidades != null)
                {

                    // Faz a chamada para o método
                    _medicoEspecialidade.Post(tbMedicosEspecialidades);

                    // Retorna um status code
                    return StatusCode(201);
                }
                return StatusCode(404, "Ocorreu um erro ao cadastrar uma especialidade médica");
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
        public IActionResult Put(int id, TbMedicosEspecialidades especialidadesAtualizada)
        {
            try
            {
                TbMedicosEspecialidades tbMedicosEspecialidades = _medicoEspecialidade.GetById(id);

                if (tbMedicosEspecialidades != null)
                {
                    _medicoEspecialidade.Update(id, especialidadesAtualizada);
                    return StatusCode(204);
                }
                return NotFound("Nenhuma especialidade médica encontrada com o ID informado");
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
                TbMedicosEspecialidades tbMedicosEspecialidades = _medicoEspecialidade.GetById(id);

                if (tbMedicosEspecialidades != null)
                {
                    _medicoEspecialidade.Delete(id);

                    return StatusCode(202);
                }

                return NotFound("Nenhuma especialidade médica encontrada com o ID informado");
            }
            catch (Exception error)
            {

                return BadRequest(error);
            }
        }
    }
}