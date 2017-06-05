using ERP.Web.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ERP.Web.Api.KhachHang
{
    public class Api_ChiTietKhachHangController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        [Route("api/Api_ChiTietKhachHang/LayChiTietKH/{makhachhang}")]
        public Prod_KH_CHiTietKhachHang_Result LayChiTietKH(string makhachhang)
        {

            var query = db.Database.SqlQuery<Prod_KH_CHiTietKhachHang_Result>("Prod_KH_CHiTietKhachHang @makhachhang", new SqlParameter("makhachhang", makhachhang));
            var result = query.FirstOrDefault();
            return result;

        }
    }
}
