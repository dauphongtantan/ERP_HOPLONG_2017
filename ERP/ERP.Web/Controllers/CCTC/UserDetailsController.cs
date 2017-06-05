using ERP.Web.Models.Database;
using ERP.Web.Models.NewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Controllers
{
    public class UserDetailsController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        // GET: UserDetails
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Index(IEnumerable<HttpPostedFileBase> files)
        {
            if (files != null)
            {
                foreach (var file in files)
                {
                    // Verify that the user selected a file
                    if (file != null && file.ContentLength > 0)
                    {
                        // extract only the fielname
                        var fileName = Path.GetFileName(file.FileName);
                        // TODO: need to define destination
                        var path = Path.Combine(Server.MapPath("~/Content/Images/Avatar"), fileName);
                        file.SaveAs(path);
                    }
                }
            }
        }

        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var kq = (from t1 in db.CCTC_NHAN_VIEN
                      join t2 in db.HT_NGUOI_DUNG on t1.USERNAME equals t2.USERNAME
                      join t3 in db.CCTC_PHONG_BAN on t1.MA_PHONG_BAN equals t3.MA_PHONG_BAN
                      where t2.USERNAME == id
                      select (new nhanvien()
                      {
                          HO_VA_TEN = t2.HO_VA_TEN,
                          MA_PHONG_BAN = t1.MA_PHONG_BAN,
                          EMAIL = t2.EMAIL,
                          USERNAME = t2.USERNAME,
                          CHUC_VU = t1.CHUC_VU,
                          SDT = t2.SDT,
                          GIOI_TINH = t1.GIOI_TINH,
                          NGAY_SINH = t1.NGAY_SINH.ToString(),
                          QUE_QUAN = t1.QUE_QUAN,
                          TEN_PHONG_BAN = t3.TEN_PHONG_BAN,
                          THANH_TICH_CONG_TAC = t1.THANH_TICH_CONG_TAC,
                          TRINH_DO_HOC_VAN = t1.TRINH_DO_HOC_VAN,
                          AVATAR = t2.AVATAR
                      })
                             );
            nhanvien nv = kq.FirstOrDefault();
            if (nv == null)
            {
                return HttpNotFound();
            }
            return View(nv);
        }
    }
}