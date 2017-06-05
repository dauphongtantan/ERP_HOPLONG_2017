using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ERP.Web.Models.Database;
using System.IO;
using OfficeOpenXml;
using ERP.Web.Models.BusinessModel;
using System.Text.RegularExpressions;

namespace ERP.Web.Controllers
{
    public class KhachHangController : Controller
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();
        XuLyNgayThang xulydate = new XuLyNgayThang();
        int so_dong_thanh_cong;
        int dong, slmua;
        decimal dongiamua;
        
        string makhach, tencongty, phanloaikhach, nhomnganh, diachivpgiaodich, diachixuathoadon, MST, somayban, fax, email, logo, website, tinh, quocgia, dieukhoanthanhtoan, songayduocno, sonotoida, tinhtranghoatdong, tructhuoc, ghichu, phutrachhienthoi, nguoilienhe, chucvu, phongban, ngaysinh, gioitinh, sdt1, sdt2, emailcanhan, emailcongty, skype, facebook, ghichulienhe, salephutrach, sotknganhang, tentaikhoan, tennganhang, chinhanhnganhang, tinhnganhang, loaitaikhoan, ghichutaikhoan, khophutrach;
        string mahang, nvbanhang, ngaymua, salequanly;
        // GET: KhachHang
        public ActionResult Index()
        {
            var kHs = db.KHs.Include(k => k.CCTC_CONG_TY);
            return View(kHs.ToList());
        }

        #region "Import KHÁCH HÀNG"

        public ActionResult Import_KhachHang()
        {
           
            return View();
        }

        public string GenerateMAKH()
        {
            Regex digitsOnly = new Regex(@"[^\d]");
            string year = DateTime.Now.Year.ToString().Substring(2, 2);

            string prefixNumber = "KH" + year.ToString();
            string SoChungTu = (from nhapkho in db.KHs where nhapkho.MA_KHACH_HANG.Contains(prefixNumber) select nhapkho.MA_KHACH_HANG).Max();


            if (SoChungTu == null)
            {
                return "KH" + year + "0001";
            }
            SoChungTu = SoChungTu.Substring(4, SoChungTu.Length - 4);
            string number = (Convert.ToInt32(digitsOnly.Replace(SoChungTu, "")) + 1).ToString();
            string result = number.ToString();
            int count = 4 - number.ToString().Length;
            for (int i = 0; i < count; i++)
            {
                result = "0" + result;
            }
            return "KH" + year + result;
        }



