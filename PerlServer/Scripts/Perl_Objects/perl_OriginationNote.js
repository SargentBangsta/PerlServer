$.perl.define("OriginationNote", {
    dataSourceURL: "OriginationNote/getById?OriginationNoteId=",
    dataSaveURL: "OriginationNote/Save",
    nodeText: function () {
        return (this.data) ? this.data.OriginationNoteNumber  + " : " + this.data.DocumentName : "New Code";
    },
    id: function () {
        return (this.data) ? this.data.OriginationNoteId : "99999999-9999-9999-9999-999999999999";
    }
})
.extend("changeNotes", function () {
    return $.perl.getChangeNote("99999999-9999-9999-9999-999999999999");
})
.views
    .addView('edit', {
        headerText: "Editor: Origination Note ",
        fields: [
            {
                name: "OriginationNoteId",
                type: "hidden",
                label: "",
                default: "99999999-9999-9999-9999-999999999999"
            },
            {
                name: "OriginationNoteNumber",
                type: "text",
                label: "Origination Note # :",
                default: "-1",
                validator: new $.perl.Validator()
                   .addValidator($.perl.ValidatorRequired)
                   .addValidator($.perl.ValidatorInt)
            },
            {
                name: "RevisionNumber",
                type: "text",
                label: "Revision # :",
                default: "-1",
                validator: new $.perl.Validator()
                   .addValidator($.perl.ValidatorRequired)
                   .addValidator($.perl.ValidatorInt)
            },
            {
                name: "DocumentName",
                type: "text",
                label: "Document Name :",
                default: "new Doc",
                validator: new $.perl.Validator()
                   .addValidator($.perl.ValidatorRequired)
                   .addValidator($.perl.ValidatorMaxLength50)
            },
            {
                name: "DocumentDescription",
                type: "textarea",
                label: "Document Description :",
                default: "Description of new Doc",
                validator: new $.perl.Validator()
                   .addValidator($.perl.ValidatorRequired)
                   .addValidator($.perl.ValidatorMaxLength500)
            }
        ]
    },
    $.perl.EditView)
.addView(
    'tabView',
    {
        tabs: [
            {
                tabText: "Properties",
                context : "",
                viewName: 'edit'
            },
            {
                tabText: "Change Notes",
                context: "changeNotes",
                viewName: 'edit'
            }

        ]
    },
    $.perl.TabView);



$.perl.define("OriginationNotes", {
    dataSourceURL: "OriginationNote/getAll",
    childType: "OriginationNote"
})
.views.addView("listEdit", {
    headerText: "List Editor: Origination Notes",
    editViewName: "tabView",
},
$.perl.ListView);
