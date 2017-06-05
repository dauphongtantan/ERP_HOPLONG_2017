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
    public class DonHangPOController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: DonHangPO
        public ActionResult Index()
        {
            var bH_DON_HANG_PO = db.BH_DON_HANG_PO.Include(b => b.KH).Include(b => b.CCTC_NHAN_VIEN);
            return View(bH_DON_HANG_PO.ToList());
        }

        public ActionResult DanhSachDuyetPO()
        {

            return View();
        }

        // GET: DonHangPO/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return HttpNotFound();
            }
            return View(bH_DON_HANG_PO);
        }

        // GET: DonHangPO/Create
        public ActionResult Create()
        {
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY");
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH");
            return View();
        }

        // POST: DonHangPO/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MA_SO_PO,NGAY_LEN_PO,MA_KHACH_HANG,TEN_LIEN_HE,HINH_THUC_THANH_TOAN,THUE_SUAT_GTGT,TIEN_THUE_GTGT,TONG_TIEN_THANH_TOAN,SO_TIEN_VIET_BANG_CHU,NHAN_VIEN_QUAN_LY")] BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (ModelState.IsValid)
            {
                db.BH_DON_HANG_PO.Add(bH_DON_HANG_PO);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_DON_HANG_PO.MA_KHACH_HANG);
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_DON_HANG_PO.NHAN_VIEN_QUAN_LY);
            return View(bH_DON_HANG_PO);
        }

        // GET: DonHangPO/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return HttpNotFound();
            }
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_DON_HANG_PO.MA_KHACH_HANG);
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_DON_HANG_PO.NHAN_VIEN_QUAN_LY);
            return View(bH_DON_HANG_PO);
        }

        // POST: DonHangPO/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MA_SO_PO,NGAY_LEN_PO,MA_KHACH_HANG,TEN_LIEN_HE,HINH_THUC_THANH_TOAN,THUE_SUAT_GTGT,TIEN_THUE_GTGT,TONG_TIEN_THANH_TOAN,SO_TIEN_VIET_BANG_CHU,NHAN_VIEN_QUAN_LY")] BH_DON_HANG_PO bH_DON_HANG_PO)
        {
            if (ModelState.IsValid)
            {
                db.Entry(bH_DON_HANG_PO).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_DON_HANG_PO.MA_KHACH_HANG);
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_DON_HANG_PO.NHAN_VIEN_QUAN_LY);
            return View(bH_DON_HANG_PO);
        }

        // GET: DonHangPO/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            if (bH_DON_HANG_PO == null)
            {
                return HttpNotFound();
            }
            return View(bH_DON_HANG_PO);
        }

        // POST: DonHangPO/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            BH_DON_HANG_PO bH_DON_HANG_PO = db.BH_DON_HANG_PO.Find(id);
            db.BH_DON_HANG_PO.Remove(bH_DON_HANG_PO);
            db.SaveChanges();
            return RedirectToAction("Index");
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
