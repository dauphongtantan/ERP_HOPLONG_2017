using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ERP.Web.Models.Database;
using System.Data.SqlClient;

namespace ERP.Web.Api.NguoiDung
{
    public class Api_GiaoViecController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_GiaoViec
        public IQueryable<NV_GIAO_VIEC> GetNV_GIAO_VIEC()
        {
            return db.NV_GIAO_VIEC;
        }

        // GET: api/Api_GiaoViec/5
        [Route("api/Api_GiaoViec/GetGiaoViec/{manv}")]
        public List<GetAll_ThongTinGiaoViec_Result> GetGiaoViec(string manv)
        {
            var query = db.Database.SqlQuery<GetAll_ThongTinGiaoViec_Result>("GetAll_ThongTinGiaoViec @manhanvien", new SqlParameter("manhanvien", manv));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_GiaoViec/5
        [Route("api/Api_GiaoViec/GetGiaoViecChuaHoanThanh/{username}/{isadmin}")]
        public List<GetAll_ThongTinGiaoViecChuaHoanThanh_Result> GetGiaoViecChuaHoanThanh(string username, Boolean isadmin)
        {
            var query = db.Database.SqlQuery<GetAll_ThongTinGiaoViecChuaHoanThanh_Result>("GetAll_ThongTinGiaoViecChuaHoanThanh @username,@isadmin", new SqlParameter("username", username),new SqlParameter("isadmin", isadmin));
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_GiaoViec/5
        [Route("api/Api_GiaoViec/PutNV_GIAO_VIEC/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNV_GIAO_VIEC(int id, NV_GIAO_VIEC nV_GIAO_VIEC)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = db.NV_GIAO_VIEC.Where(x => x.ID == id).FirstOrDefault();
            if(query != null)
            {
                if (nV_GIAO_VIEC.TRANG_THAI == "Đã xong việc")

                query.TRANG_THAI = nV_GIAO_VIEC.TRANG_THAI;
                query.GHI_CHU = nV_GIAO_VIEC.GHI_CHU;
                query.PHUONG_AN_XU_LY = nV_GIAO_VIEC.PHUONG_AN_XU_LY;
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NV_GIAO_VIECExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        // PUT: api/Api_GiaoViec/5
        [Route("api/Api_GiaoViec/PutNV_GIAO_VIEC_CHUA_HT/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNV_GIAO_VIEC_CHUA_HT(int id, NV_GIAO_VIEC viecchuaht)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = db.NV_GIAO_VIEC.Where(x => x.ID == id).FirstOrDefault();
            if (query != null)
            {
                
                query.NOI_DUNG_CONG_VIEC = viecchuaht.NOI_DUNG_CONG_VIEC;
                query.PHUONG_AN_XU_LY = viecchuaht.PHUONG_AN_XU_LY;
                query.NGAY_HOAN_THANH = viecchuaht.NGAY_HOAN_THANH;
                query.GHI_CHU = viecchuaht.GHI_CHU;
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NV_GIAO_VIECExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Api_GiaoViec
        [Route("api/Api_GiaoViec/PostNV_GIAO_VIEC")]
        public IHttpActionResult PostNV_GIAO_VIEC(NV_GIAO_VIEC giaoviec)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            NV_GIAO_VIEC newviec = new NV_GIAO_VIEC();

            newviec.PHUONG_AN_XU_LY = giaoviec.PHUONG_AN_XU_LY;
            newviec.NGAY_GIAO_VIEC = giaoviec.NGAY_GIAO_VIEC;
            newviec.NOI_DUNG_CONG_VIEC = giaoviec.NOI_DUNG_CONG_VIEC;
            newviec.NGAY_HOAN_THANH = giaoviec.NGAY_HOAN_THANH;

            newviec.NGUOI_GIAO_VIEC = giaoviec.NGUOI_GIAO_VIEC;
            newviec.NHAN_VIEN_THUC_HIEN = giaoviec.NHAN_VIEN_THUC_HIEN;
            newviec.TRANG_THAI = giaoviec.TRANG_THAI;
            newviec.GHI_CHU = giaoviec.GHI_CHU;
            newviec.HUY_CONG_VIEC = giaoviec.HUY_CONG_VIEC;
            db.NV_GIAO_VIEC.Add(newviec);
            db.SaveChanges();

            return Ok(newviec);
        }

        // DELETE: api/Api_GiaoViec/5
        [ResponseType(typeof(NV_GIAO_VIEC))]
        public IHttpActionResult DeleteNV_GIAO_VIEC(int id)
        {
            NV_GIAO_VIEC nV_GIAO_VIEC = db.NV_GIAO_VIEC.Find(id);
            if (nV_GIAO_VIEC == null)
            {
                return NotFound();
            }

            db.NV_GIAO_VIEC.Remove(nV_GIAO_VIEC);
            db.SaveChanges();

            return Ok(nV_GIAO_VIEC);
        }


        // DELETE: api/Api_GiaoViec/5
        [ResponseType(typeof(NV_GIAO_VIEC))]
        [Route("api/Api_GiaoViec/DeleteNV_GIAO_VIEC_CHUA_HT/{id}")]
        public IHttpActionResult DeleteNV_GIAO_VIEC_CHUA_HT(int id)
        {
            NV_GIAO_VIEC NV_GIAO_VIEC_CHUA_HT = db.NV_GIAO_VIEC.Find(id);
            if (NV_GIAO_VIEC_CHUA_HT == null)
            {
                return NotFound();
            }

            db.NV_GIAO_VIEC.Remove(NV_GIAO_VIEC_CHUA_HT);
            db.SaveChanges();

            return Ok(NV_GIAO_VIEC_CHUA_HT);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NV_GIAO_VIECExists(int id)
        {
            return db.NV_GIAO_VIEC.Count(e => e.ID == id) > 0;
        }
    }
}