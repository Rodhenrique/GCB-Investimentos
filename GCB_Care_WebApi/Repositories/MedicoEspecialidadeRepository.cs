using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Repositories
{
    public class MedicoEspecialidadeRepository : IMedicoEspecialidade
    {
        public void Delete(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbMedicosEspecialidades especialidade = GetById(id);
                Ctx.TbMedicosEspecialidades.Remove(especialidade);
                Ctx.SaveChanges();
            }
        }

        public List<TbMedicosEspecialidades> Get()
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbMedicosEspecialidades.ToList();
            }
        }

        public TbMedicosEspecialidades GetById(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbMedicosEspecialidades.FirstOrDefault(x => x.Id == id);
            }
        }

        public List<TbMedicosEspecialidades> ListById(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbMedicosEspecialidades.Include(x => x.IdEspecialidadeNavigation).ToList().FindAll(x => x.IdMedico == id);
            }
        }

        public void Post(TbMedicosEspecialidades especialidade)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                if (especialidade != null)
                {
                    Ctx.TbMedicosEspecialidades.Add(especialidade);
                    Ctx.SaveChanges();
                }
            }
        }

        public void Update(int id, TbMedicosEspecialidades especialidade)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbMedicosEspecialidades tbMedicosAtual = GetById(id);
                tbMedicosAtual.IdEspecialidade = (especialidade.IdEspecialidade == null) ? tbMedicosAtual.IdEspecialidade : especialidade.IdEspecialidade;
                tbMedicosAtual.IdMedico = (especialidade.IdMedico == null) ? tbMedicosAtual.IdMedico : especialidade.IdMedico;
                Ctx.TbMedicosEspecialidades.Update(tbMedicosAtual);
                Ctx.SaveChanges();
            }
        }
    }
}
