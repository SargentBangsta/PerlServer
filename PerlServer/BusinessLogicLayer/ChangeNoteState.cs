using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PerlServer.Models;

namespace PerlServer.BusinessLogicLayer
{
    public partial class BLL
    {
        public static Guid NA_GUID = new Guid("99999999-9999-9999-9999-999999999999");
        
        
        
        public static List<ChangeNoteState> getChangeNoteStates()
        {
            List<ChangeNoteState> list = new List<ChangeNoteState> ();
            foreach (PerlServer.Models.ChangeNoteState c in DAL.Select<PerlServer.Models.ChangeNoteState>(DAL.getUnitOfWork()).OrderBy < PerlServer.Models.ChangeNoteState,int>(x => x.DisplayOrder).AsEnumerable())
            {
                list.Add(new ChangeNoteState(c));
            }
            return list;
        }
        public static ChangeNoteState getChangeNoteState(Guid changeNoteStateId)
        {
            return new ChangeNoteState(DAL.SelectFirst<PerlServer.Models.ChangeNoteState>(DAL.getUnitOfWork(), e => e.ChangeNoteStateId == changeNoteStateId));
        }
        public static ChangeNoteState saveChangeNoteState(ChangeNoteState changeNoteState)
        {
            perlDbEntities uow = DAL.getUnitOfWork();
            Guid id = (changeNoteState.ChangeNoteStateId == DAL.NA_GUID) ? Guid.NewGuid() : changeNoteState.ChangeNoteStateId;
            PerlServer.Models.ChangeNoteState entity = DAL.SelectFirst<PerlServer.Models.ChangeNoteState>(uow, e => e.ChangeNoteStateId == id);
            entity.ChangeNoteStateId = id;
            entity.Code = changeNoteState.Code;
            entity.DisplayOrder = changeNoteState.DisplayOrder;
            return new ChangeNoteState(DAL.Save<PerlServer.Models.ChangeNoteState>(uow, entity));
        }

    }
    public class ChangeNoteState
    {
        public Guid ChangeNoteStateId { get; set; }
        public String Code { get; set; }
        public int DisplayOrder { get; set; }
        public ChangeNoteState()
        {
        }
        public ChangeNoteState(PerlServer.Models.ChangeNoteState changeNoteState)
        {
            ChangeNoteStateId = changeNoteState.ChangeNoteStateId;
            Code = (changeNoteState.Code != null) ? changeNoteState.Code : "newState";
            DisplayOrder = changeNoteState.DisplayOrder;
        }
    }
}
