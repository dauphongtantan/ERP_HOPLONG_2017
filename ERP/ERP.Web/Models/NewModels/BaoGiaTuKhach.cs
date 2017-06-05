using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Web.Models.NewModels
{
    public class BaoGiaTuKhach
    {
        public int ID_LIEN_HE { set; get; }
        public string SO_BAO_GIA { set; get; }
        public string NGAY_BAO_GIA { set; get; }
        public string MA_DU_KIEN { set; get; }
        public string MA_KHACH_HANG { set; get; }
        public int LIEN_HE_KHACH_HANG { set; get; }
        public string PHUONG_THUC_THANH_TOAN { set; get; }
        public string HAN_THANH_TOAN { set; get; }
        public int HIEU_LUC_BAO_GIA { set; get; }
        public string DIEU_KHOAN_THANH_TOAN { set; get; }
        public decimal THANH_TIEN { set; get; }
        public decimal PHI_VAN_CHUYEN { set; get; }
        public float CK_VAT { set; get; }
        public decimal TIEN_VAT { set; get; }
        public decimal TONG_TIEN { set; get; }
        public bool DA_DUYET { set; get; }
        public string NGUOI_DUYET { set; get; }
        public bool DA_TRUNG { set; get; }
        public bool DA_HUY { set; get; }
        public string LY_DO_HUY { set; get; }
        public string SALES_BAO_GIA { set; get; }
        public string TRUC_THUOC { set; get; }
        public string HO_VA_TEN { set; get; }
        public string TEN_CONG_TY { set; get; }
        public string NGUOI_LIEN_HE { set; get; }
        public string MA_HANG { set; get; }
        public string TEN_HANG { set; get; }
        public string GHI_CHU { set; get; }
        public List<ChiTietBaoGia> ChiTietCuaBaoGia { set; get; }

        public decimal TONG_GIA_TRI_DON_HANG_THUC_TE { set; get; }
        public decimal GIA_TRI_THUC_THU_TU_KHACH { set; get; }
        public decimal TONG_GIA_TRI_CHENH_LECH { set; get; }
        public decimal TONG_CHI_PHI_HOA_DON { set; get; }
        public decimal THUC_NHAN_CUA_KHACH { set; get; }
        public bool   DANG_CHO_PHAN_HOI { set; get; }
        public float THUE_SUAT_GTGT { set; get; }
        public decimal TIEN_THUE_GTGT { set; get; }
    }
}