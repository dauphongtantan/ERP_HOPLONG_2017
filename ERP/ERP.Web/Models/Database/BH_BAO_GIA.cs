//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP.Web.Models.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class BH_BAO_GIA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BH_BAO_GIA()
        {
            this.BH_CT_BAO_GIA = new HashSet<BH_CT_BAO_GIA>();
            this.BH_DON_HANG_PO = new HashSet<BH_DON_HANG_PO>();
            this.BH_PHUONG_AN_KINH_DOANH = new HashSet<BH_PHUONG_AN_KINH_DOANH>();
        }
    
        public string SO_BAO_GIA { get; set; }
        public System.DateTime NGAY_BAO_GIA { get; set; }
        public string MA_DU_KIEN { get; set; }
        public string MA_KHACH_HANG { get; set; }
        public int LIEN_HE_KHACH_HANG { get; set; }
        public string PHUONG_THUC_THANH_TOAN { get; set; }
        public string HAN_THANH_TOAN { get; set; }
        public Nullable<int> HIEU_LUC_BAO_GIA { get; set; }
        public string DIEU_KHOAN_THANH_TOAN { get; set; }
        public Nullable<decimal> PHI_VAN_CHUYEN { get; set; }
        public decimal TONG_TIEN { get; set; }
        public Nullable<decimal> TONG_GIA_TRI_DON_HANG_THUC_TE { get; set; }
        public Nullable<decimal> GIA_TRI_THUC_THU_TU_KHACH { get; set; }
        public Nullable<decimal> TONG_GIA_TRI_CHENH_LECH { get; set; }
        public Nullable<decimal> TONG_CHI_PHI_HOA_DON { get; set; }
        public Nullable<decimal> THUC_NHAN_CUA_KHACH { get; set; }
        public Nullable<bool> DA_DUYET { get; set; }
        public string NGUOI_DUYET { get; set; }
        public Nullable<bool> DA_TRUNG { get; set; }
        public Nullable<bool> DA_HUY { get; set; }
        public string LY_DO_HUY { get; set; }
        public string SALES_BAO_GIA { get; set; }
        public string TRUC_THUOC { get; set; }
        public bool DANG_CHO_PHAN_HOI { get; set; }
        public Nullable<double> THUE_SUAT_GTGT { get; set; }
        public Nullable<decimal> TIEN_THUE_GTGT { get; set; }
    
        public virtual KH_LIEN_HE KH_LIEN_HE { get; set; }
        public virtual BH_DON_HANG_DU_KIEN BH_DON_HANG_DU_KIEN { get; set; }
        public virtual KH KH { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BH_CT_BAO_GIA> BH_CT_BAO_GIA { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BH_DON_HANG_PO> BH_DON_HANG_PO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BH_PHUONG_AN_KINH_DOANH> BH_PHUONG_AN_KINH_DOANH { get; set; }
    }
}
