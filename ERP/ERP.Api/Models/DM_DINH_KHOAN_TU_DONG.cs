//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP.Api.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class DM_DINH_KHOAN_TU_DONG
    {
        public int ID { get; set; }
        public string MA_LOAI_CHUNG_TU { get; set; }
        public string MA_LY_DO { get; set; }
        public string TEN_LY_DO { get; set; }
        public string TK_NO { get; set; }
        public string TK_CO { get; set; }
    
        public virtual DM_LOAI_CHUNG_TU DM_LOAI_CHUNG_TU { get; set; }
        public virtual DM_TAI_KHOAN_HACH_TOAN DM_TAI_KHOAN_HACH_TOAN { get; set; }
        public virtual DM_TAI_KHOAN_HACH_TOAN DM_TAI_KHOAN_HACH_TOAN1 { get; set; }
    }
}
