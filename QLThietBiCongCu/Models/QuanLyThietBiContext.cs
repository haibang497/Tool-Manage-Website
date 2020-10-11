using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QLThietBiCongCu.Models
{
    public partial class QuanLyThietBiContext : DbContext
    {
        public QuanLyThietBiContext()
        {
        }

        public QuanLyThietBiContext(DbContextOptions<QuanLyThietBiContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DonVi> DonVi { get; set; }
        public virtual DbSet<DongTb> DongTb { get; set; }
        public virtual DbSet<HoaDon> HoaDon { get; set; }
        public virtual DbSet<LoaiTb> LoaiTb { get; set; }
        public virtual DbSet<MaTb> MaTb { get; set; }
        public virtual DbSet<NhomKd> NhomKd { get; set; }
        public virtual DbSet<NhomTb> NhomTb { get; set; }
        public virtual DbSet<ThongTinKd> ThongTinKd { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=INTERN-NHBANG; Database=QuanLyThietBi; Trusted_Connection=True; MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DonVi>(entity =>
            {
                entity.HasKey(e => e.MaDonVi)
                    .HasName("PK__DonVi$__DDA5A6CF32924CE6");

                entity.ToTable("DonVi$");

                entity.Property(e => e.MaDonVi).HasMaxLength(255);

                entity.Property(e => e.Delete)
                    .HasColumnName("delete")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.TenDonVi).HasMaxLength(255);
            });

            modelBuilder.Entity<DongTb>(entity =>
            {
                entity.HasKey(e => e.IddongTb)
                    .HasName("PK__DongTB$__FE71207E38711D83");

                entity.ToTable("DongTB$");

                entity.Property(e => e.IddongTb)
                    .HasColumnName("IDDongTB")
                    .HasMaxLength(255);

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.DongTb1)
                    .HasColumnName("DongTB")
                    .HasMaxLength(255);

                entity.Property(e => e.IdnhomTb)
                    .HasColumnName("IDNhomTB")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.HasKey(e => e.IdhoaDon)
                    .HasName("PK__HoaDon$__5B896F49E6576414");

                entity.ToTable("HoaDon$");

                entity.Property(e => e.IdhoaDon)
                    .HasColumnName("IDHoaDon")
                    .HasMaxLength(255);

                entity.Property(e => e.Delete).HasColumnName("delete");

                entity.Property(e => e.LoaiHoaDon).HasMaxLength(255);

                entity.Property(e => e.NgayHoaDon).HasMaxLength(255);

                entity.Property(e => e.SoHoaDon).HasMaxLength(255);

                entity.Property(e => e.TinhTrangHoaDon).HasMaxLength(255);

                entity.Property(e => e.ViTriLuuTruHd)
                    .HasColumnName("ViTriLuuTruHD")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<LoaiTb>(entity =>
            {
                entity.HasKey(e => e.MaLoai)
                    .HasName("PK__LoaiTB$__730A57598B99F631");

                entity.ToTable("LoaiTB$");

                entity.Property(e => e.MaLoai).HasMaxLength(255);

                entity.Property(e => e.Delete).HasColumnName("delete");

                entity.Property(e => e.LoaiThietBi).HasMaxLength(255);
            });

            modelBuilder.Entity<MaTb>(entity =>
            {
                entity.HasKey(e => e.MaTb1)
                    .HasName("PK__MaTB$__2725006F35B9B29B");

                entity.ToTable("MaTB$");

                entity.Property(e => e.MaTb1)
                    .HasColumnName("MaTB")
                    .HasMaxLength(255);

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.DonViBan).HasMaxLength(255);

                entity.Property(e => e.DonViTinh).HasMaxLength(255);

                entity.Property(e => e.GhiChu).HasMaxLength(255);

                entity.Property(e => e.GiaMua).HasMaxLength(255);

                entity.Property(e => e.IddongTb)
                    .HasColumnName("IDDongTB")
                    .HasMaxLength(255);

                entity.Property(e => e.IdhoaDon)
                    .HasColumnName("IDHoaDon")
                    .HasMaxLength(255);

                entity.Property(e => e.IdnhomTb)
                    .HasColumnName("IDNhomTB")
                    .HasMaxLength(255);

                entity.Property(e => e.MaDonVi).HasMaxLength(255);

                entity.Property(e => e.MaLoai).HasMaxLength(255);

                entity.Property(e => e.MaMay).HasMaxLength(255);

                entity.Property(e => e.MaNhomKd)
                    .HasColumnName("MaNhomKD")
                    .HasMaxLength(255);

                entity.Property(e => e.NamSx)
                    .HasColumnName("NamSX")
                    .HasMaxLength(255);

                entity.Property(e => e.NgayPhieuNhap).HasMaxLength(255);

                entity.Property(e => e.NgayPhieuXuat).HasMaxLength(255);

                entity.Property(e => e.NgayTinhTrang).HasMaxLength(255);

                entity.Property(e => e.NuocSanXuat).HasMaxLength(255);

                entity.Property(e => e.PhapLy).HasMaxLength(255);

                entity.Property(e => e.Soluong)
                    .HasColumnName("soluong")
                    .HasMaxLength(255);

                entity.Property(e => e.Stt)
                    .HasColumnName("STT")
                    .HasMaxLength(255);

                entity.Property(e => e.TenChuan).HasMaxLength(255);

                entity.Property(e => e.TenTb)
                    .HasColumnName("TenTB")
                    .HasMaxLength(255);

                entity.Property(e => e.TinhTrang).HasMaxLength(255);

                entity.Property(e => e.ViTriLuuTruBkk)
                    .HasColumnName("ViTriLuuTruBKK")
                    .HasMaxLength(255);

                entity.HasOne(d => d.IddongTbNavigation)
                    .WithMany(p => p.MaTb)
                    .HasForeignKey(d => d.IddongTb)
                    .HasConstraintName("FK_MaTB$_DongTB$");

                entity.HasOne(d => d.IdhoaDonNavigation)
                    .WithMany(p => p.MaTb)
                    .HasForeignKey(d => d.IdhoaDon)
                    .HasConstraintName("FK_MaTB$_HoaDon$");

                entity.HasOne(d => d.IdnhomTbNavigation)
                    .WithMany(p => p.MaTb)
                    .HasForeignKey(d => d.IdnhomTb)
                    .HasConstraintName("FK_MaTB$_NhomTB$");

                entity.HasOne(d => d.MaDonViNavigation)
                    .WithMany(p => p.MaTb)
                    .HasForeignKey(d => d.MaDonVi)
                    .HasConstraintName("FK_MaTB$_DonVi$");

                entity.HasOne(d => d.MaLoaiNavigation)
                    .WithMany(p => p.MaTb)
                    .HasForeignKey(d => d.MaLoai)
                    .HasConstraintName("FK_MaTB$_LoaiTB$");

                entity.HasOne(d => d.MaNhomKdNavigation)
                    .WithMany(p => p.MaTb)
                    .HasForeignKey(d => d.MaNhomKd)
                    .HasConstraintName("FK_MaTB$_NhomKD$");
            });

            modelBuilder.Entity<NhomKd>(entity =>
            {
                entity.HasKey(e => e.MaNhomKd)
                    .HasName("PK__NhomKD$__5A1F6573938D3A85");

                entity.ToTable("NhomKD$");

                entity.Property(e => e.MaNhomKd)
                    .HasColumnName("MaNhomKD")
                    .HasMaxLength(255);

                entity.Property(e => e.Delete).HasColumnName("delete");

                entity.Property(e => e.NhomKiemDinh).HasMaxLength(255);
            });

            modelBuilder.Entity<NhomTb>(entity =>
            {
                entity.HasKey(e => e.IdnhomTb)
                    .HasName("PK__NhomTB$__7B168B48D3DDD4F6");

                entity.ToTable("NhomTB$");

                entity.Property(e => e.IdnhomTb)
                    .HasColumnName("IDNhomTB")
                    .HasMaxLength(255);

                entity.Property(e => e.Delete).HasColumnName("delete");

                entity.Property(e => e.NhomTb1)
                    .HasColumnName("NhomTB")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<ThongTinKd>(entity =>
            {
                entity.HasKey(e => e.MaKd)
                    .HasName("PK__ThongTin__2725CF02323831C5");

                entity.ToTable("ThongTinKD$");

                entity.Property(e => e.MaKd)
                    .HasColumnName("MaKD")
                    .HasMaxLength(255);

                entity.Property(e => e.ChuKyKd)
                    .HasColumnName("ChuKyKD")
                    .HasMaxLength(255);

                entity.Property(e => e.Delete).HasColumnName("delete");

                entity.Property(e => e.DonViGuiKd)
                    .HasColumnName("DonViGuiKD")
                    .HasMaxLength(255);

                entity.Property(e => e.DonViKd)
                    .HasColumnName("DonViKD")
                    .HasMaxLength(255);

                entity.Property(e => e.GiaKd)
                    .HasColumnName("GiaKD")
                    .HasMaxLength(255);

                entity.Property(e => e.MaTb)
                    .HasColumnName("MaTB")
                    .HasMaxLength(255);

                entity.Property(e => e.NgayKdganNhat)
                    .HasColumnName("NgayKDGanNhat")
                    .HasMaxLength(255);

                entity.Property(e => e.NgaytoihanKd)
                    .HasColumnName("NgaytoihanKD")
                    .HasMaxLength(255);

                entity.Property(e => e.SoKd)
                    .HasColumnName("SoKD")
                    .HasMaxLength(255);

                entity.Property(e => e.SoSeri).HasMaxLength(255);

                entity.Property(e => e.TinhTrangKd)
                    .HasColumnName("TinhTrangKD")
                    .HasMaxLength(255);

                entity.Property(e => e.ViTriLuuTruKd)
                    .HasColumnName("ViTriLuuTruKD")
                    .HasMaxLength(255);

                entity.HasOne(d => d.MaTbNavigation)
                    .WithMany(p => p.ThongTinKd)
                    .HasForeignKey(d => d.MaTb)
                    .HasConstraintName("FK_'Thông tin KD$'_MaTB$");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.Property(e => e.IdUser).HasMaxLength(50);

                entity.Property(e => e.ChucVu).HasMaxLength(50);

                entity.Property(e => e.DiaChi).HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.MatKhau).HasMaxLength(50);

                entity.Property(e => e.SinhNhat).HasMaxLength(50);

                entity.Property(e => e.SoDienThoai).HasMaxLength(50);

                entity.Property(e => e.TenNguoiDung).HasMaxLength(50);

                entity.Property(e => e.TenTaiKhoan).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
