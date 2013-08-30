using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PerlServer.BusinessLogicLayer;

namespace PerlServer.Controllers
{
    public class ChangeNoteStateController : Controller
    {
        public JsonResult getChangeNoteStateById(Guid changeNoteStateId)
        {
            changeNoteStateId = (changeNoteStateId == BLL.NA_GUID) ? Guid.NewGuid() : changeNoteStateId;
            JsonResult retval = new JsonResult();
            retval.Data = BLL.getChangeNoteState(changeNoteStateId);
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }
        public JsonResult getChangeNoteStates()
        {
            JsonResult retval = new JsonResult();
            retval.Data = BLL.getChangeNoteStates();
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }
        public JsonResult save(ChangeNoteState changeNoteState)
        {
            JsonResult retval = new JsonResult();
            retval.Data = BLL.saveChangeNoteState(changeNoteState);
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }

    }
}
