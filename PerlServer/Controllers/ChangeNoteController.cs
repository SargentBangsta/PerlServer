using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PerlServer.BusinessLogicLayer;

namespace PerlServer.Controllers
{
    public class ChangeNoteController : Controller
    {
        //
        // GET: /ChangeNote/

        public JsonResult getById(Guid ChangeNoteId)
        {
            JsonResult retval = new JsonResult();
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            retval.Data = BLL.getChangeNote(ChangeNoteId);
            return retval;
        }

        public JsonResult save(ChangeNote changeNote)
        {
            JsonResult retval = new JsonResult();
            retval.Data = BLL.saveChangeNote(changeNote);
            retval.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return retval;
        }

    }
}
