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
    
    public partial class DM_LIST_CHIEN_DICH_MARKETING
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DM_LIST_CHIEN_DICH_MARKETING()
        {
            this.KH_CHIEN_DICH_MARKETING = new HashSet<KH_CHIEN_DICH_MARKETING>();
        }
    
        public int ID { get; set; }
        public string TEN_LIST { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<KH_CHIEN_DICH_MARKETING> KH_CHIEN_DICH_MARKETING { get; set; }
    }
}