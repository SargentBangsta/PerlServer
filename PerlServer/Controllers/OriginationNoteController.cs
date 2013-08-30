using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PerlServer.BusinessLogicLayer;

namespace PerlServer.Controllers
{
    public class OriginationNoteController : Controller
    {


        public JsonResult getByOriginationNoteId(Guid OriginationNoteId)
        {
            OriginationNoteId = (OriginationNoteId == BLL.NA_GUID) ? Guid.NewGuid() : OriginationNoteId;
            JsonResult retval = new JsonResult();
            retval.Data = BLL.getOriginationNoteById(OriginationNoteId);
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }
        public JsonResult getById(Guid OriginationNoteId)
        {
            OriginationNoteId = (OriginationNoteId == BLL.NA_GUID) ? Guid.NewGuid() : OriginationNoteId;
            JsonResult retval = new JsonResult();
            retval.Data = BLL.getOriginationNoteById(OriginationNoteId);
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }
        public JsonResult getAll()
        {
            JsonResult retval = new JsonResult();
            retval.Data = BLL.getOriginationNotes();
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }
        public JsonResult save(OriginationNote originationNote)
        {
            JsonResult retval = new JsonResult();
            retval.Data = BLL.saveOriginationNote(originationNote);
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }


    }
}
