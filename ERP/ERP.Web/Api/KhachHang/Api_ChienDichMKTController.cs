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

namespace ERP.Web.Api.KhachHang
{
    public class Api_ChienDichMKTController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_ChienDichMKT
        public IQueryable<DM_LIST_CHIEN_DICH_MARKETING> GetDM_LIST_CHIEN_DICH_MARKETING()
        {
            return db.DM_LIST_CHIEN_DICH_MARKETING;
        }

        [Route("api/Api_ChienDichMKT/ListChienDich")]
        public List<DM_LIST_CHIEN_DICH_MARKETING> ListChienDich()
        {
            var vData = db.DM_LIST_CHIEN_DICH_MARKETING;
            var result = vData.ToList().Select(x => new DM_LIST_CHIEN_DICH_MARKETING()
            {
                ID = x.ID,
                TEN_LIST = x.TEN_LIST,
            }).ToList();
            return result;
        }

        [Route("api/Api_ChienDichMKT/KiemTraKH/{makh}")]
        public List<KiemTraKH_ChienDich_Result> KiemTraKH(string makh)
        {
            var query = db.Database.SqlQuery<KiemTraKH_ChienDich_Result>("KiemTraKH_ChienDich @makh", new SqlParameter("makh", makh));
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_ChienDichMKT/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDM_LIST_CHIEN_DICH_MARKETING(int id, DM_LIST_CHIEN_DICH_MARKETING dM_LIST_CHIEN_DICH_MARKETING)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dM_LIST_CHIEN_DICH_MARKETING.ID)
            {
                return BadRequest();
            }

            db.Entry(dM_LIST_CHIEN_DICH_MARKETING).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DM_LIST_CHIEN_DICH_MARKETINGExists(id))
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

        // POST: api/Api_ChienDichMKT
        [Route("api/Api_ChienDichMKT/PostDM_LIST_CHIEN_DICH_MARKETING")]
        public IHttpActionResult PostDM_LIST_CHIEN_DICH_MARKETING(DM_LIST_CHIEN_DICH_MARKETING dM_LIST_CHIEN_DICH_MARKETING)
        {
            DM_LIST_CHIEN_DICH_MARKETING newchiendich = new DM_LIST_CHIEN_DICH_MARKETING();
            newchiendich.TEN_LIST = dM_LIST_CHIEN_DICH_MARKETING.TEN_LIST;

            db.DM_LIST_CHIEN_DICH_MARKETING.Add(newchiendich);
            db.SaveChanges();

            return Ok(newchiendich);
        }

        // POST: api/Api_ChienDichMKT
        [Route("api/Api_ChienDichMKT/KH_CHIEN_DICH_MKT")]
        public IHttpActionResult KH_CHIEN_DICH_MKT(KH_CHIEN_DICH_MARKETING dM_LIST_CHIEN_DICH_MARKETING)
        {
            KH_CHIEN_DICH_MARKETING newchiendich = new KH_CHIEN_DICH_MARKETING();
            newchiendich.ID_CHIEN_DICH = dM_LIST_CHIEN_DICH_MARKETING.ID_CHIEN_DICH;
            newchiendich.MA_KHACH_HANG = dM_LIST_CHIEN_DICH_MARKETING.MA_KHACH_HANG;
            db.KH_CHIEN_DICH_MARKETING.Add(newchiendich);
            db.SaveChanges();

            return Ok(newchiendich);
        }

        // DELETE: api/Api_ChienDichMKT/5
        [ResponseType(typeof(DM_LIST_CHIEN_DICH_MARKETING))]
        public IHttpActionResult DeleteDM_LIST_CHIEN_DICH_MARKETING(int id)
        {
            DM_LIST_CHIEN_DICH_MARKETING dM_LIST_CHIEN_DICH_MARKETING = db.DM_LIST_CHIEN_DICH_MARKETING.Find(id);
            if (dM_LIST_CHIEN_DICH_MARKETING == null)
            {
                return NotFound();
            }

            db.DM_LIST_CHIEN_DICH_MARKETING.Remove(dM_LIST_CHIEN_DICH_MARKETING);
            db.SaveChanges();

            return Ok(dM_LIST_CHIEN_DICH_MARKETING);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DM_LIST_CHIEN_DICH_MARKETINGExists(int id)
        {
            return db.DM_LIST_CHIEN_DICH_MARKETING.Count(e => e.ID == id) > 0;
        }
    }
}