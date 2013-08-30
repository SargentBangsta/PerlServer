$.perl.define("ChangeNoteState", {
    dataSourceURL: "ChangeNoteState/getChangeNoteStateById?changeNoteStateId=",
    dataSaveURL: "ChangeNoteState/Save",
    nodeText: function () {
        return (this.data) ? this.data.Code : "New Code";
    },
    id: function () {
        return (this.data) ? this.data.ChangeNoteStateId : "99999999-9999-9999-9999-999999999999";
    }
})
.views.addView('edit', {
    headerText: "Editor: Change Note State ",
    fields: [
        {
            name: "ChangeNoteStateId",
            type: "hidden",
            label: "",
            default: "99999999-9999-9999-9999-999999999999"
        },
        {
            name: "Code",
            type: "text",
            label: "Code:",
            default: "new code",
            validator: new $.perl.Validator()
               .addValidator($.perl.ValidatorRequired)
               .addValidator($.perl.ValidatorMaxLength10)
        },
        {
            name: "DisplayOrder",
            type: "text",
            label: "Display Order",
            default: "1",
            validator: new $.perl.Validator()
               .addValidator($.perl.ValidatorRequired)
               .addValidator($.perl.ValidatorInt)
        }
    ]
},
$.perl.EditView);



$.perl.define("ChangeNoteStates", {
    dataSourceURL: "ChangeNoteState/getChangeNoteStates",
    childType: "ChangeNoteState"
})
.views.addView("listEdit", {
    headerText: "List Editor: Change Note States"
},
$.perl.ListView);
