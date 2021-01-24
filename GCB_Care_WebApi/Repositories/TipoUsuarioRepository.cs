using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuario
    {
        public void Delete(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbTipoUsuario usuario = GetById(id);
                Ctx.TbTipoUsuario.Remove(usuario);
                Ctx.SaveChanges();
            }
        }

        public List<TbTipoUsuario> Get()
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbTipoUsuario.ToList();
            }
        }

        public TbTipoUsuario GetById(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbTipoUsuario.FirstOrDefault(x => x.Id == id);
            }
        }

        public void Post(TbTipoUsuario TipoUsuario)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                if (TipoUsuario != null)
                {
                    Ctx.TbTipoUsuario.Add(TipoUsuario);
                    Ctx.SaveChanges();
                }
            }
        }

        public void Update(int id, TbTipoUsuario TipoUsuario)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                TbTipoUsuario usuarioAtual = GetById(id);
                usuarioAtual.Titulo = (TipoUsuario.Titulo == null || TipoUsuario.Titulo == "") ? usuarioAtual.Titulo : TipoUsuario.Titulo;
                Ctx.TbTipoUsuario.Update(usuarioAtual);
                Ctx.SaveChanges();
            }
        }
    }
}
