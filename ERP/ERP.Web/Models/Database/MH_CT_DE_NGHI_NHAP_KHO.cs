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
    
    public partial class MH_CT_DE_NGHI_NHAP_KHO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MH_CT_DE_NGHI_NHAP_KHO()
        {
            this.MH_DE_NGHI_JOIN_PO_MH = new HashSet<MH_DE_NGHI_JOIN_PO_MH>();
        }
    
        public int ID { get; set; }
        public string MA_SO_DN { get; set; }
        public string MA_HANG { get; set; }
        public int SL { get; set; }
        public string TK_NO { get; set; }
        public string TK_CO { get; set; }
        public decimal DON_GIA_CHUA_VAT { get; set; }
        public decimal THANH_TIEN_CHUA_VAT { get; set; }
        public string DIEN_GIAI_THUE { get; set; }
        public decimal THUE_GTGT { get; set; }
        public decimal TIEN_THUE_GTGT { get; set; }
        public string TK_THUE { get; set; }
    
        public virtual DM_TAI_KHOAN_HACH_TOAN DM_TAI_KHOAN_HACH_TOAN { get; set; }
        public virtual DM_TAI_KHOAN_HACH_TOAN DM_TAI_KHOAN_HACH_TOAN1 { get; set; }
        public virtual DM_TAI_KHOAN_HACH_TOAN DM_TAI_KHOAN_HACH_TOAN2 { get; set; }
        public virtual HH HH { get; set; }
        public virtual MH_DE_NGHI_NHAP_KHO MH_DE_NGHI_NHAP_KHO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MH_DE_NGHI_JOIN_PO_MH> MH_DE_NGHI_JOIN_PO_MH { get; set; }
    }
}
