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
    
    public partial class KHO_NHAT_KY_TACH_GOP_MA
    {
        public string MA_SO_TACH_GOP { get; set; }
        public string LOAI { get; set; }
        public Nullable<System.DateTime> NGAY_TACH_GOP { get; set; }
        public int ID_TACH_GOP_MA { get; set; }
        public string NGUOI_LAP_PHIEU { get; set; }
        public string NV_TACH_THUC_TE_1 { get; set; }
        public string NV_TACH_THUC_TE_2 { get; set; }
        public string NV_TACH_THUC_TE_3 { get; set; }
        public string NV_TACH_THUC_TE_4 { get; set; }
        public string NV_TACH_THUC_TE_5 { get; set; }
        public string GHI_CHU { get; set; }
        public string TRUC_THUOC { get; set; }
    
        public virtual CCTC_CONG_TY CCTC_CONG_TY { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN1 { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN2 { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN3 { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN4 { get; set; }
        public virtual CCTC_NHAN_VIEN CCTC_NHAN_VIEN5 { get; set; }
        public virtual KHO_INIT_TACH_GOP_MA KHO_INIT_TACH_GOP_MA { get; set; }
    }
}
