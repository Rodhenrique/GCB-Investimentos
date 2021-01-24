using GCB_CARE_API.Interfaces;
using GCB_Care_WebApi.Models;
using GCB_Care_WebApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GCB_CARE_API.Repositories
{
    public class MedicoRepository : IMedico
    {
        public void Delete(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                DeleteEspecialidades(id);
                TbMedicos medico = GetById(id);
                Ctx.TbMedicos.Remove(medico);
                Ctx.SaveChanges();
            }
        }

        public void DeleteEspecialidades(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                List<TbMedicosEspecialidades> especialidades = Ctx
                    .TbMedicosEspecialidades.Include(x => x.IdMedicoNavigation).ToList().FindAll(x => x.IdMedicoNavigation.Id == id);

                foreach (var item in especialidades)
                {
                    Ctx.TbMedicosEspecialidades.Remove(item);
                    Ctx.SaveChanges();
                }
            }
        }

        public List<TbMedicos> Get()
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbMedicos.Include(x => x.TbMedicosEspecialidades).ToList();
            }
        }

        public TbMedicos GetByEmailAndPass(LoginViewModel model)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbMedicos.FirstOrDefault(x => x.Email == model.Email && x.Senha == model.Senha);
            }
        }

        public TbMedicos GetById(int id)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                return Ctx.TbMedicos.FirstOrDefault(M => M.Id == id);
            }
        }

        public void Post(TbMedicos medico)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                if (medico != null)
                {
                    Ctx.TbMedicos.Add(medico);
                    Ctx.SaveChanges();
                }
            }
        }

        public void Update(int id, TbMedicos medico)
        {
            using (GcbCareContext Ctx = new GcbCareContext())
            {
                if (medico != null)
                {
                    TbMedicos MedicoAtual = GetById(id);

                    MedicoAtual.Nome = (medico.Nome == null || medico.Nome == "") ? MedicoAtual.Nome : medico.Nome;

                    MedicoAtual.Email = (medico.Email == null || medico.Email == "") ? MedicoAtual.Email : medico.Email;
                    MedicoAtual.Crm = (medico.Crm == null || medico.Crm == "") ? MedicoAtual.Crm : medico.Crm;
                    MedicoAtual.Senha = (medico.Senha == null || medico.Senha == "") ? MedicoAtual.Senha : medico.Senha;
                    MedicoAtual.DataNascimento = (medico.DataNascimento == null) ? MedicoAtual.DataNascimento : medico.DataNascimento;
                    MedicoAtual.TelefoneFixo = (medico.TelefoneFixo == null || medico.TelefoneFixo == "") ? MedicoAtual.TelefoneFixo : medico.TelefoneFixo;
                    MedicoAtual.TelefoneCelular = (medico.TelefoneCelular == null || medico.TelefoneCelular == "") ? MedicoAtual.TelefoneCelular : medico.TelefoneCelular;
                    MedicoAtual.Cep = (medico.Cep == null || medico.Cep == "") ? MedicoAtual.Cep : medico.Cep;
                    MedicoAtual.Logradouro = (medico.Logradouro == null || medico.Logradouro == "") ? MedicoAtual.Logradouro : medico.Logradouro;
                    MedicoAtual.Bairro = (medico.Bairro == null || medico.Bairro == "") ? MedicoAtual.Bairro : medico.Bairro;
                    MedicoAtual.Localidade = (medico.Localidade == null || medico.Localidade == "") ? MedicoAtual.Localidade : medico.Localidade;
                    MedicoAtual.Uf = (medico.Uf == null || medico.Uf == "") ? MedicoAtual.Uf : medico.Uf;
                    MedicoAtual.Numero = (medico.Numero == null || medico.Numero == "") ? MedicoAtual.Numero : medico.Numero;
                    MedicoAtual.TbMedicosEspecialidades = medico.TbMedicosEspecialidades;
                    Ctx.TbMedicos.Update(MedicoAtual);
                    Ctx.SaveChanges();
                }
            }
        }
    }
}
