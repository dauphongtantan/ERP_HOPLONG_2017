using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Web.Controllers
{
    public class BaiVietMoiController : Controller
    {
        ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: BaiVietMoi
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Delete_BaiViet(int id)
        {
            var query = db.POST_CATEGORIES.Where(x => x.ID == id).ToList();
            foreach (var item in query)
            {
                db.POST_CATEGORIES.Remove(item);
            }
            var datapost = db.POSTS.Where(x => x.MA_BAI_VIET == id).FirstOrDefault();
            if(datapost != null)
            {
                db.POSTS.Remove(datapost);
            }
            db.SaveChanges();
            return RedirectToAction("Index");
        }


        public string UploadFiles()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    string filename = "";
                    HttpPostedFileBase file = Request.Files[0];
                    filename = file.FileName;
                    filename = filename.Substring(filename.LastIndexOf("\\") + 1);
                    file.SaveAs(Server.MapPath("~/Content/Content/" + filename));
                    return "/Content/Content/" + filename;
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                return "Không có file được chọn";
            }
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
                        var path = Path.Combine(Server.MapPath("~/Content/Images/BaiViet"), fileName);
                        file.SaveAs(path);
                    }
                }
            }
        }
    }
}