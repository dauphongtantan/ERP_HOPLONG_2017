using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ERP.Web.Models.Database;
using System.Data.SqlClient;

namespace ERP.Web.Controllers
{
    public class PhieuBaoGiaController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: PhieuBaoGia



     
        public ActionResult Index()
        {
            var bH_BAO_GIA = db.BH_BAO_GIA.Include(b => b.KH_LIEN_HE).Include(b => b.BH_DON_HANG_DU_KIEN).Include(b => b.KH).Include(b => b.CCTC_NHAN_VIEN);
            return View(bH_BAO_GIA.ToList());
        }


        public ActionResult chitiet(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var query = db.Database.SqlQuery<GetAll_ThongTinBaoGia_Result>("GetAll_ThongTinBaoGia  @so_bao_gia, @ma_cong_ty", new SqlParameter("so_bao_gia", id), new SqlParameter("ma_cong_ty", "HOPLONG"));
            var result = query.FirstOrDefault();
            BH_BAO_GIA bg = new BH_BAO_GIA();
            bg.SO_BAO_GIA = result.SO_BAO_GIA;
            bg.NGAY_BAO_GIA = result.NGAY_BAO_GIA;
            bg.MA_KHACH_HANG = result.MA_KHACH_HANG;
            return View(bg);
        }


        // GET: PhieuBaoGia/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            if (bH_BAO_GIA == null)
            {
                return HttpNotFound();
            }
            return View(bH_BAO_GIA);
        }

        // GET: PhieuBaoGia/Create
        public ActionResult Create()
        {
            ViewBag.LIEN_HE_KHACH_HANG = new SelectList(db.KH_LIEN_HE, "ID_LIEN_HE", "MA_KHACH_HANG");
            ViewBag.MA_DU_KIEN = new SelectList(db.BH_DON_HANG_DU_KIEN, "MA_DU_KIEN", "MA_KHACH_HANG");
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY");
            ViewBag.NGUOI_DUYET = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH");
            return View();
        }

        // POST: PhieuBaoGia/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SO_BAO_GIA,NGAY_BAO_GIA,MA_DU_KIEN,MA_KHACH_HANG,LIEN_HE_KHACH_HANG,PHUONG_THUC_THANH_TOAN,HAN_THANH_TOAN,HIEU_LUC_BAO_GIA,DIEU_KHOAN_THANH_TOAN,PHI_VAN_CHUYEN,TONG_TIEN,DA_DUYET,NGUOI_DUYET,DA_TRUNG,DA_HUY,LY_DO_HUY,SALES_BAO_GIA,TRUC_THUOC")] BH_BAO_GIA bH_BAO_GIA)
        {
            if (ModelState.IsValid)
            {
                db.BH_BAO_GIA.Add(bH_BAO_GIA);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.LIEN_HE_KHACH_HANG = new SelectList(db.KH_LIEN_HE, "ID_LIEN_HE", "MA_KHACH_HANG", bH_BAO_GIA.LIEN_HE_KHACH_HANG);
            ViewBag.MA_DU_KIEN = new SelectList(db.BH_DON_HANG_DU_KIEN, "MA_DU_KIEN", "MA_KHACH_HANG", bH_BAO_GIA.MA_DU_KIEN);
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_BAO_GIA.MA_KHACH_HANG);
            ViewBag.NGUOI_DUYET = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_BAO_GIA.NGUOI_DUYET);
            return View(bH_BAO_GIA);
        }

        // GET: PhieuBaoGia/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            if (bH_BAO_GIA == null)
            {
                return HttpNotFound();
            }
            ViewBag.LIEN_HE_KHACH_HANG = new SelectList(db.KH_LIEN_HE, "ID_LIEN_HE", "MA_KHACH_HANG", bH_BAO_GIA.LIEN_HE_KHACH_HANG);
            ViewBag.MA_DU_KIEN = new SelectList(db.BH_DON_HANG_DU_KIEN, "MA_DU_KIEN", "MA_KHACH_HANG", bH_BAO_GIA.MA_DU_KIEN);
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_BAO_GIA.MA_KHACH_HANG);
            ViewBag.NGUOI_DUYET = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_BAO_GIA.NGUOI_DUYET);
            return View(bH_BAO_GIA);
        }

        // POST: PhieuBaoGia/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SO_BAO_GIA,NGAY_BAO_GIA,MA_DU_KIEN,MA_KHACH_HANG,LIEN_HE_KHACH_HANG,PHUONG_THUC_THANH_TOAN,HAN_THANH_TOAN,HIEU_LUC_BAO_GIA,DIEU_KHOAN_THANH_TOAN,PHI_VAN_CHUYEN,TONG_TIEN,DA_DUYET,NGUOI_DUYET,DA_TRUNG,DA_HUY,LY_DO_HUY,SALES_BAO_GIA,TRUC_THUOC")] BH_BAO_GIA bH_BAO_GIA)
        {
            if (ModelState.IsValid)
            {
                db.Entry(bH_BAO_GIA).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LIEN_HE_KHACH_HANG = new SelectList(db.KH_LIEN_HE, "ID_LIEN_HE", "MA_KHACH_HANG", bH_BAO_GIA.LIEN_HE_KHACH_HANG);
            ViewBag.MA_DU_KIEN = new SelectList(db.BH_DON_HANG_DU_KIEN, "MA_DU_KIEN", "MA_KHACH_HANG", bH_BAO_GIA.MA_DU_KIEN);
            ViewBag.MA_KHACH_HANG = new SelectList(db.KHs, "MA_KHACH_HANG", "TEN_CONG_TY", bH_BAO_GIA.MA_KHACH_HANG);
            ViewBag.NGUOI_DUYET = new SelectList(db.CCTC_NHAN_VIEN, "USERNAME", "GIOI_TINH", bH_BAO_GIA.NGUOI_DUYET);
            return View(bH_BAO_GIA);
        }

        // GET: PhieuBaoGia/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            if (bH_BAO_GIA == null)
            {
                return HttpNotFound();
            }
            return View(bH_BAO_GIA);
        }

        // POST: PhieuBaoGia/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            BH_BAO_GIA bH_BAO_GIA = db.BH_BAO_GIA.Find(id);
            db.BH_BAO_GIA.Remove(bH_BAO_GIA);
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
