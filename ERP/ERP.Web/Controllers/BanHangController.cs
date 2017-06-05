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
    public class BanHangController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: BanHang
        public ActionResult Index()
        {
            var bH_DON_BAN_HANG = db.BH_DON_BAN_HANG.Include(b => b.KH).Include(b => b.CCTC_NHAN_VIEN).Include(b => b.CCTC_CONG_TY);
            return View(bH_DON_BAN_HANG.ToList());
        }

        public ActionResult POChuaXuLy()
        {
            return View();
        }
        // GET: BanHang/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_DON_BAN_HANG bH_DON_BAN_HANG = db.BH_DON_BAN_HANG.Find(id);
            if (bH_DON_BAN_HANG == null)
            {
                return HttpNotFound();
            }
            return View(bH_DON_BAN_HANG);
        }

        // GET: BanHang/Create
        public ActionResult Create()
        {
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY");
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH");
            ViewBag.TRUC_THUOC = new SelectList(db.CCTC_CONG_TY, "MA_CONG_TY", "TEN_CONG_TY");
            return View();
        }

        // POST: BanHang/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MA_SO_BH,NGAY_BH,MA_KHACH_HANG,TEN_LIEN_HE,HINH_THUC_THANH_TOAN,TONG_TIEN_HANG,SO_TIEN_VIET_BANG_CHU,NGAY_GIAO_HANG,DIA_DIEM_GIAO_HANG,NHAN_VIEN_QUAN_LY,DA_XUAT_KHO,MA_SO_XUAT_KHO,TRUC_THUOC,TONG_TIEN_THANH_TOAN,TONG_TIEN_THUE_GTGT,DA_LAP_HOA_DON")] BH_DON_BAN_HANG bH_DON_BAN_HANG)
        {
            if (ModelState.IsValid)
            {
                db.BH_DON_BAN_HANG.Add(bH_DON_BAN_HANG);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_DON_BAN_HANG.MA_KHACH_HANG);
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_DON_BAN_HANG.NHAN_VIEN_QUAN_LY);
            ViewBag.TRUC_THUOC = new SelectList(db.CCTC_CONG_TY, "MA_CONG_TY", "TEN_CONG_TY", bH_DON_BAN_HANG.TRUC_THUOC);
            return View(bH_DON_BAN_HANG);
        }

        // GET: BanHang/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_DON_BAN_HANG bH_DON_BAN_HANG = db.BH_DON_BAN_HANG.Find(id);
            if (bH_DON_BAN_HANG == null)
            {
                return HttpNotFound();
            }
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_DON_BAN_HANG.MA_KHACH_HANG);
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_DON_BAN_HANG.NHAN_VIEN_QUAN_LY);
            ViewBag.TRUC_THUOC = new SelectList(db.CCTC_CONG_TY, "MA_CONG_TY", "TEN_CONG_TY", bH_DON_BAN_HANG.TRUC_THUOC);
            return View(bH_DON_BAN_HANG);
        }

        // POST: BanHang/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MA_SO_BH,NGAY_BH,MA_KHACH_HANG,TEN_LIEN_HE,HINH_THUC_THANH_TOAN,TONG_TIEN_HANG,SO_TIEN_VIET_BANG_CHU,NGAY_GIAO_HANG,DIA_DIEM_GIAO_HANG,NHAN_VIEN_QUAN_LY,DA_XUAT_KHO,MA_SO_XUAT_KHO,TRUC_THUOC,TONG_TIEN_THANH_TOAN,TONG_TIEN_THUE_GTGT,DA_LAP_HOA_DON")] BH_DON_BAN_HANG bH_DON_BAN_HANG)
        {
            if (ModelState.IsValid)
            {
                db.Entry(bH_DON_BAN_HANG).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_DON_BAN_HANG.MA_KHACH_HANG);
            ViewBag.NHAN_VIEN_QUAN_LY = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_DON_BAN_HANG.NHAN_VIEN_QUAN_LY);
            ViewBag.TRUC_THUOC = new SelectList(db.CCTC_CONG_TY, "MA_CONG_TY", "TEN_CONG_TY", bH_DON_BAN_HANG.TRUC_THUOC);
            return View(bH_DON_BAN_HANG);
        }

        // GET: BanHang/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_DON_BAN_HANG bH_DON_BAN_HANG = db.BH_DON_BAN_HANG.Find(id);
            if (bH_DON_BAN_HANG == null)
            {
                return HttpNotFound();
            }
            return View(bH_DON_BAN_HANG);
        }

        // POST: BanHang/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            BH_DON_BAN_HANG bH_DON_BAN_HANG = db.BH_DON_BAN_HANG.Find(id);
            db.BH_DON_BAN_HANG.Remove(bH_DON_BAN_HANG);
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
