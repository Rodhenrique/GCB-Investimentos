using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GCB_Care_WebApi.Models
{
    public partial class GcbCareContext : DbContext
    {
        public GcbCareContext()
        {
        }

        public GcbCareContext(DbContextOptions<GcbCareContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TbEspecialidades> TbEspecialidades { get; set; }
        public virtual DbSet<TbMedicos> TbMedicos { get; set; }
        public virtual DbSet<TbMedicosEspecialidades> TbMedicosEspecialidades { get; set; }
        public virtual DbSet<TbTipoUsuario> TbTipoUsuario { get; set; }
        public virtual DbSet<TbUsuarios> TbUsuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=LAPTOP-OEOULMOC\\SQLEXPRESS;Database=GcbCare;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TbEspecialidades>(entity =>
            {
                entity.ToTable("Tb_Especialidades");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMedicos>(entity =>
            {
                entity.ToTable("Tb_Medicos");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Bairro)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Cep)
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.Crm)
                    .HasColumnName("CRM")
                    .HasMaxLength(7)
                    .IsUnicode(false);

                entity.Property(e => e.DataNascimento).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Localidade)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Logradouro)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Numero)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.TelefoneCelular)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.TelefoneFixo)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Uf)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.TbMedicos)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__Tb_Medico__IdTip__29572725");
            });

            modelBuilder.Entity<TbMedicosEspecialidades>(entity =>
            {
                entity.ToTable("Tb_Medicos_Especialidades");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.HasOne(d => d.IdEspecialidadeNavigation)
                    .WithMany(p => p.TbMedicosEspecialidades)
                    .HasForeignKey(d => d.IdEspecialidade)
                    .HasConstraintName("FK__Tb_Medico__IdEsp__2F10007B");

                entity.HasOne(d => d.IdMedicoNavigation)
                    .WithMany(p => p.TbMedicosEspecialidades)
                    .HasForeignKey(d => d.IdMedico)
                    .HasConstraintName("FK__Tb_Medico__IdMed__2E1BDC42");
            });

            modelBuilder.Entity<TbTipoUsuario>(entity =>
            {
                entity.ToTable("Tb_TipoUsuario");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(120)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbUsuarios>(entity =>
            {
                entity.ToTable("Tb_Usuarios");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cpf)
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.TbUsuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__Tb_Usuari__IdTip__267ABA7A");
            });
        }
    }
}
