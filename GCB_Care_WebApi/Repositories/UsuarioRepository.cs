using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using GCB_Care_WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Repositories
{
    public class UsuarioRepository : IUsuario
    {
        public void Delete(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbUsuarios usuario = GetById(id);
                Ctx.TbUsuarios.Remove(usuario);
                Ctx.SaveChanges();
            }
        }

        public List<TbUsuarios> Get()
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbUsuarios.ToList();
            }
        }

        public TbUsuarios GetByEmailAndPass(LoginViewModel model)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbUsuarios.FirstOrDefault(x => x.Email == model.Email && x.Senha == model.Senha);
            }
        }

        public TbUsuarios GetById(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbUsuarios.FirstOrDefault(x => x.Id == id);
            }
        }

        public void Post(TbUsuarios Usuario)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                if (Usuario != null)
                {
                    Ctx.TbUsuarios.Add(Usuario);
                    Ctx.SaveChanges();
                }
            }
        }

        public void Update(int id, TbUsuarios Usuario)
        {
            throw new NotImplementedException();
        }
    }
}
