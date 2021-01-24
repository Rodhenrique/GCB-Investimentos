using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Repositories
{
    public class EspecialidadesRepository : IEspecialidades
    {
        public void Delete(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbEspecialidades especialidade = GetById(id);
                Ctx.TbEspecialidades.Remove(especialidade);
                Ctx.SaveChanges();
            }
        }

        public List<TbEspecialidades> Get()
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbEspecialidades.ToList();
            }
        }

        public TbEspecialidades GetById(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbEspecialidades.FirstOrDefault(x => x.Id == id);
            }
        }

        public void Post(TbEspecialidades especialidade)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                if (especialidade != null)
                {
                    Ctx.TbEspecialidades.Add(especialidade);
                    Ctx.SaveChanges();
                }
            }
        }

        public void Update(int id, TbEspecialidades especialidade)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbEspecialidades especialidadeAtual = GetById(id);
                especialidadeAtual.Titulo = (especialidade.Titulo == null || especialidade.Titulo == "") ? especialidadeAtual.Titulo : especialidade.Titulo;
                Ctx.TbEspecialidades.Update(especialidadeAtual);
                Ctx.SaveChanges();
            }
        }
    }
}
