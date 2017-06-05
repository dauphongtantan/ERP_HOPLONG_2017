using ERP.Web.Models.BusinessModel;
using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ERP.Web.Areas.Marketing.Controllers
{
    public class ChucNangController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xldate = new XuLyNgayThang();

        // GET: Marketing/ChucNang
        
        #region "Export_Lien_He_Khach_Hang"
          
        public ActionResult ExportLienHeKH()
        {
            return View(db.Prod_KH_ListLienHe_TheoNgay());
        }

        public ActionResult ExportToExcel()
        {
            var query = db.Prod_KH_ListLienHe_TheoNgay();
            var dt = query.ToList();
            foreach (var item in dt)
            {
                var data = db.KH_LIEN_HE.Where(x => x.ID_LIEN_HE == item.ID_LIEN_HE).FirstOrDefault();
                if (data != null)
                {
                    data.da_export = true;
                    db.SaveChanges();
                }
            }
            //---------------------------------------
            var gv = new GridView();
            gv.DataSource = dt;
            gv.DataBind();
            Response.ClearContent();
            Response.Buffer = true;
            Response.AddHeader("content-disposition", "attachment; filename=DanhSachLienHeKH.xls");
            Response.ContentType = "application/ms-excel";
            Response.Charset = "UTF-8";
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.BinaryWrite(System.Text.Encoding.UTF8.GetPreamble());
            StringWriter objStringWriter = new StringWriter();
            HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);
            gv.RenderControl(objHtmlTextWriter);
            Response.Output.Write(objStringWriter.ToString());
            Response.Flush();
            Response.End();

            //----------------------------------
           

            return View("DanhSachLienHe");
        }
        #endregion
    }
}