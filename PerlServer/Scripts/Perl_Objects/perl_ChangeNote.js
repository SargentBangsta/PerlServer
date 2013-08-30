$.perl.define("ChangeNote", {
    dataSourceURL: "ChangeNote/getById?ChangeNoteId=",
    dataSaveURL: "ChangeNote/Save",
    nodeText: function () {
        return (this.data) ? this.data.ChangeNoteNumber : -1;
    }
})
.views.addView('edit', {
    headerText: "Editor: Change Note State ",
    fields: [
        {
            name: "ChangeNoteId",
            type: "hidden",
            label: "",
            default: "99999999-9999-9999-9999-999999999999"
        },
        {
            name: "ChangeNoteNumber",
            type: "readonly",
            label: "Change Note Number:",
            default: "-1",
            validator: new $.perl.Validator()
               .addValidator($.perl.ValidatorRequired)
               .addValidator($.perl.ValidatorInt)
        },
        {
            name: "VersionNumber",
            type: "text",
            label: "Version Number:",
            default: "",
            validator: new $.perl.Validator()
               .addValidator($.perl.ValidatorRequired)
        },
        {
            name: "ChangeDescription",
            type: "textarea",
            label: "Description of Change:",
            default: "",
            validator: new $.perl.Validator()
               .addValidator($.perl.ValidatorRequired)
               .addValidator($.perl.ValidatorMaxLength200)
        },
        {
            name: "Status",
            type: "select",
            label: "Change Note State:",
            source: "ChangeNoteStates",
            default: "99999999-9999-9999-9999-999999999999",
        }
    ]
},
$.perl.EditView);
