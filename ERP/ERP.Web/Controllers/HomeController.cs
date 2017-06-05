using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ERP.Web.Models;
using ERP.Web.Models.Database;
using System.Net;
using System.IO;
using ERP.Web.Models.BusinessModel;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ERP.Web.Controllers
{

    
    public class HomeController : Controller

    {
        ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        RandomTextAndString rd = new RandomTextAndString();

        #region "INDEX"
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        #endregion


        #region "DETAIL POST"

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            POST pOST = db.POSTS.Find(id);
            if (pOST == null)
            {
                return HttpNotFound();
            }
            return View(pOST);
        }
        #endregion


        #region "REGISTER"
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(String fullname, string email, string phone, string password, string confirmpassword)
        {

            HT_NGUOI_DUNG user = new HT_NGUOI_DUNG();
                user.USERNAME = phone;
                user.HO_VA_TEN = fullname;
                user.EMAIL = email;
                user.PASSWORD = password;
                user.SDT = phone;
                user.IS_ADMIN = false;
                user.ALLOWED = false;
                user.MA_CONG_TY = "KHACH_VANG_LAI";
                user.MA_XAC_NHAN = rd.RandomString(10);

            db.HT_NGUOI_DUNG.Add(user);
            db.SaveChanges();
            ViewBag.info = "Cảm ơn bạn đã đăng ký tài khoản check giá tại Hoplongtech.com <br> Bạn vui lòng kiểm tra email để kích hoạt tài khoản";

            MailMessage mm = new MailMessage();
            mm.To.Add(new MailAddress(user.EMAIL, "Xác nhận tài khoản check giá tại Hoplongtech.com"));
            mm.From = new MailAddress("lamhien2901@gmail.com");
            mm.Body = "Dear "+user.HO_VA_TEN+ ",<br /> <br /><br />Cảm ơn bạn đã đăng ký tài khoản check giá tại Hoplongtech.com <br /> Để hoàn tất việc đăng ký, bạn vui lòng nhấn vào liên kết bên dưới hoặc copy và dán vào trình duyệt để truy cập trang kích hoạt tài khoản: <br /> <a href='http://localhost:55247/Home/ConfirmCode/'> http://localhost:55247/Activate </a> <br /> <br />User kích hoạt của bạn là: " + user.USERNAME +"<br /> Mã kích hoạt của bạn là: "+ user.MA_XAC_NHAN+ "<br /><br />Lưu ý: Liên kết này chỉ sử dụng được 1 lần. <br /><br />Best Regard!";
            mm.IsBodyHtml = true;
            mm.Subject = "KÍCH HOẠT TÀI KHOẢN TẠI HOPLONGTECH.COM";
            SmtpClient smcl = new SmtpClient();
            smcl.Host = "smtp.gmail.com";
            smcl.Port = 587;
            smcl.Credentials = new NetworkCredential("lamhien2901@gmail.com", "135495706");
            smcl.EnableSsl = true;
            smcl.Send(mm);


            return View();
        }

        #endregion


        #region "CONFIRM CODE"

        public ActionResult ConfirmCode()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ConfirmCode(string username1, String codeconfirm)
        {
            var query = db.HT_NGUOI_DUNG.Where(x => x.USERNAME == username1 && x.MA_XAC_NHAN == codeconfirm).FirstOrDefault();
            if (query != null)
            {
                query.ALLOWED = true;
                db.SaveChanges();
                return RedirectToAction("Login");
            }
            else
                ViewBag.error = "Mã code hoặc số điện thoại không đúng";



            return View();
        }
        #endregion


        #region "LOGIN"

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(String username, String password)
        {
            var user = db.HT_NGUOI_DUNG.SingleOrDefault(x => x.USERNAME == username && x.PASSWORD == password && x.ALLOWED == true);
            if (user != null)
            {


                
                Session["USERNAME"] = user.USERNAME;
                Session["PASSWORD"] = user.PASSWORD;
                Session["MA_PHONG_BAN"] = user.CCTC_NHAN_VIEN.MA_PHONG_BAN;
                Session["HO_VA_TEN"] = user.HO_VA_TEN;
                Session["ALLOWED"] = user.ALLOWED;
                Session["IS_AMIN"] = user.IS_ADMIN.ToString();
                Session["AVATAR"] = user.AVATAR;
                Session["MA_CONG_TY"] = user.MA_CONG_TY;
                Session["LOAI_USER"] = user.CCTC_CONG_TY.CAP_TO_CHUC;
                Session["EMAIL"] = user.EMAIL;
                Session["SDT"] = user.SDT;
                //HT_LICH_SU_DANG_NHAP lsdn = new HT_LICH_SU_DANG_NHAP();
                //lsdn.USERNAME = user.USERNAME;
                //lsdn.THOI_GIAN_DANG_NHAP = DateTime.Now.ToString("dd/MM/yyyy:hh:mm:ss");
                //lsdn.THOI_GIAN_DANG_XUAT = "";
                //db.HT_LICH_SU_DANG_NHAP.Add(lsdn);
                //db.SaveChanges();
                return RedirectToAction("Index","ThongBao");

               


            }
            ViewBag.error = "Wrong username or password";
            return View();
        }

        #endregion


        #region "LOGOUT"

        public ActionResult Logout()
        {
            //string a = Session["USERNAME"].ToString();


            //var lichsudangnhap = db.HT_LICH_SU_DANG_NHAP.Where(x => x.USERNAME == a && x.THOI_GIAN_DANG_XUAT == "").ToList();
            //HT_LICH_SU_DANG_NHAP KETQUA = lichsudangnhap.LastOrDefault();
            //KETQUA.THOI_GIAN_DANG_XUAT = DateTime.Now.ToString("dd/MM/yyyy:hh:mm:ss");
            //db.SaveChanges();

            Session["USERNAME"] = null;
            Session["HO_VA_TEN"] = null;
            Session["ALLOWED"] = null;
            Session["IS_AMIN"] = null;
            Session["AVATAR"] = null;
            Session["LOAI_USER"] = null;
            Session["MA_CONG_TY"] = null;
            Session["MA_PHONG_BAN"] = null;
            return RedirectToAction("Login");
        }
        #endregion


        #region "NotificationAuthorize"

        public ActionResult NotificationAuthorize()
        {
            return View();
        }

        #endregion


        #region "FileUpload"
        [HttpPost]
        [ValidateAntiForgeryToken]
        public void FileUpload(IEnumerable<HttpPostedFileBase> files)
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
                        var path = Path.Combine(Server.MapPath("~/Content/BaiViet"), fileName);
                        file.SaveAs(path);
                    }
                }
            }
        }

        public ActionResult FileUpload()
        {
            return View();
        }

        #endregion


        //public async Task<JsonResult> GetData()
        //{
        //    var succ = false;
        //    var taskRes = await Task.Run(async () =>
        //    {
        //        await Task.Delay(10000);
        //        succ = true;
        //        return Json(succ, JsonRequestBehavior.AllowGet);
        //    });

        //    return taskRes;
        //}

    }
}