        [HttpPost]
        public ActionResult Import_KhachHang(HttpPostedFileBase file)
        {
            try
            {
                if (Request != null)
                {
                    HttpPostedFileBase filetonkho = Request.Files["UploadedFile"];
                    if ((filetonkho != null) && (filetonkho.ContentLength > 0) && !string.IsNullOrEmpty(filetonkho.FileName))
                    {
                        string fileName = filetonkho.FileName;
                        string fileContentType = filetonkho.ContentType;
                        byte[] fileBytes = new byte[filetonkho.ContentLength];
                        var data = filetonkho.InputStream.Read(fileBytes, 0, Convert.ToInt32(filetonkho.ContentLength));
                        //var usersList = new List<Users>();
                        using (var package = new ExcelPackage(filetonkho.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                if(workSheet.Cells[rowIterator, 1].Value != null)
                                 makhach = workSheet.Cells[rowIterator, 1].Value.ToString();
                                if (workSheet.Cells[rowIterator, 2].Value != null)
                                    tencongty = workSheet.Cells[rowIterator, 2].Value.ToString();
                                if (workSheet.Cells[rowIterator, 3].Value != null)
                                    phanloaikhach = workSheet.Cells[rowIterator, 3].Value.ToString();
                                else
                                    phanloaikhach = "";
                                if (workSheet.Cells[rowIterator, 4].Value != null)
                                    nhomnganh = workSheet.Cells[rowIterator, 4].Value.ToString();
                                else
                                    nhomnganh = "";
                                if (workSheet.Cells[rowIterator, 5].Value != null)
                                    diachivpgiaodich = workSheet.Cells[rowIterator, 5].Value.ToString();
                                else
                                    diachivpgiaodich = "";
                                if (workSheet.Cells[rowIterator, 6].Value != null)
                                    diachixuathoadon = workSheet.Cells[rowIterator, 6].Value.ToString();
                                else
                                    diachixuathoadon = "";
                                if (workSheet.Cells[rowIterator, 7].Value != null)
                                    MST = workSheet.Cells[rowIterator, 7].Value.ToString();
                                else
                                    MST = "";



                                if (workSheet.Cells[rowIterator, 8].Value != null)
                                    somayban = workSheet.Cells[rowIterator, 8].Value.ToString();
                                else
                                    somayban = "";
                                if (workSheet.Cells[rowIterator, 9].Value != null)
                                    fax = workSheet.Cells[rowIterator, 9].Value.ToString();
                                else
                                    fax = "";
                                if (workSheet.Cells[rowIterator, 10].Value != null)
                                    email = workSheet.Cells[rowIterator, 10].Value.ToString();
                                else
                                    email = "";
                                if (workSheet.Cells[rowIterator, 11].Value != null)
                                    logo = workSheet.Cells[rowIterator, 11].Value.ToString();
                                else
                                    logo = "";
                                if (workSheet.Cells[rowIterator, 12].Value != null)
                                    website = workSheet.Cells[rowIterator, 12].Value.ToString();
                                else
                                    website = "";
                                if (workSheet.Cells[rowIterator, 13].Value != null)
                                    tinh = workSheet.Cells[rowIterator, 13].Value.ToString();
                                else
                                    tinh = "";
                                if (workSheet.Cells[rowIterator, 14].Value != null)
                                    quocgia = workSheet.Cells[rowIterator, 14].Value.ToString();
                                else
                                    quocgia = "";
                                if (workSheet.Cells[rowIterator, 15].Value != null)
                                    dieukhoanthanhtoan = workSheet.Cells[rowIterator, 15].Value.ToString();
                                else
                                    dieukhoanthanhtoan = "";
                                if (workSheet.Cells[rowIterator, 16].Value != null)
                                    songayduocno = workSheet.Cells[rowIterator, 16].Value.ToString();
                                else
                                    songayduocno = "";
                                if (workSheet.Cells[rowIterator, 17].Value != null)
                                    sonotoida = workSheet.Cells[rowIterator, 17].Value.ToString();
                                else
                                    sonotoida = "";
                                if (workSheet.Cells[rowIterator, 18].Value != null)
                                    tinhtranghoatdong = workSheet.Cells[rowIterator, 18].Value.ToString();
                                else
                                    tinhtranghoatdong = "";
                                if (workSheet.Cells[rowIterator, 19].Value != null)
                                    tructhuoc = workSheet.Cells[rowIterator, 19].Value.ToString();
                                else
                                    tructhuoc = "";
                                if (workSheet.Cells[rowIterator, 20].Value != null)
                                    ghichu = workSheet.Cells[rowIterator, 20].Value.ToString();
                                else
                                    ghichu = "";
                                if (workSheet.Cells[rowIterator, 21].Value != null)
                                    phutrachhienthoi = workSheet.Cells[rowIterator, 21].Value.ToString();
                                else
                                    phutrachhienthoi = "";
                                if (workSheet.Cells[rowIterator, 22].Value != null)
                                    khophutrach = workSheet.Cells[rowIterator, 22].Value.ToString();
                                else
                                    khophutrach = null;


                                if (workSheet.Cells[rowIterator, 23].Value != null)
                                    nguoilienhe = workSheet.Cells[rowIterator, 23].Value.ToString();
                                else
                                    nguoilienhe = "";
                                if (workSheet.Cells[rowIterator, 24].Value != null)
                                    chucvu = workSheet.Cells[rowIterator, 24].Value.ToString();
                                else
                                    chucvu = "";
                                if (workSheet.Cells[rowIterator, 25].Value != null)
                                    phongban = workSheet.Cells[rowIterator, 25].Value.ToString();
                                else
                                    phongban = "";
                                if (workSheet.Cells[rowIterator, 26].Value != null)
                                    ngaysinh = workSheet.Cells[rowIterator, 26].Value.ToString();
                                else
                                    ngaysinh = "";
                                if (workSheet.Cells[rowIterator, 27].Value != null)
                                    gioitinh = workSheet.Cells[rowIterator, 27].Value.ToString();
                                else
                                    gioitinh = "";
                                if (workSheet.Cells[rowIterator, 28].Value != null)
                                    sdt1 = workSheet.Cells[rowIterator, 28].Value.ToString();
                                else
                                    sdt1 = "";
                                if (workSheet.Cells[rowIterator, 29].Value != null)
                                    sdt2 = workSheet.Cells[rowIterator, 29].Value.ToString();
                                else
                                    sdt2 = "";
                                if (workSheet.Cells[rowIterator, 30].Value != null)
                                    emailcanhan = workSheet.Cells[rowIterator, 30].Value.ToString();
                                else
                                    emailcanhan = "";
                                if (workSheet.Cells[rowIterator, 31].Value != null)
                                    emailcongty = workSheet.Cells[rowIterator, 31].Value.ToString();
                                else
                                    emailcongty = "";
                                if (workSheet.Cells[rowIterator, 32].Value != null)
                                    skype = workSheet.Cells[rowIterator, 32].Value.ToString();
                                else
                                    skype = "";
                                if (workSheet.Cells[rowIterator, 33].Value != null)
                                    facebook = workSheet.Cells[rowIterator, 33].Value.ToString();
                                else
                                    facebook = "";
                                if (workSheet.Cells[rowIterator, 34].Value != null)
                                    ghichulienhe = workSheet.Cells[rowIterator, 34].Value.ToString();
                                else
                                    ghichulienhe = "";


                                if (workSheet.Cells[rowIterator, 35].Value != null)
                                    salephutrach = workSheet.Cells[rowIterator, 35].Value.ToString();
                                else
                                    salephutrach = "";

                                if (workSheet.Cells[rowIterator, 36].Value != null)
                                    sotknganhang = workSheet.Cells[rowIterator, 36].Value.ToString();
                                else
                                    sotknganhang = "";
                                if (workSheet.Cells[rowIterator, 37].Value != null)
                                    tentaikhoan = workSheet.Cells[rowIterator, 37].Value.ToString();
                                else
                                    tentaikhoan = "";
                                if (workSheet.Cells[rowIterator, 38].Value != null)
                                    tennganhang = workSheet.Cells[rowIterator, 38].Value.ToString();
                                else
                                    tennganhang = "";
                                if (workSheet.Cells[rowIterator, 39].Value != null)
                                    chinhanhnganhang = workSheet.Cells[rowIterator, 39].Value.ToString();
                                else
                                    chinhanhnganhang = "";
                                if (workSheet.Cells[rowIterator, 40].Value != null)
                                    tinhnganhang = workSheet.Cells[rowIterator, 40].Value.ToString();
                                else
                                    tinhnganhang = "";
                                if (workSheet.Cells[rowIterator, 41].Value != null)
                                    loaitaikhoan = workSheet.Cells[rowIterator, 41].Value.ToString();
                                else
                                    loaitaikhoan = "";
                                if (workSheet.Cells[rowIterator, 42].Value != null)
                                    ghichu = workSheet.Cells[rowIterator, 42].Value.ToString();
                                else
                                    ghichu = "";
                                if (workSheet.Cells[rowIterator, 43].Value != null)
                                    salequanly = workSheet.Cells[rowIterator, 43].Value.ToString();
                                else
                                    salequanly = "";











                                //Thêm khách hàng
                                //string makh = workSheet.Cells[rowIterator, 1].Value.ToString();
                                var query = db.KHs.Where(x => x.MST == MST).FirstOrDefault();
                                if (query == null)
                                {
                                    #region "Xuly"
                                    KH khachhang = new KH();
                                     khachhang.MA_KHACH_HANG = GenerateMAKH();
                                    //khachhang.MA_KHACH_HANG = workSheet.Cells[rowIterator, 1].Value.ToString();
                                    khachhang.TEN_CONG_TY = tencongty;
                                    if (diachivpgiaodich != "")
                                        khachhang.VAN_PHONG_GIAO_DICH = diachivpgiaodich;
                                    if (diachixuathoadon != "")
                                        khachhang.DIA_CHI_XUAT_HOA_DON = diachixuathoadon;
                                    if (MST != "")
                                        khachhang.MST = MST;
                                    if (somayban != "")
                                        khachhang.HOTLINE = somayban;
                                    if (fax != "")
                                        khachhang.FAX = fax;
                                    if (email != "")
                                        khachhang.EMAIL = email;
                                    if (logo != "")
                                        khachhang.LOGO = logo;
                                    if (website != "")
                                        khachhang.WEBSITE = website;
                                    if (tinh != "")
                                        khachhang.TINH = tinh;
                                    if (quocgia != "")
                                        khachhang.QUOC_GIA = quocgia;
                                    if (dieukhoanthanhtoan != "")
                                        khachhang.DIEU_KHOAN_THANH_TOAN = dieukhoanthanhtoan;
                                    if (songayduocno != "")
                                        khachhang.SO_NGAY_DUOC_NO = Convert.ToInt32(songayduocno);
                                    if (sonotoida != "")
                                        khachhang.SO_NO_TOI_DA = Convert.ToInt32(sonotoida);
                                    if (tinhtranghoatdong != "")
                                        khachhang.TINH_TRANG_HOAT_DONG = tinhtranghoatdong;
                                    if (tructhuoc != "")
                                        khachhang.TRUC_THUOC = tructhuoc;
                                    if (ghichu != "")
                                        khachhang.GHI_CHU = ghichu;
                                    //khachhang.KHACH_DO_MARKETING_TIM_KIEM = Convert.ToBoolean(workSheet.Cells[rowIterator, 43].Value);

                                    db.KHs.Add(khachhang);
                                    db.SaveChanges();

                                    //thêm phụ trách hiện thời
                                    if(phutrachhienthoi != "")
                                    {
                                        KH_CHUYEN_SALES chuyensale = new KH_CHUYEN_SALES();
                                        chuyensale.MA_KHACH_HANG = khachhang.MA_KHACH_HANG;
                                        chuyensale.SALE_HIEN_THOI = phutrachhienthoi;
                                        chuyensale.KHO_PHU_TRACH = khophutrach;
                                        chuyensale.SALE_ME = salephutrach;
                                        db.KH_CHUYEN_SALES.Add(chuyensale);

                                    }
                                    //Thêm phân loại khách
                                    var DATA = db.KH_PHAN_LOAI_KHACH.Where(x => x.MA_KHACH_HANG == khachhang.MA_KHACH_HANG).FirstOrDefault();
                                    if(DATA ==null && phanloaikhach != "")
                                    {
                                       
                                        KH_PHAN_LOAI_KHACH plkhach = new KH_PHAN_LOAI_KHACH();
                                        plkhach.MA_KHACH_HANG = khachhang.MA_KHACH_HANG;
                                        plkhach.MA_LOAI_KHACH = phanloaikhach;
                                        if(nhomnganh != "")
                                            plkhach.NHOM_NGANH = nhomnganh;
                                        db.KH_PHAN_LOAI_KHACH.Add(plkhach);
                                        db.SaveChanges();
                                    }
                                   //thêm người liên hệ
                                    if (nguoilienhe != "")
                                    {
                                        KH_LIEN_HE lhkhach = new KH_LIEN_HE();
                                        lhkhach.MA_KHACH_HANG = khachhang.MA_KHACH_HANG;
                                        lhkhach.NGUOI_LIEN_HE = nguoilienhe;
                                        if (chucvu!="")
                                            lhkhach.CHUC_VU = chucvu;
                                        if (phongban != "")
                                            lhkhach.PHONG_BAN = phongban;
                                        if (ngaysinh != "")
                                            lhkhach.NGAY_SINH = xulydate.Xulydatetime(ngaysinh);
                                        if (gioitinh != "")
                                            lhkhach.GIOI_TINH = gioitinh;
                                        lhkhach.SDT1 = sdt1;
                                        if (sdt2 != "")
                                            lhkhach.SDT2 = sdt2;
                                        if (emailcanhan != "")
                                            lhkhach.EMAIL_CA_NHAN = emailcanhan;
                                        if (emailcongty != "")
                                            lhkhach.EMAIL_CONG_TY = emailcongty;
                                        if (skype != "")
                                            lhkhach.SKYPE = skype;
                                        if (facebook != "")
                                            lhkhach.FACEBOOK = facebook;
                                        if (ghichulienhe != "")
                                            lhkhach.GHI_CHU = ghichu;
                                        db.KH_LIEN_HE.Add(lhkhach);
                                        db.SaveChanges();
                                        
                                        //thêm sale phụ trách
                                        var datalienhe = db.KH_LIEN_HE.Where(x => x.SDT1 == sdt1).FirstOrDefault();
                                        if (datalienhe != null)
                                        {
                                            KH_SALES_PHU_TRACH salept = new KH_SALES_PHU_TRACH();
                                            salept.ID_LIEN_HE = datalienhe.ID_LIEN_HE;
                                            salept.SALES_PHU_TRACH = salephutrach;
                                            salept.NGAY_BAT_DAU_PHU_TRACH = DateTime.Today.Date;
                                            salept.TRANG_THAI = true;
                                            db.KH_SALES_PHU_TRACH.Add(salept);
                                            db.SaveChanges();
                                        }


                                        //thêm tài khoản ngân hàng
                                        if (sotknganhang!= "")
                                        {
                                            KH_TK_NGAN_HANG tkkhach = new KH_TK_NGAN_HANG();
                                            tkkhach.MA_KHACH_HANG = khachhang.MA_KHACH_HANG;
                                            tkkhach.SO_TAI_KHOAN = sotknganhang;
                                            if (tentaikhoan != "")
                                                tkkhach.TEN_TAI_KHOAN = tentaikhoan;
                                            if (tennganhang != "")
                                                tkkhach.TEN_NGAN_HANG = tennganhang;
                                            if (chinhanhnganhang != "")
                                                tkkhach.CHI_NHANH = chinhanhnganhang;
                                            if (tinhnganhang != "")
                                                tkkhach.TINH_TP = tinhnganhang;

                                            if (loaitaikhoan != "")
                                                tkkhach.LOAI_TAI_KHOAN = loaitaikhoan;
                                            if (ghichutaikhoan != "")
                                                tkkhach.GHI_CHU = ghichutaikhoan;

                                            db.KH_TK_NGAN_HANG.Add(tkkhach);
                                            db.SaveChanges();


                                        }

                                    }
                                    #endregion
                                }
                                //trường hợp đã có khách hàng, chỉ thêm liên hệ, ...
                                else
                                if (query != null)
                                {

                                    //thêm liên hệ
                                    if (nguoilienhe != "")
                                    {
                                        KH_LIEN_HE lhkhach = new KH_LIEN_HE();
                                        lhkhach.MA_KHACH_HANG = query.MA_KHACH_HANG;
                                        lhkhach.NGUOI_LIEN_HE = nguoilienhe;
                                        if (chucvu != "")
                                            lhkhach.CHUC_VU = chucvu;
                                        if (phongban != "")
                                            lhkhach.PHONG_BAN = phongban;
                                        if (ngaysinh != "")
                                            lhkhach.NGAY_SINH = xulydate.Xulydatetime(ngaysinh);
                                        if (gioitinh != "")
                                            lhkhach.GIOI_TINH = gioitinh;
                                        lhkhach.SDT1 = sdt1;
                                        if (sdt2 != "")
                                            lhkhach.SDT2 = sdt2;
                                        if (emailcanhan != "")
                                            lhkhach.EMAIL_CA_NHAN = emailcanhan;
                                        if (emailcongty != "")
                                            lhkhach.EMAIL_CONG_TY = emailcongty;
                                        if (skype != "")
                                            lhkhach.SKYPE = skype;
                                        if (facebook != "")
                                            lhkhach.FACEBOOK = facebook;
                                        if (ghichu != "")
                                            lhkhach.GHI_CHU = ghichu;
                                        db.KH_LIEN_HE.Add(lhkhach);
                                        db.SaveChanges();

                                        //thêm sale phụ trách
                                        var datalienhe = db.KH_LIEN_HE.Where(x => x.SDT1 == sdt1).FirstOrDefault();
                                        if (datalienhe != null)
                                        {
                                            KH_SALES_PHU_TRACH salept = new KH_SALES_PHU_TRACH();
                                            salept.ID_LIEN_HE = datalienhe.ID_LIEN_HE;
                                            salept.SALES_PHU_TRACH = salephutrach;
                                            salept.NGAY_BAT_DAU_PHU_TRACH = DateTime.Today.Date;
                                            salept.TRANG_THAI = true;
                                            db.KH_SALES_PHU_TRACH.Add(salept);
                                            db.SaveChanges();
                                        }

                                        //thêm tài khoản ngân hàng
                                        if (sotknganhang != "")
                                        {
                                            KH_TK_NGAN_HANG tkkhach = new KH_TK_NGAN_HANG();
                                            tkkhach.MA_KHACH_HANG = query.MA_KHACH_HANG;
                                            tkkhach.SO_TAI_KHOAN = sotknganhang;
                                            if (tentaikhoan != "")
                                                tkkhach.TEN_TAI_KHOAN = tentaikhoan;
                                            if (tennganhang != "")
                                                tkkhach.TEN_NGAN_HANG = tennganhang;
                                            if (chinhanhnganhang != "")
                                                tkkhach.CHI_NHANH = chinhanhnganhang;
                                            if (tinhnganhang != "")
                                                tkkhach.TINH_TP = tinhnganhang;

                                            if (loaitaikhoan != "")
                                                tkkhach.LOAI_TAI_KHOAN = loaitaikhoan;
                                            if (ghichutaikhoan != "")
                                                tkkhach.GHI_CHU = ghichutaikhoan;

                                            db.KH_TK_NGAN_HANG.Add(tkkhach);
                                            db.SaveChanges();


                                        }

                                    }

                                }


                                so_dong_thanh_cong++;
                                dong = rowIterator;

                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                ViewBag.Error = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                ViewBag.Information = "Lỗi tại các dòng: " + dong;

            }
            finally
            {
                ViewBag.Message = "Đã import thành công " + so_dong_thanh_cong + "/ "+dong+ " dòng";
            }

            return View();
        }

        #endregion


        #region "UPDATE KHÁCH HÀNG ĐỊA CHỈ, LOGO"

        public ActionResult Update_KhachHang()
        {

            return View();
        }

        

        [HttpPost]
        public ActionResult Update_KhachHang(HttpPostedFileBase file)
        {
            try
            {
                if (Request != null)
                {
                    HttpPostedFileBase filetonkho = Request.Files["UploadedFile"];
                    if ((filetonkho != null) && (filetonkho.ContentLength > 0) && !string.IsNullOrEmpty(filetonkho.FileName))
                    {
                        string fileName = filetonkho.FileName;
                        string fileContentType = filetonkho.ContentType;
                        byte[] fileBytes = new byte[filetonkho.ContentLength];
                        var data = filetonkho.InputStream.Read(fileBytes, 0, Convert.ToInt32(filetonkho.ContentLength));
                        //var usersList = new List<Users>();
                        using (var package = new ExcelPackage(filetonkho.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                makhach = workSheet.Cells[rowIterator, 2].Value.ToString();
                                if (workSheet.Cells[rowIterator, 3].Value != null)
                                    diachixuathoadon = workSheet.Cells[rowIterator, 3].Value.ToString();
                                else
                                    diachixuathoadon = "";
                                if (workSheet.Cells[rowIterator, 4].Value != null)
                                    diachivpgiaodich = workSheet.Cells[rowIterator, 4].Value.ToString();
                                else
                                    diachivpgiaodich = "";
                                if (workSheet.Cells[rowIterator, 5].Value != null)
                                    logo = workSheet.Cells[rowIterator, 5].Value.ToString();
                                else
                                    logo = "";
                               
                                

                                //Thêm khách hàng

                                var query = db.KHs.Where(x => x.MA_KHACH_HANG == makhach).FirstOrDefault();
                                
                                if (query != null)
                                {
                                    query.DIA_CHI_XUAT_HOA_DON = diachixuathoadon;
                                    query.VAN_PHONG_GIAO_DICH = diachivpgiaodich;
                                    query.LOGO = logo;
                                    db.SaveChanges();

                                }


                                so_dong_thanh_cong++;
                                dong = rowIterator;

                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                ViewBag.Error = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                ViewBag.Information = "Lỗi tại các dòng: " + dong;

            }
            finally
            {
                ViewBag.Message = "Đã import thành công " + so_dong_thanh_cong + " dòng";
            }

            return View();
        }

        #endregion


        #region "Import giao dịch khách hàng"

        [HttpPost]
        public ActionResult Import_ThongKeMuaHang(HttpPostedFileBase file)
        {
            try
            {
                if (Request != null)
                {
                    HttpPostedFileBase filetonkho = Request.Files["UploadedFile"];
                    if ((filetonkho != null) && (filetonkho.ContentLength > 0) && !string.IsNullOrEmpty(filetonkho.FileName))
                    {
                        string fileName = filetonkho.FileName;
                        string fileContentType = filetonkho.ContentType;
                        byte[] fileBytes = new byte[filetonkho.ContentLength];
                        var data = filetonkho.InputStream.Read(fileBytes, 0, Convert.ToInt32(filetonkho.ContentLength));
                        //var usersList = new List<Users>();
                        using (var package = new ExcelPackage(filetonkho.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                makhach = workSheet.Cells[rowIterator, 2].Value.ToString();
                                if (workSheet.Cells[rowIterator, 3].Value != null)
                                    mahang = workSheet.Cells[rowIterator, 3].Value.ToString();
                                else
                                    mahang = "";
                                if (workSheet.Cells[rowIterator, 4].Value != null)
                                    slmua = Convert.ToInt32(workSheet.Cells[rowIterator, 4].Value);
                                else
                                    slmua = 0;
                                if (workSheet.Cells[rowIterator, 5].Value != null)
                                    dongiamua = Convert.ToDecimal(workSheet.Cells[rowIterator, 5].Value);
                                else
                                    dongiamua = 0;
                                //if (workSheet.Cells[rowIterator, 6].Value != null)
                                    ngaymua = workSheet.Cells[rowIterator, 6].Value.ToString();
                                
                                if (workSheet.Cells[rowIterator, 7].Value != null)
                                    nvbanhang = workSheet.Cells[rowIterator, 7].Value.ToString();
                                else
                                    nvbanhang = null;



                                //Thêm khách hàng
                                KH_THONG_KE_MUA_HANG thongke = new KH_THONG_KE_MUA_HANG();
                                thongke.MA_KHACH_HANG = makhach;
                                thongke.MA_HANG = mahang;
                                thongke.SL_MUA = slmua;
                                thongke.DON_GIA_MUA = dongiamua;
                                thongke.NGAY_MUA = xulydate.Xulydatetime(ngaymua);
                                thongke.NHAN_VIEN_BAN_HANG = nvbanhang;
                                db.KH_THONG_KE_MUA_HANG.Add(thongke);
                                db.SaveChanges();

                                so_dong_thanh_cong++;
                                dong = rowIterator;

                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                ViewBag.ErrorThongKe = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                ViewBag.InformationThongKe = "Lỗi tại các dòng: " + dong;

            }
            finally
            {
                ViewBag.MessageThongKe = "Đã import thành công " + so_dong_thanh_cong + " dòng";
            }

            return View("Import_KhachHang");
        }

        #endregion


        #region "Bao gia khách hàng"

        public ActionResult BaoGiaKhach(String makhachhang)
        {
            ViewBag.makhach = makhachhang;
            return View();
        }

        #endregion


        #region "Tìm Kiếm KHÁCH HÀNG"

        public ActionResult TimKiem_KhachHang()
        {

            return View();
        }

        #endregion

        #region "Upload logo khách hàng"

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
                        var path = Path.Combine(Server.MapPath("~/Content/Images/KhachHang"), fileName);
                        file.SaveAs(path);
                    }
                }
            }
        }
        #endregion

        #region "Khách hàng chưa phát sinh giao dịch"

        public ActionResult KhachChuaGiaoDich()
        {

            return View();
        }

        #endregion

        #region "Thêm mới khách hàng"

        public ActionResult ThemMoiKhach()
        {

            return View();
        }

        #endregion

        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KH kH = db.KHs.Find(id);
            if (kH == null)
            {
                return HttpNotFound();
            }
            return View(kH);
        }





        #region "UPDATE KHÁCH HÀNG"


        [HttpPost]
        public ActionResult UpdateTT_KhachHang(HttpPostedFileBase file)
        {
            try
            {
                if (Request != null)
                {
                    HttpPostedFileBase filetonkho = Request.Files["UploadedFile"];
                    if ((filetonkho != null) && (filetonkho.ContentLength > 0) && !string.IsNullOrEmpty(filetonkho.FileName))
                    {
                        string fileName = filetonkho.FileName;
                        string fileContentType = filetonkho.ContentType;
                        byte[] fileBytes = new byte[filetonkho.ContentLength];
                        var data = filetonkho.InputStream.Read(fileBytes, 0, Convert.ToInt32(filetonkho.ContentLength));
                        //var usersList = new List<Users>();
                        using (var package = new ExcelPackage(filetonkho.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                makhach = workSheet.Cells[rowIterator, 1].Value.ToString();
                                tencongty = workSheet.Cells[rowIterator, 2].Value.ToString();
                                if (workSheet.Cells[rowIterator, 3].Value != null)
                                    phanloaikhach = workSheet.Cells[rowIterator, 3].Value.ToString();
                                else
                                    phanloaikhach = "";
                                if (workSheet.Cells[rowIterator, 4].Value != null)
                                    nhomnganh = workSheet.Cells[rowIterator, 4].Value.ToString();
                                else
                                    nhomnganh = "";
                                if (workSheet.Cells[rowIterator, 5].Value != null)
                                    diachivpgiaodich = workSheet.Cells[rowIterator, 5].Value.ToString();
                                else
                                    diachivpgiaodich = "";
                                if (workSheet.Cells[rowIterator, 6].Value != null)
                                    diachixuathoadon = workSheet.Cells[rowIterator, 6].Value.ToString();
                                else
                                    diachixuathoadon = "";
                                if (workSheet.Cells[rowIterator, 7].Value != null)
                                    MST = workSheet.Cells[rowIterator, 7].Value.ToString();
                                else
                                    MST = "";



                                if (workSheet.Cells[rowIterator, 8].Value != null)
                                    somayban = workSheet.Cells[rowIterator, 8].Value.ToString();
                                else
                                    somayban = "";
                                if (workSheet.Cells[rowIterator, 9].Value != null)
                                    fax = workSheet.Cells[rowIterator, 9].Value.ToString();
                                else
                                    fax = "";
                                if (workSheet.Cells[rowIterator, 10].Value != null)
                                    email = workSheet.Cells[rowIterator, 10].Value.ToString();
                                else
                                    email = "";
                                if (workSheet.Cells[rowIterator, 11].Value != null)
                                    logo = workSheet.Cells[rowIterator, 11].Value.ToString();
                                else
                                    logo = "";
                                if (workSheet.Cells[rowIterator, 12].Value != null)
                                    website = workSheet.Cells[rowIterator, 12].Value.ToString();
                                else
                                    website = "";
                                if (workSheet.Cells[rowIterator, 13].Value != null)
                                    tinh = workSheet.Cells[rowIterator, 13].Value.ToString();
                                else
                                    tinh = "";
                                if (workSheet.Cells[rowIterator, 14].Value != null)
                                    quocgia = workSheet.Cells[rowIterator, 14].Value.ToString();
                                else
                                    quocgia = "";
                                if (workSheet.Cells[rowIterator, 15].Value != null)
                                    dieukhoanthanhtoan = workSheet.Cells[rowIterator, 15].Value.ToString();
                                else
                                    dieukhoanthanhtoan = "";
                                if (workSheet.Cells[rowIterator, 16].Value != null)
                                    songayduocno = workSheet.Cells[rowIterator, 16].Value.ToString();
                                else
                                    songayduocno = "";
                                if (workSheet.Cells[rowIterator, 17].Value != null)
                                    sonotoida = workSheet.Cells[rowIterator, 17].Value.ToString();
                                else
                                    sonotoida = "";
                                if (workSheet.Cells[rowIterator, 18].Value != null)
                                    tinhtranghoatdong = workSheet.Cells[rowIterator, 18].Value.ToString();
                                else
                                    tinhtranghoatdong = "";
                                if (workSheet.Cells[rowIterator, 19].Value != null)
                                    tructhuoc = workSheet.Cells[rowIterator, 19].Value.ToString();
                                else
                                    tructhuoc = "";
                                if (workSheet.Cells[rowIterator, 20].Value != null)
                                    ghichu = workSheet.Cells[rowIterator, 20].Value.ToString();
                                else
                                    ghichu = "";
                                if (workSheet.Cells[rowIterator, 21].Value != null)
                                    phutrachhienthoi = workSheet.Cells[rowIterator, 21].Value.ToString();
                                else
                                    phutrachhienthoi = "";
                                if (workSheet.Cells[rowIterator, 22].Value != null)
                                    khophutrach = workSheet.Cells[rowIterator, 22].Value.ToString();
                                else
                                    khophutrach = "";

                                
                                if (workSheet.Cells[rowIterator, 23].Value != null)
                                    nguoilienhe = workSheet.Cells[rowIterator, 23].Value.ToString();
                                else
                                    nguoilienhe = "";
                                if (workSheet.Cells[rowIterator, 24].Value != null)
                                    chucvu = workSheet.Cells[rowIterator, 24].Value.ToString();
                                else
                                    chucvu = "";
                                if (workSheet.Cells[rowIterator, 25].Value != null)
                                    phongban = workSheet.Cells[rowIterator, 25].Value.ToString();
                                else
                                    phongban = "";
                                if (workSheet.Cells[rowIterator, 26].Value != null)
                                    ngaysinh = workSheet.Cells[rowIterator, 26].Value.ToString();
                                else
                                    ngaysinh = "";
                                if (workSheet.Cells[rowIterator, 27].Value != null)
                                    gioitinh = workSheet.Cells[rowIterator, 27].Value.ToString();
                                else
                                    gioitinh = "";
                                if (workSheet.Cells[rowIterator, 28].Value != null)
                                    sdt1 = workSheet.Cells[rowIterator, 28].Value.ToString();
                                else
                                    sdt1 = "";
                                if (workSheet.Cells[rowIterator, 29].Value != null)
                                    sdt2 = workSheet.Cells[rowIterator, 29].Value.ToString();
                                else
                                    sdt2 = "";
                                if (workSheet.Cells[rowIterator, 30].Value != null)
                                    emailcanhan = workSheet.Cells[rowIterator, 30].Value.ToString();
                                else
                                    emailcanhan = "";
                                if (workSheet.Cells[rowIterator, 31].Value != null)
                                    emailcongty = workSheet.Cells[rowIterator, 31].Value.ToString();
                                else
                                    emailcongty = "";
                                if (workSheet.Cells[rowIterator, 32].Value != null)
                                    skype = workSheet.Cells[rowIterator, 32].Value.ToString();
                                else
                                    skype = "";
                                if (workSheet.Cells[rowIterator, 33].Value != null)
                                    facebook = workSheet.Cells[rowIterator, 33].Value.ToString();
                                else
                                    facebook = "";
                                if (workSheet.Cells[rowIterator, 34].Value != null)
                                    ghichulienhe = workSheet.Cells[rowIterator, 34].Value.ToString();
                                else
                                    ghichulienhe = "";


                                if (workSheet.Cells[rowIterator, 35].Value != null)
                                    salephutrach = workSheet.Cells[rowIterator, 35].Value.ToString();
                                else
                                    salephutrach = "";

                                if (workSheet.Cells[rowIterator, 36].Value != null)
                                    sotknganhang = workSheet.Cells[rowIterator, 36].Value.ToString();
                                else
                                    sotknganhang = "";
                                if (workSheet.Cells[rowIterator, 37].Value != null)
                                    tentaikhoan = workSheet.Cells[rowIterator, 37].Value.ToString();
                                else
                                    tentaikhoan = "";
                                if (workSheet.Cells[rowIterator, 38].Value != null)
                                    tennganhang = workSheet.Cells[rowIterator, 38].Value.ToString();
                                else
                                    tennganhang = "";
                                if (workSheet.Cells[rowIterator, 39].Value != null)
                                    chinhanhnganhang = workSheet.Cells[rowIterator, 39].Value.ToString();
                                else
                                    chinhanhnganhang = "";
                                if (workSheet.Cells[rowIterator, 40].Value != null)
                                    tinhnganhang = workSheet.Cells[rowIterator, 40].Value.ToString();
                                else
                                    tinhnganhang = "";
                                if (workSheet.Cells[rowIterator, 41].Value != null)
                                    loaitaikhoan = workSheet.Cells[rowIterator, 41].Value.ToString();
                                else
                                    loaitaikhoan = "";
                                if (workSheet.Cells[rowIterator, 42].Value != null)
                                    ghichu = workSheet.Cells[rowIterator, 42].Value.ToString();
                                else
                                    ghichu = "";
                                if (workSheet.Cells[rowIterator, 43].Value != null)
                                    salequanly = workSheet.Cells[rowIterator, 43].Value.ToString();
                                else
                                    salequanly = "";


                                //SỬA KHÁCH HÀNG
                                var khachhang = db.KHs.Where(x => x.MA_KHACH_HANG == makhach).FirstOrDefault();
                                if (khachhang != null)
                                {
                                    khachhang.MA_KHACH_HANG = makhach;
                                    khachhang.TEN_CONG_TY = tencongty;
                                    if (diachivpgiaodich != "")
                                        khachhang.VAN_PHONG_GIAO_DICH = diachivpgiaodich;
                                    if (diachixuathoadon != "")
                                        khachhang.DIA_CHI_XUAT_HOA_DON = diachixuathoadon;
                                    if (MST != "")
                                        khachhang.MST = MST;
                                    if (somayban != "")
                                        khachhang.HOTLINE = somayban;
                                    if (fax != "")
                                        khachhang.FAX = fax;
                                    if (email != "")
                                        khachhang.EMAIL = email;
                                    if (logo != "")
                                        khachhang.LOGO = logo;
                                    if (website != "")
                                        khachhang.WEBSITE = website;
                                    if (tinh != "")
                                        khachhang.TINH = tinh;
                                    if (quocgia != "")
                                        khachhang.QUOC_GIA = quocgia;
                                    if (dieukhoanthanhtoan != "")
                                        khachhang.DIEU_KHOAN_THANH_TOAN = dieukhoanthanhtoan;
                                    if (songayduocno != "")
                                        khachhang.SO_NGAY_DUOC_NO = Convert.ToInt32(songayduocno);
                                    if (sonotoida != "")
                                        khachhang.SO_NO_TOI_DA = Convert.ToInt32(sonotoida);
                                    if (tinhtranghoatdong != "")
                                        khachhang.TINH_TRANG_HOAT_DONG = tinhtranghoatdong;
                                    if (tructhuoc != "")
                                        khachhang.TRUC_THUOC = tructhuoc;
                                    db.SaveChanges();
                                    //if (ghichu != "")
                                    //    khachhang.GHI_CHU = ghichu;

                                    //cập nhật phụ trách hiện thời
                                    if (phutrachhienthoi != "")
                                    {
                                        var chuyensale = db.KH_CHUYEN_SALES.Where(x => x.MA_KHACH_HANG == makhach).FirstOrDefault();
                                        if (chuyensale != null)
                                        {
                                            chuyensale.KHO_PHU_TRACH = khophutrach;
                                            chuyensale.SALE_HIEN_THOI = phutrachhienthoi;
                                            chuyensale.SALE_ME = salequanly;
                                            db.SaveChanges();
                                        }

                                        //  db.KH_CHUYEN_SALES.Add(chuyensale);

                                    }

                                    //thêm, sửa phân loại khách
                                    var DATA = db.KH_PHAN_LOAI_KHACH.Where(x => x.MA_KHACH_HANG == makhach).FirstOrDefault();
                                    if (DATA == null && phanloaikhach != "")
                                    {

                                        KH_PHAN_LOAI_KHACH plkhach = new KH_PHAN_LOAI_KHACH();
                                        plkhach.MA_KHACH_HANG = makhach;
                                        plkhach.MA_LOAI_KHACH = phanloaikhach;
                                        if (nhomnganh != "")
                                            plkhach.NHOM_NGANH = nhomnganh;
                                        db.KH_PHAN_LOAI_KHACH.Add(plkhach);
                                        db.SaveChanges();
                                    }
                                    else
                                    if (DATA != null && phanloaikhach != "")
                                    {

                                        DATA.MA_LOAI_KHACH = phanloaikhach;
                                        if (nhomnganh != "")
                                            DATA.NHOM_NGANH = nhomnganh;
                                        db.SaveChanges();
                                    }
                                    //-------------------------------
                                    //thêm người liên hệ
                                    if (nguoilienhe != "")
                                    {
                                        KH_LIEN_HE lhkhach = new KH_LIEN_HE();
                                        lhkhach.MA_KHACH_HANG = makhach;
                                        lhkhach.NGUOI_LIEN_HE = nguoilienhe;
                                        if (chucvu != "")
                                            lhkhach.CHUC_VU = chucvu;
                                        if (phongban != "")
                                            lhkhach.PHONG_BAN = phongban;
                                        if (ngaysinh != "")
                                            lhkhach.NGAY_SINH = xulydate.Xulydatetime(ngaysinh);
                                        if (gioitinh != "")
                                            lhkhach.GIOI_TINH = gioitinh;
                                        lhkhach.SDT1 = sdt1;
                                        if (sdt2 != "")
                                            lhkhach.SDT2 = sdt2;
                                        if (emailcanhan != "")
                                            lhkhach.EMAIL_CA_NHAN = emailcanhan;
                                        if (emailcongty != "")
                                            lhkhach.EMAIL_CONG_TY = emailcongty;
                                        if (skype != "")
                                            lhkhach.SKYPE = skype;
                                        if (facebook != "")
                                            lhkhach.FACEBOOK = facebook;
                                        if (ghichulienhe != "")
                                            lhkhach.GHI_CHU = ghichu;
                                        db.KH_LIEN_HE.Add(lhkhach);
                                        db.SaveChanges();

                                        //thêm sale phụ trách
                                        var datalienhe = db.KH_LIEN_HE.Where(x => x.SDT1 == sdt1).FirstOrDefault();
                                        if (datalienhe != null)
                                        {
                                            KH_SALES_PHU_TRACH salept = new KH_SALES_PHU_TRACH();
                                            salept.ID_LIEN_HE = datalienhe.ID_LIEN_HE;
                                            salept.SALES_PHU_TRACH = salephutrach;
                                            salept.NGAY_BAT_DAU_PHU_TRACH = DateTime.Today.Date;
                                            salept.TRANG_THAI = true;
                                            db.KH_SALES_PHU_TRACH.Add(salept);
                                            db.SaveChanges();
                                        }
                                        //-------------------------------------------

                                        //thêm tài khoản ngân hàng
                                        if (sotknganhang != "")
                                        {
                                            KH_TK_NGAN_HANG tkkhach = new KH_TK_NGAN_HANG();
                                            tkkhach.MA_KHACH_HANG = makhach;
                                            tkkhach.SO_TAI_KHOAN = sotknganhang;
                                            if (tentaikhoan != "")
                                                tkkhach.TEN_TAI_KHOAN = tentaikhoan;
                                            if (tennganhang != "")
                                                tkkhach.TEN_NGAN_HANG = tennganhang;
                                            if (chinhanhnganhang != "")
                                                tkkhach.CHI_NHANH = chinhanhnganhang;
                                            if (tinhnganhang != "")
                                                tkkhach.TINH_TP = tinhnganhang;

                                            if (loaitaikhoan != "")
                                                tkkhach.LOAI_TAI_KHOAN = loaitaikhoan;
                                            if (ghichutaikhoan != "")
                                                tkkhach.GHI_CHU = ghichutaikhoan;

                                            db.KH_TK_NGAN_HANG.Add(tkkhach);
                                            db.SaveChanges();


                                        }

                                    }
                                }



                                so_dong_thanh_cong++;
                                dong = rowIterator;

                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                ViewBag.Error1 = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                ViewBag.Information1 = "Lỗi tại các dòng: " + dong;

            }
            finally
            {
                ViewBag.Message1 = "Đã import thành công " + so_dong_thanh_cong + " dòng";
            }

            return View("Import_KhachHang");
        }

        #endregion





        #region "addnew Sale Phu Trách"


        [HttpPost]
        public ActionResult Addnew_SalePhuTrach(HttpPostedFileBase file)
        {
            try
            {
                if (Request != null)
                {
                    HttpPostedFileBase filetonkho = Request.Files["UploadedFile"];
                    if ((filetonkho != null) && (filetonkho.ContentLength > 0) && !string.IsNullOrEmpty(filetonkho.FileName))
                    {
                        string fileName = filetonkho.FileName;
                        string fileContentType = filetonkho.ContentType;
                        byte[] fileBytes = new byte[filetonkho.ContentLength];
                        var data = filetonkho.InputStream.Read(fileBytes, 0, Convert.ToInt32(filetonkho.ContentLength));
                        //var usersList = new List<Users>();
                        using (var package = new ExcelPackage(filetonkho.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                #region "GetdatafromExcel"
                                makhach = workSheet.Cells[rowIterator, 1].Value.ToString();
                                tencongty = workSheet.Cells[rowIterator, 2].Value.ToString();
                                if (workSheet.Cells[rowIterator, 3].Value != null)
                                    phanloaikhach = workSheet.Cells[rowIterator, 3].Value.ToString();
                                else
                                    phanloaikhach = "";
                                if (workSheet.Cells[rowIterator, 4].Value != null)
                                    nhomnganh = workSheet.Cells[rowIterator, 4].Value.ToString();
                                else
                                    nhomnganh = "";
                                if (workSheet.Cells[rowIterator, 5].Value != null)
                                    diachivpgiaodich = workSheet.Cells[rowIterator, 5].Value.ToString();
                                else
                                    diachivpgiaodich = "";
                                if (workSheet.Cells[rowIterator, 6].Value != null)
                                    diachixuathoadon = workSheet.Cells[rowIterator, 6].Value.ToString();
                                else
                                    diachixuathoadon = "";
                                if (workSheet.Cells[rowIterator, 7].Value != null)
                                    MST = workSheet.Cells[rowIterator, 7].Value.ToString();
                                else
                                    MST = "";



                                if (workSheet.Cells[rowIterator, 8].Value != null)
                                    somayban = workSheet.Cells[rowIterator, 8].Value.ToString();
                                else
                                    somayban = "";
                                if (workSheet.Cells[rowIterator, 9].Value != null)
                                    fax = workSheet.Cells[rowIterator, 9].Value.ToString();
                                else
                                    fax = "";
                                if (workSheet.Cells[rowIterator, 10].Value != null)
                                    email = workSheet.Cells[rowIterator, 10].Value.ToString();
                                else
                                    email = "";
                                if (workSheet.Cells[rowIterator, 11].Value != null)
                                    logo = workSheet.Cells[rowIterator, 11].Value.ToString();
                                else
                                    logo = "";
                                if (workSheet.Cells[rowIterator, 12].Value != null)
                                    website = workSheet.Cells[rowIterator, 12].Value.ToString();
                                else
                                    website = "";
                                if (workSheet.Cells[rowIterator, 13].Value != null)
                                    tinh = workSheet.Cells[rowIterator, 13].Value.ToString();
                                else
                                    tinh = "";
                                if (workSheet.Cells[rowIterator, 14].Value != null)
                                    quocgia = workSheet.Cells[rowIterator, 14].Value.ToString();
                                else
                                    quocgia = "";
                                if (workSheet.Cells[rowIterator, 15].Value != null)
                                    dieukhoanthanhtoan = workSheet.Cells[rowIterator, 15].Value.ToString();
                                else
                                    dieukhoanthanhtoan = "";
                                if (workSheet.Cells[rowIterator, 16].Value != null)
                                    songayduocno = workSheet.Cells[rowIterator, 16].Value.ToString();
                                else
                                    songayduocno = "";
                                if (workSheet.Cells[rowIterator, 17].Value != null)
                                    sonotoida = workSheet.Cells[rowIterator, 17].Value.ToString();
                                else
                                    sonotoida = "";
                                if (workSheet.Cells[rowIterator, 18].Value != null)
                                    tinhtranghoatdong = workSheet.Cells[rowIterator, 18].Value.ToString();
                                else
                                    tinhtranghoatdong = "";
                                if (workSheet.Cells[rowIterator, 19].Value != null)
                                    tructhuoc = workSheet.Cells[rowIterator, 19].Value.ToString();
                                else
                                    tructhuoc = "";
                                if (workSheet.Cells[rowIterator, 20].Value != null)
                                    ghichu = workSheet.Cells[rowIterator, 20].Value.ToString();
                                else
                                    ghichu = "";
                                if (workSheet.Cells[rowIterator, 21].Value != null)
                                    phutrachhienthoi = workSheet.Cells[rowIterator, 21].Value.ToString();
                                else
                                    phutrachhienthoi = null;
                                if (workSheet.Cells[rowIterator, 22].Value != null)
                                    khophutrach = workSheet.Cells[rowIterator, 22].Value.ToString();
                                else
                                    khophutrach = null;


                                if (workSheet.Cells[rowIterator, 23].Value != null)
                                    nguoilienhe = workSheet.Cells[rowIterator, 23].Value.ToString();
                                else
                                    nguoilienhe = "";
                                if (workSheet.Cells[rowIterator, 24].Value != null)
                                    chucvu = workSheet.Cells[rowIterator, 24].Value.ToString();
                                else
                                    chucvu = "";
                                if (workSheet.Cells[rowIterator, 25].Value != null)
                                    phongban = workSheet.Cells[rowIterator, 25].Value.ToString();
                                else
                                    phongban = "";
                                if (workSheet.Cells[rowIterator, 26].Value != null)
                                    ngaysinh = workSheet.Cells[rowIterator, 26].Value.ToString();
                                else
                                    ngaysinh = "";
                                if (workSheet.Cells[rowIterator, 27].Value != null)
                                    gioitinh = workSheet.Cells[rowIterator, 27].Value.ToString();
                                else
                                    gioitinh = "";
                                if (workSheet.Cells[rowIterator, 28].Value != null)
                                    sdt1 = workSheet.Cells[rowIterator, 28].Value.ToString();
                                else
                                    sdt1 = "";
                                if (workSheet.Cells[rowIterator, 29].Value != null)
                                    sdt2 = workSheet.Cells[rowIterator, 29].Value.ToString();
                                else
                                    sdt2 = "";
                                if (workSheet.Cells[rowIterator, 30].Value != null)
                                    emailcanhan = workSheet.Cells[rowIterator, 30].Value.ToString();
                                else
                                    emailcanhan = "";
                                if (workSheet.Cells[rowIterator, 31].Value != null)
                                    emailcongty = workSheet.Cells[rowIterator, 31].Value.ToString();
                                else
                                    emailcongty = "";
                                if (workSheet.Cells[rowIterator, 32].Value != null)
                                    skype = workSheet.Cells[rowIterator, 32].Value.ToString();
                                else
                                    skype = "";
                                if (workSheet.Cells[rowIterator, 33].Value != null)
                                    facebook = workSheet.Cells[rowIterator, 33].Value.ToString();
                                else
                                    facebook = "";
                                if (workSheet.Cells[rowIterator, 34].Value != null)
                                    ghichulienhe = workSheet.Cells[rowIterator, 34].Value.ToString();
                                else
                                    ghichulienhe = "";


                                if (workSheet.Cells[rowIterator, 35].Value != null)
                                    salephutrach = workSheet.Cells[rowIterator, 35].Value.ToString();
                                else
                                    salephutrach = "";

                                if (workSheet.Cells[rowIterator, 36].Value != null)
                                    sotknganhang = workSheet.Cells[rowIterator, 36].Value.ToString();
                                else
                                    sotknganhang = "";
                                if (workSheet.Cells[rowIterator, 37].Value != null)
                                    tentaikhoan = workSheet.Cells[rowIterator, 37].Value.ToString();
                                else
                                    tentaikhoan = "";
                                if (workSheet.Cells[rowIterator, 38].Value != null)
                                    tennganhang = workSheet.Cells[rowIterator, 38].Value.ToString();
                                else
                                    tennganhang = "";
                                if (workSheet.Cells[rowIterator, 39].Value != null)
                                    chinhanhnganhang = workSheet.Cells[rowIterator, 39].Value.ToString();
                                else
                                    chinhanhnganhang = "";
                                if (workSheet.Cells[rowIterator, 40].Value != null)
                                    tinhnganhang = workSheet.Cells[rowIterator, 40].Value.ToString();
                                else
                                    tinhnganhang = "";
                                if (workSheet.Cells[rowIterator, 41].Value != null)
                                    loaitaikhoan = workSheet.Cells[rowIterator, 41].Value.ToString();
                                else
                                    loaitaikhoan = "";
                                if (workSheet.Cells[rowIterator, 42].Value != null)
                                    ghichu = workSheet.Cells[rowIterator, 42].Value.ToString();
                                else
                                    ghichu = "";
                                if (workSheet.Cells[rowIterator, 43].Value != null)
                                    salequanly = workSheet.Cells[rowIterator, 43].Value.ToString();
                                else
                                    salequanly = null;
                                #endregion
                                //cập nhật phụ trách hiện thời
                                if (phutrachhienthoi != "")
                                {
                                        KH_CHUYEN_SALES chuyensale = new KH_CHUYEN_SALES();
                                        chuyensale.MA_KHACH_HANG = makhach;
                                        chuyensale.SALE_HIEN_THOI = phutrachhienthoi;
                                        chuyensale.KHO_PHU_TRACH = khophutrach;
                                        chuyensale.SALE_ME = salequanly;
                                        db.KH_CHUYEN_SALES.Add(chuyensale);
                                        db.SaveChanges();

                                    //  db.KH_CHUYEN_SALES.Add(chuyensale);

                                }
                                dong = rowIterator;
                            }
                        }
                    }
                }
            


            }
            catch (Exception Ex)
            {
                ViewBag.Error2 = " Đã xảy ra lỗi, Liên hệ ngay với admin. " + Environment.NewLine + " Thông tin chi tiết về lỗi:" + Environment.NewLine + Ex;
                ViewBag.Information2 = "Lỗi tại các dòng: " + dong;

            }
            finally
            {
                ViewBag.Message2 = "Đã import thành công " + so_dong_thanh_cong + " dòng";
            }

            return View("Import_KhachHang");
        }

        #endregion




        //==================================================================
        public ActionResult KHHome(string makhachhang)
        {
            string kh = makhachhang;
            ViewBag.makhachhang = kh;
            return View();
        }

    }
}
