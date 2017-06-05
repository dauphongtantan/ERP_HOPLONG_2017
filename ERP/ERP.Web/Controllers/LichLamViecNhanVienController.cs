using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ERP.Web.Models.Database;

namespace ERP.Web.Controllers
{
    public class LichLamViecNhanVienController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: LichLamViecNhanVien
        public ActionResult Index()
        {
            return View();
        }

        // GET: LichLamViecNhanVien/Create
        public ActionResult Create()
        {
            return View();
        }

      
        // GET: LichLamViecNhanVien/Edit/5
        public ActionResult Edit(int? id)
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
