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
    
    public partial class DM_TK_NGAN_HANG_NOI_BO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DM_TK_NGAN_HANG_NOI_BO()
        {
            this.NH_CHUYEN_TIEN_NOI_BO = new HashSet<NH_CHUYEN_TIEN_NOI_BO>();
            this.NH_CHUYEN_TIEN_NOI_BO1 = new HashSet<NH_CHUYEN_TIEN_NOI_BO>();
            this.NH_UNC = new HashSet<NH_UNC>();
            this.NH_NTTK = new HashSet<NH_NTTK>();
        }
    
        public string SO_TAI_KHOAN { get; set; }
        public string MA_CONG_TY { get; set; }
        public string TEN_TAI_KHOAN { get; set; }
        public string LOAI_TAI_KHOAN { get; set; }
        public string TEN_NGAN_HANG { get; set; }
        public string CHI_NHANH { get; set; }
        public string TINH_TP { get; set; }
        public string GHI_CHU { get; set; }
    
        public virtual CCTC_CONG_TY CCTC_CONG_TY { get; set; }
        public virtual DM_LOAI_TK_NGAN_HANG DM_LOAI_TK_NGAN_HANG { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NH_CHUYEN_TIEN_NOI_BO> NH_CHUYEN_TIEN_NOI_BO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NH_CHUYEN_TIEN_NOI_BO> NH_CHUYEN_TIEN_NOI_BO1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NH_UNC> NH_UNC { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NH_NTTK> NH_NTTK { get; set; }
    }
}
