using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PerlServer.Models;

namespace PerlServer.BusinessLogicLayer
{
    public partial class BLL
    {
        public static List<OriginationNote> getOriginationNotes()
        {
            List<OriginationNote> list = new List<OriginationNote>();
            foreach (PerlServer.Models.OriginationNote c in DAL.Select<PerlServer.Models.OriginationNote>(DAL.getUnitOfWork()).OrderBy<PerlServer.Models.OriginationNote, int>(x => x.OriginationNoteNumber).AsEnumerable())
            {
                list.Add(new OriginationNote(c));
            }
            if (list.Count == 0)
            {
                list.Add(getOriginationNoteById(BLL.NA_GUID));
            }
            return list;
        }
        public static OriginationNote getOriginationNoteById(Guid id)
        {
            id = (id == DAL.NA_GUID) ? Guid.NewGuid() : id;
            PerlServer.Models.OriginationNote entity = DAL.SelectFirst<PerlServer.Models.OriginationNote>(DAL.getUnitOfWork(), e => e.OriginationNoteId == id);
            entity.OriginationNoteId = id;
            entity.OriginationNoteNumber = (entity.OriginationNoteNumber == 0) ? DAL.Select<PerlServer.Models.OriginationNote>(DAL.getUnitOfWork()).ToList().Count + 1 : entity.OriginationNoteNumber;
            entity.RevisionNumber = entity.RevisionNumber;
            entity.DocumentName = entity.DocumentName;
            entity.DocumentDescription = entity.DocumentDescription;


            return new OriginationNote(entity);
        }
        public static OriginationNote saveOriginationNote(OriginationNote originationNote)
        {
            perlDbEntities uow = DAL.getUnitOfWork();
            Guid id = (originationNote.OriginationNoteId == DAL.NA_GUID) ? Guid.NewGuid() : originationNote.OriginationNoteId;
            PerlServer.Models.OriginationNote entity = DAL.SelectFirst<PerlServer.Models.OriginationNote>(uow, e => e.OriginationNoteId == id);

            entity.OriginationNoteId = id;
            entity.OriginationNoteNumber = originationNote.OriginationNoteNumber;
            entity.RevisionNumber = originationNote.RevisionNumber;
            entity.DocumentName = originationNote.DocumentName;
            entity.DocumentDescription = originationNote.DocumentDescription;
            return new OriginationNote(DAL.Save<PerlServer.Models.OriginationNote>(uow, entity));
        }

    }

    
    public class OriginationNote
    {
        public System.Guid OriginationNoteId { get; set; }
        public int OriginationNoteNumber { get; set; }
        public int RevisionNumber { get; set; }
        public string DocumentName { get; set; }
        public string DocumentDescription { get; set; }
        public OriginationNote()
        {
        }
        public OriginationNote(PerlServer.Models.OriginationNote originationNote)
        {
            OriginationNoteId = originationNote.OriginationNoteId;
            OriginationNoteNumber = originationNote.OriginationNoteNumber;
            RevisionNumber = originationNote.RevisionNumber;
            DocumentName = originationNote.DocumentName;
            DocumentDescription = originationNote.DocumentDescription;
        }
    }
}