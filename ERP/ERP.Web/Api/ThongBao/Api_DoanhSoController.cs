
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

namespace ERP.Web.Api.ThongBao
{
    public class Api_DoanhSoController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_DoanhSo
        public IQueryable<KD_MUC_TIEU_DOANH_SO> GetKD_MUC_TIEU_DOANH_SO()
        {
            return db.KD_MUC_TIEU_DOANH_SO;
        }

        // Muc tieu doanh so thang KD
        [Route("api/Api_DoanhSo/DoanhSoThang/{thang}/{nam}/{username}")]
        public List<Prod_KD_MucTieuDoanhSoThang_Result> DoanhSoThang(string thang,string nam,string username)
        {
            var query = db.Database.SqlQuery<Prod_KD_MucTieuDoanhSoThang_Result>("Prod_KD_MucTieuDoanhSoThang @thang,@nam,@sale", new SqlParameter("thang", thang), new SqlParameter("nam", nam), new SqlParameter("sale", username));
            var result = query.ToList();
            return result;
        }

        // Tong hop doanh so cong ty
        [Route("api/Api_DoanhSo/TongHopDoanhSo/{thang}/{nam}/{macongty}/{isadmin}")]
        public List<Prod_Admin_TongHopDoanhSoCongTy_Result> TongHopDoanhSo(string thang, string nam, string macongty,bool isadmin)
        {
            var query = db.Database.SqlQuery<Prod_Admin_TongHopDoanhSoCongTy_Result>("Prod_Admin_TongHopDoanhSoCongTy @thang,@nam,@macongty,@isadmin", new SqlParameter("thang", thang), new SqlParameter("nam", nam), new SqlParameter("macongty", macongty), new SqlParameter("isadmin", isadmin));
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_DoanhSo/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKD_MUC_TIEU_DOANH_SO(int id, KD_MUC_TIEU_DOANH_SO kD_MUC_TIEU_DOANH_SO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kD_MUC_TIEU_DOANH_SO.ID)
            {
                return BadRequest();
            }

            db.Entry(kD_MUC_TIEU_DOANH_SO).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KD_MUC_TIEU_DOANH_SOExists(id))
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

        // POST: api/Api_DoanhSo
        [ResponseType(typeof(KD_MUC_TIEU_DOANH_SO))]
        public IHttpActionResult PostKD_MUC_TIEU_DOANH_SO(KD_MUC_TIEU_DOANH_SO kD_MUC_TIEU_DOANH_SO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.KD_MUC_TIEU_DOANH_SO.Add(kD_MUC_TIEU_DOANH_SO);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = kD_MUC_TIEU_DOANH_SO.ID }, kD_MUC_TIEU_DOANH_SO);
        }

        // DELETE: api/Api_DoanhSo/5
        [ResponseType(typeof(KD_MUC_TIEU_DOANH_SO))]
        public IHttpActionResult DeleteKD_MUC_TIEU_DOANH_SO(int id)
        {
            KD_MUC_TIEU_DOANH_SO kD_MUC_TIEU_DOANH_SO = db.KD_MUC_TIEU_DOANH_SO.Find(id);
            if (kD_MUC_TIEU_DOANH_SO == null)
            {
                return NotFound();
            }

            db.KD_MUC_TIEU_DOANH_SO.Remove(kD_MUC_TIEU_DOANH_SO);
            db.SaveChanges();

            return Ok(kD_MUC_TIEU_DOANH_SO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KD_MUC_TIEU_DOANH_SOExists(int id)
        {
            return db.KD_MUC_TIEU_DOANH_SO.Count(e => e.ID == id) > 0;
        }
    }
}