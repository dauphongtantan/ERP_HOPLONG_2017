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
using System.Globalization;
using ERP.Web.Models.NewModels;

namespace ERP.Web.Api.BanHang
{
    public class Api_HeSoGiaBanController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // Lấy ra số tuần trong năm khi nhập vào ngày hiện tại  
        public static int GetWeekOrderInYear(string time)
        {
            int ngay = Convert.ToInt32(time.Substring(0, 2));
            int thang = Convert.ToInt32(time.Substring(3, 2));

            int nam = Convert.ToInt32(time.Substring(6, 4));
            DateTime dt = new DateTime(nam, thang, ngay);

            CultureInfo myCI = CultureInfo.CurrentCulture;
            Calendar myCal = myCI.Calendar;
            CalendarWeekRule myCWR = myCI.DateTimeFormat.CalendarWeekRule;
            DayOfWeek myFirstDOW = myCI.DateTimeFormat.FirstDayOfWeek;

            return myCal.GetWeekOfYear(dt, myCWR, myFirstDOW);
        }

        // GET: api/Api_HeSoGiaBan
        public IQueryable<HH_HE_SO_GIA_BAN> GetHH_HE_SO_GIA_BAN()
        {
            return db.HH_HE_SO_GIA_BAN;
        }

        [Route("api/Api_HeSoGiaBan/NhomVTHH/{isadmin}/{username}")]
        public List<Get_NhomVTHH_TheoMark_Result> NhomVTHH(bool isadmin, string username)
        {
            var query = db.Database.SqlQuery<Get_NhomVTHH_TheoMark_Result>("Get_NhomVTHH_TheoMark @mark,@isadmin", new SqlParameter("mark", username), new SqlParameter("isadmin", isadmin));
            var result = query.ToList();
            return result;
        }

        [Route("api/Api_HeSoGiaBan/ListHeSoGiaBan")]
        public List<List_HeSoGiaBan_Result> ListHeSoGiaBan()
        {
            var query = db.Database.SqlQuery<List_HeSoGiaBan_Result>("List_HeSoGiaBan");
            var result = query.ToList();
            return result;
        }

        // PUT: api/Api_HeSoGiaBan/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHH_HE_SO_GIA_BAN(int id, HH_HE_SO_GIA_BAN hH_HE_SO_GIA_BAN)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hH_HE_SO_GIA_BAN.ID)
            {
                return BadRequest();
            }

            db.Entry(hH_HE_SO_GIA_BAN).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HH_HE_SO_GIA_BANExists(id))
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

        // POST: api/Api_HeSoGiaBan
        [Route("api/Api_HeSoGiaBan/ThemHeSo")]
        public IHttpActionResult ThemHeSo(HeSoGiaBanClass hH_HE_SO_GIA_BAN)
        {
            HH_HE_SO_GIA_BAN newheso = new HH_HE_SO_GIA_BAN();
            newheso.TUAN = GetWeekOrderInYear(hH_HE_SO_GIA_BAN.TUAN);
            newheso.NAM = DateTime.Today.Year;
            newheso.MA_NHOM_HANG = hH_HE_SO_GIA_BAN.MA_NHOM_HANG;
            newheso.NGAY_DIEU_CHINH = DateTime.Today.Date;
            newheso.DONG_SERI = hH_HE_SO_GIA_BAN.DONG_SERI;
            newheso.LOAI_KHACH_LE = hH_HE_SO_GIA_BAN.LOAI_KHACH_LE;
            newheso.LOAI_KHACH_MUA_NHIEU = hH_HE_SO_GIA_BAN.LOAI_KHACH_MUA_NHIEU;
            newheso.KHACH_DAI_LY = hH_HE_SO_GIA_BAN.KHACH_DAI_LY;
            newheso.KHACH_KHONG_LAY_VAT = hH_HE_SO_GIA_BAN.KHACH_KHONG_LAY_VAT;
            newheso.SL_MUA_HON_30 = hH_HE_SO_GIA_BAN.SL_MUA_HON_30;
            newheso.SL_MUA_HON_100 = hH_HE_SO_GIA_BAN.SL_MUA_HON_100;
            newheso.SL_MUA_HON_200 = hH_HE_SO_GIA_BAN.SL_MUA_HON_200;
            newheso.GHI_CHU = hH_HE_SO_GIA_BAN.GHI_CHU;
            db.HH_HE_SO_GIA_BAN.Add(newheso);
            db.SaveChanges();
            return Ok(newheso);
        }

        // DELETE: api/Api_HeSoGiaBan/5
        [ResponseType(typeof(HH_HE_SO_GIA_BAN))]
        public IHttpActionResult DeleteHH_HE_SO_GIA_BAN(int id)
        {
            HH_HE_SO_GIA_BAN hH_HE_SO_GIA_BAN = db.HH_HE_SO_GIA_BAN.Find(id);
            if (hH_HE_SO_GIA_BAN == null)
            {
                return NotFound();
            }

            db.HH_HE_SO_GIA_BAN.Remove(hH_HE_SO_GIA_BAN);
            db.SaveChanges();

            return Ok(hH_HE_SO_GIA_BAN);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HH_HE_SO_GIA_BANExists(int id)
        {
            return db.HH_HE_SO_GIA_BAN.Count(e => e.ID == id) > 0;
        }
    }
}