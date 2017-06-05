﻿using System;
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

namespace ERP.Web.Api.DonHangPO
{
    public class Api_HangCanXuatController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/Api_HangCanXuat
        [Route("api/Api_HangCanXuat/GetBH_DON_HANG_PO/{isadmin}/{username}/{macongty}")]
        public List<Prod_HangCanXuat_Result> GetBH_DON_HANG_PO(bool isadmin,string username,string macongty)
        {
            var query = db.Database.SqlQuery<Prod_HangCanXuat_Result>("Prod_HangCanXuat @macongty,@isadmin,@username", new SqlParameter("macongty", macongty), new SqlParameter("isadmin", isadmin), new SqlParameter("username", username));
            var result = query.ToList();
            return result;
        }

        // GET: api/Api_HangCanXuat/5
        [ResponseType(typeof(BH_DON_HANG_PO))]
        public IHttpActionResult GetBH_DON_HANG_PO(string id)
        {
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return NotFound();
            }

            return Ok(bH_DON_HANG_PO);
        }

        // PUT: api/Api_HangCanXuat/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBH_DON_HANG_PO(string id, BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bH_DON_HANG_PO.MA_SO_PO)
            {
                return BadRequest();
            }

            db.Entry(bH_DON_HANG_PO).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BH_DON_HANG_POExists(id))
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

        // POST: api/Api_HangCanXuat
        [ResponseType(typeof(BH_DON_HANG_PO))]
        public IHttpActionResult PostBH_DON_HANG_PO(BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BH_DON_HANG_PO.Add(bH_DON_HANG_PO);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BH_DON_HANG_POExists(bH_DON_HANG_PO.MA_SO_PO))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bH_DON_HANG_PO.MA_SO_PO }, bH_DON_HANG_PO);
        }

        // DELETE: api/Api_HangCanXuat/5
        [ResponseType(typeof(BH_DON_HANG_PO))]
        public IHttpActionResult DeleteBH_DON_HANG_PO(string id)
        {
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return NotFound();
            }

            db.BH_DON_HANG_PO.Remove(bH_DON_HANG_PO);
            db.SaveChanges();

            return Ok(bH_DON_HANG_PO);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BH_DON_HANG_POExists(string id)
        {
            return db.BH_DON_HANG_PO.Count(e => e.MA_SO_PO == id) > 0;
        }
    }
}