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
    
    public partial class NOTIFICATION
    {
        public int ID { get; set; }
        public string NGUOI_DUNG { get; set; }
        public System.DateTime NGAY_THONG_BAO { get; set; }
        public string LINK_THONG_BAO { get; set; }
        public string NOI_DUNG_THONG_BAO { get; set; }
        public bool DA_DOC_THONG_BAO { get; set; }
        public Nullable<System.DateTime> NGAY_DOC_THONG_BAO { get; set; }
    
        public virtual HT_NGUOI_DUNG HT_NGUOI_DUNG { get; set; }
    }
}
