using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PerlServer.Models;

namespace PerlServer.BusinessLogicLayer
{
    public partial class BLL
    {
        public static List<ChangeNote> getChangeNotes()
        {
            List<ChangeNote> list = new List<ChangeNote>();
            foreach (PerlServer.Models.ChangeNote c in DAL.Select<PerlServer.Models.ChangeNote>(DAL.getUnitOfWork()).OrderBy<PerlServer.Models.ChangeNote, int>(x => x.ChangeNoteNumber).AsEnumerable())
            {
                list.Add(new ChangeNote(c));
            }
            return list;
        }
        public static List<ChangeNote> getChangeNotesByOriginationNoteId(Guid originationNoteId)
        {
            List<ChangeNote> list = new List<ChangeNote>();
            foreach (PerlServer.Models.ChangeNote c in DAL.Select<PerlServer.Models.ChangeNote>(DAL.getUnitOfWork())
                .Where(y => y.ptrOriginationNote == originationNoteId)
                .OrderBy<PerlServer.Models.ChangeNote, int>(x => x.ChangeNoteNumber).AsEnumerable())
            {
                list.Add(new ChangeNote(c));
            }
            return list;
        }
        public static ChangeNote getChangeNote(Guid changeNoteId)
        {
            return new ChangeNote(DAL.SelectFirst<PerlServer.Models.ChangeNote>(DAL.getUnitOfWork(), e => e.ChangeNoteId == changeNoteId));
        }
        public static ChangeNote saveChangeNote(ChangeNote changeNote)
        {
            perlDbEntities uow = DAL.getUnitOfWork();
            Guid id = (changeNote.ChangeNoteId == DAL.NA_GUID) ? Guid.NewGuid() : changeNote.ChangeNoteId;
            PerlServer.Models.ChangeNote entity = DAL.SelectFirst<PerlServer.Models.ChangeNote>(uow, e => e.ChangeNoteId == id);
            entity.ChangeNoteId = id;
            entity.ChangeDate = DateTime.Now;
            entity.ChangeDescription = changeNote.ChangeDescription;
            entity.ChangeNoteNumber = changeNote.ChangeNoteNumber;
            return new ChangeNote(DAL.Save<PerlServer.Models.ChangeNote>(uow, entity));
        }

    }
    public class ChangeNote
    {
        public System.Guid ChangeNoteId { get; set; }
        public System.Guid OriginationNoteId { get; set; }
        public int ChangeNoteNumber { get; set; }
        public int VersionNumber { get; set; }
        public string ChangeDescription { get; set; }
        public System.DateTime ChangeDate { get; set; }
        public System.Guid Status { get; set; }
        public ChangeNote()
        {
        }
        public ChangeNote(PerlServer.Models.ChangeNote changeNote)
        {
            ChangeNoteId = changeNote.ChangeNoteId;
            //OriginationNoteId = (changeNote.OriginationNoteId != null) ? changeNote.OriginationNoteId : BLL.NA_GUID;
            ChangeNoteNumber = changeNote.ChangeNoteNumber;
            VersionNumber = changeNote.VersionNumber;
            ChangeDescription = changeNote.ChangeDescription;
            ChangeDate = changeNote.ChangeDate;
            Status = changeNote.Status;
        }
    }
}