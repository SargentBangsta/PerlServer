

(function ($) {
    $.extend(new Perl())
    function Perl() {

        this.perl = new Entities();
        function Entities() {
            var constructors = {};
            this.define = function (entityName, options) {
                //ctor.prototype = new PerlObject(options);
                //function ctor(options) {    
                //}
                constructors[entityName] = new PerlObject(options);
                this['get' + entityName] = function (arg) {
                    return new constructors[entityName](arg);
                }
                return constructors[entityName].prototype;
            }


            this.dockCtrls = dock;
            this.Validator = function () {
                var self = this;
                var validators = [];
                this.addValidator = function (validator) {
                    validators.push(validator);
                    return self;
                };
                this.validate = function (value) {
                    var result = {
                        isValid: true,
                        message: ""
                    };
                    for (idx = 0; idx < validators.length; idx++) {
                        x = validators[idx].validate(value);
                        if (!x.isValid) {
                            result.isValid = false;
                            result.message = result.message + x.message + "</br>";
                        }
                    }
                    return result;
                }
                return self;
            };
            /*********************************** Validators***************************************/
            this.ValidatorRequired = new PerlValidator(function (value) {
                return (value.length > 0)
            }, "* Required");
            this.ValidatorMaxLength10 = new PerlValidator(function (value) {
                return (value.length <= 10)
            }, "* Maximum Length 10");
            this.ValidatorMaxLength50 = new PerlValidator(function (value) {
                return (value.length <= 50)
            }, "* Maximum Length 50");
            this.ValidatorMaxLength200 = new PerlValidator(function (value) {
                return (value.length <= 200)
            }, "* Maximum Length 200");
            this.ValidatorMaxLength500 = new PerlValidator(function (value) {
                return (value.length <= 500)
            }, "* Maximum Length 500");
            this.ValidatorPosInt = new PerlValidator(function (value) {
                var reg = /^\d+$/;
                return reg.test(value);
            }, "* Positive Integer Required");
            this.ValidatorInt = new PerlValidator(function (value) {
                var reg = /^(\+|-)?\d+$/;
                return reg.test(value);
            }, "* Signed or Unsigned Integer Required");


            /*********************************** Validators***************************************/
            this.EditView = EditView;
            this.ListView = ListView;
            this.TabView = TabView;
        }

        function PerlOptions(options) {
            $.extend(this, options);
            this.option = function (optionName) {
                return this[optionName];
            }
            this.extend = function (options) {
                $.extend(this, options);
            }
        }

        function PerlButton(container, options) {
            container = (container) ? container : $(document.body);
            options = (options) ? options : {};
            var self = this;
            var settings = new PerlOptions({
                clickHandler: function (e) {
                    alert("button clicked");
                },
                clickHandlerContext: self,
                className: "perl-button ui-corner-all",
                text: "text",
                toolTip: "toolTip"
            });
            settings.extend(options);
            var button = $(document.createElement("button"));
            button
                .addClass(settings.className)
                .html(settings.text)
                .attr({ title: settings.toolTip })
            container.append(button);
            this.setClickHandler = function (handler, context) {
                button.off("click");
                button.on("click", $.proxy(handler, context));
            };
        }

        function createDiv(className) {
            return $(document.createElement("div"))
            .addClass(className);
        }
        function createSpan(className) {
            return $(document.createElement("span"))
            .addClass(className);
        }
        function createInput(className) {
            return $(document.createElement("input"))
            .addClass(className)
        }

        function dock() {
            $(".perl-scrollable").each(function (i, d) {
                siteHeight = $(d.parentElement).innerHeight();
                $(d).height(siteHeight);
            });
            $(".perl-resizable").each(function (i, d) {
                siteHeight = $(d).parents(".perl-scrollable").innerHeight();
                childHeight = 0;
                $(d).parents(".perl-scrollable").first().children(".perl-fill").each(function (i, s) {
                    childHeight = childHeight + $(s).outerHeight() + 1;
                });
                scrollHeight = siteHeight - childHeight;
                $(d).height(scrollHeight);
            });
            $(".perl-right-column").each(function (i, d) {
                siteWidth = $(d.parentElement.parentElement.parentElement.parentElement).innerWidth()
                $(d).siblings(".perl-left-column").each(function (i, s) {
                    $(d).width(siteWidth - $(s).outerWidth() - 6);
                });
            });
            $(".perl-float-center").each(function (i, fic) {
                fic = $(fic);
                parentHeight = fic.parent().height();
                parentWidth = fic.parent().width();
                fic.css({
                    top: ((parentHeight - fic.outerHeight()) / 2),
                    left: ((parentWidth - fic.outerWidth()) / 2)
                });
            });
        }

        function PerlValidator(validator, message) {
            var func = validator;
            var msg = message;
            var isValid = true;
            this.validate = function (value) {
                isValid = func(value);
                return {
                    isValid: isValid,
                    message: (isValid) ? "" : msg
                }
            }
            return this;
        }

        function Field(options) {
            var self = this;
            var settings = new PerlOptions({
                name: "fieldName",
                type: "inputType",
                label: "Label:",
                cols: 50,
                rows: 4,
                source: "",
                default: "defaultValue",
                validator: null
            });
            settings.extend(options);
            var fieldRow = $(document.createElement("tr"));
            var labelCell = $(document.createElement("td"));
            var valueCell = $(document.createElement("td"));
            var label = createSpan("perl-field-label")
                .html(settings.label);
            var messageLabel = createSpan("perl-message-error")
            var input;
            switch (settings.type) {
                case "select":
                    input = $.perl["get" + settings.source]()
                        .getSelect();
                    break;
                case "readonly":
                    input = $("<label class='perl-field-input perl-read-only'>");
                    break;
                case "textarea":
                    input = $("<textarea class='perl-field-input'>")
                        .attr({
                            cols: settings.cols,
                            rows: settings.rows
                        });
                    break;
                default:
                    input = createInput("perl-field-input")
                        .attr({
                            type: settings.type
                        });
                    break;
            }
            fieldRow
                .append(labelCell)
                .append(valueCell);
            labelCell.append(label);
            valueCell
                .append(messageLabel)
                .append(input);
            this.valid = true;
            this.validate = function () {
                if (settings.validator) {
                    validation = settings.validator.validate(self.getValue());
                    self.valid = validation.isValid;
                    messageLabel.html(validation.message);
                    if (!self.valid) {
                        input.focus();
                    }
                }
                else {
                    self.valid = true;
                }
                return self.valid;

            }
            this.getValue = function () {
                return input.attr("value");
            }
            this.render = function (site, data) {
                //                if (settings.validator) {
                input.bind("blur", this.validate);
                //                }
                var value = (isDefined(data[settings.name])) ? (data[settings.name]) : settings.default;
                switch (settings.type) {
                    case "readonly":
                        input.html(value);
                        break
                    default: input.attr({ value: value });
                        break;
                }
                site.append(fieldRow);
                return self;
            }
            this.toString = function () {
                return settings.name + "=" + self.getValue();
            }
        }
        function PerlFields(fieldDefs) {
            var fields = [];
            var fieldTable = $(document.createElement('table'))
                .addClass("perl-float-center");
            for (var idx = 0; idx < fieldDefs.length; idx++) {
                fields.push(new Field(fieldDefs[idx]));
            }
            this.render = function (documentSite, data) {
                for (var idx = 0; idx < fieldDefs.length; idx++) {
                    fields[idx].render(fieldTable, data);
                }
                documentSite.append(fieldTable);
            }
            this.validate = function () {
                this.valid = true;
                for (var idx = 0; idx < fieldDefs.length; idx++) {
                    this.valid = (fields[idx].validate()) ? this.valid : false;
                }
                return this.valid;
            }
            this.toString = function () {
                var s = "?";
                for (var idx = 0; idx < fieldDefs.length; idx++) {
                    x = fields[idx].toString();
                    y = (idx < fieldDefs.length - 1) ? "&" : "";
                    s = s + x + y;
                }
                return s;
            }
        }
        function EditView(context, options) {
            var parent = context;
            options = (options) ? options : {};
            var settings = new PerlOptions({
                siteClassName: "perl-scrollable",
                headerClassName: "perl-fill perl-header ui-widget-header ui-corner-all",
                bodyClassName: "perl-resizable ui-widget-content ui-corner-all",
                footerClassName: "perl-fill perl-footer ui-widget-header ui-corner-all",
                headerText: "Header Text",
                fields: []
            });
            settings.extend(options);
            var documentSite;
            var fieldData;
            var fields = new PerlFields(settings.fields);
            site = createDiv(settings.siteClassName);
            header = createDiv(settings.headerClassName)
                            .html(settings.headerText);
            body = createDiv(settings.bodyClassName);
            fields = new PerlFields(settings.fields);
            footer = createDiv(settings.footerClassName);

            site.append(header)
                .append(body)
                .append(footer);

            saveButton = new PerlButton(footer, {
                text: "save",
                toolTip: "click to save"
            });
            this.render = function (container, perlObj) {

                documentSite = (container) ? container : (documentSite) ? documentSite : $(document.body);
                documentSite.empty();
                site.hide();
                documentSite.append(site);
                dock(documentSite);
                site.show("slow", function () {
                    fieldData = (perlObj.data) ? perlObj.data : (fieldData) ? fieldData : {};
                    fields.render(body, fieldData);
                    saveButton.setClickHandler(function () {
                        if (fields.validate()) {
                            perlObj.save(fields.toString(), perlObj, perlObj.renderView, [container, "edit"]);
                        }
                    }, perlObj);
                    dock(documentSite);
                });
            }
        }
        function isDefined(data) {
            var result = true;
            if (data == null) {
                result = false;
            }
            if (data == "00000000-0000-0000-0000-000000000000") {
                result = false;
            }
            return result;
        }
        function ListView(context, options) {
            var parent = context;
            options = (options) ? options : {};
            var settings = new PerlOptions({
                siteClassName: "perl-scrollable ui-widget-content ui-corner-all",
                headerClassName: "perl-fill perl-header ui-widget-header ui-corner-all",
                leftColumnClassName: "perl-left-column ui-widget-content ui-corner-all perl-resizable",
                rightColumnClassName: "perl-right-column perl-resizable",
                footerClassName: "perl-fill perl-footer ui-widget-header ui-corner-all",
                editViewName: "edit",
                onListItemClick: function (e) {
                    if (rightColumn.children(".perl-scrollable").length > 0) {
                        var proxy = this;
                        rightColumn.children(".perl-scrollable").hide("slow", function () {
                            proxy.renderView(rightColumn, settings.editViewName);
                        });
                    }
                    else {
                        this.renderView(rightColumn, settings.editViewName);
                    }
                },
                headerText: "Header Text",
                addNewButtonText: "Add New"
            });
            settings.extend(options);
            var site = createDiv(settings.siteClassName);
            var header = createDiv(settings.headerClassName)
                            .html(settings.headerText);
            var body = createDiv(settings.bodyClassName)
            var table = $(document.createElement("table"));
            var row = $(document.createElement("tr"));

            var leftColumn = $(document.createElement("td"))
                        .addClass(settings.leftColumnClassName);
            var rightColumn = $(document.createElement("td"))
                        .addClass(settings.rightColumnClassName);
            row.append(leftColumn)
                .append(rightColumn);
            table.append(row);
            footer = createDiv(settings.footerClassName);
            //var list = $(document.createElement("ol"))
            //            .addClass("perl-ordered-list");
            //leftColumn.append(list);

            site.append(header)
                .append(table)
                .append(footer);

            var getNewButton = new PerlButton(footer, {
                text: settings.addNewButtonText,
                toolTip: "Click to create a new entity"
            });
            this.render = function (container, parent) {
                if (!this.currentItem) {
                    this.currentItem = (parent.Items.length > 0) ? parent.Items[0] : parent.newItem();
                }
                documentSite = (container) ? container : (documentSite) ? documentSite : $(document.body);
                site.hide();
                documentSite.append(site);
                dock(documentSite);
                parent.renderList(leftColumn, settings.onListItemClick);
                var proxy = this;
                site.show("slow", function () {
                    proxy.currentItem.listItem.click();
                    getNewButton.setClickHandler(function () {
                        proxy.currentItem = parent.getNew();
                        proxy.currentItem.renderListItem(parent.list, settings.onListItemClick);
                        settings.onListItemClick.call(proxy.currentItem);
                    }, parent);
                });
            }
        }

        function TabView(context, options) {
            var parent = context;
            options = (options) ? options : {};
            var settings = new PerlOptions({
                tabs: []
            });
            settings.extend(options);


            this.tabs = [];
            for(var i = 0; i < settings.tabs.length; i++) {
                this.tabs.push(new Tab(this, settings.tabs[i]));
            }
            this.setSelectedTab = function (tab) {
                this.tabRow.children().removeClass("perl-tab-selected");
                this.selectedTab = tab;
                proxy = tab;
                this.tabWindow.children(".perl-scrollable").hide("slow", function () {
                });
                proxy.select();
            }

            function Tab(tabView, options) {
                options = (options) ? options : {};
                var parent = tabView;
                var settings = new PerlOptions({
                    tabText: "Tab 1",
                    context: "",
                    viewName: "edit"
                });
                settings.extend(options);
                this.tab = $("<td class='perl-tab ui-widget-content ui-corner-top'>");
                this.tab.bind("click", this, function (e) {
                    parent.setSelectedTab(e.data);
                });
                this.select = function () {
                    context = this.parentContext;
                    if (settings.context != "") {
                        context = this.parentContext[settings.context].call(this.parentContext);
                    }
                    this.tab.addClass("perl-tab-selected");
                    context.renderView(parent.tabWindow, settings.viewName);
                }
                this.render = function (tabSite, parentContext) {
                    this.parentContext = parentContext;
                    this.tab.html(settings.tabText);
                    tabSite.append(this.tab);
                }
            }

            this.render = function (target, context) {
                this.target = (target) ? target : this.target;
                this.context = (context) ? context : this.context;
                //RenderContainer
                this.site = (this.site) ? this.site : $("<div class='perl-tab perl-scrollable'>");
                this.tabTable = (this.tabTable) ? this.tabTable : $("<table class='perl-tab-table perl-fill'>");
                this.tabRow = (this.tabRow) ? this.tabRow : $("<tr class='perl-tab-row'>");
                this.tabWindow = (this.tabWindow) ? this.tabWindow : $("<div class='perl-tab-window perl-resizable'>");

                this.site.append(this.tabTable);
                this.tabTable.append(this.tabRow);
                this.site.append(this.tabWindow);
                for (var i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].render(this.tabRow, this.context);
                }
                this.target.append(this.site);
                this.site.hide();
                dock();
                var proxy = this;
                $(this.tabWindow).children().hide();
                this.site.show("fast", function () {
                    dock();
                    proxy.setSelectedTab(proxy.tabs[0]);
                });
            }
        }


        function Views() {
            this.addView = function (viewName, options, ctor) {
                this[viewName] = {
                    Options: options,
                    constructor: ctor,
                    render: function (target, context) {
                        if (!this.view) {
                            this.view = new this.constructor(context, this.Options);
                        }
                        this.view.render(target, context);
                    }
                };
                return this;
            };
            this.render = function (target, viewName, context) {
                this[viewName].render(target, context);
                return this[viewName];
            }
        }
        function ChildEntities(parent) {
            proto = parent;
            this.defineChild = function (childPropertyName, propGetter, argumentGetter) {
                this[childPropertyName] = new ChildEntity(proto, propGetter, argumentGetter);
            };
        }


        function PerlObject(options) {
            options = (options) ? options : {};
            this.initialised = false;
            var onInit = function (args) {
            };
            var settings = new PerlOptions({
                dataSourceURL: "",
                dataSaveURL: "",
                nodeText: "node text",
                children: []
            });
            settings.extend(options);
            this.views = new Views();
            this.save = function (params, context, callback, callbackArgs) {
                initialised = false;
                saveURL = settings.dataSaveURL + params;
                var proxy = this;
                $.getJSON(saveURL, function (data) {
                    proxy.constructor(data);
                    if (callback) {
                        callback.apply(context, callbackArgs);
                    }
                });
            }

            this.initItem = function (data) {
                this.data = data;
                if (this.listItem) {
                    this.listItem
                    .html(($.isFunction(settings.nodeText)) ? settings.nodeText.call(this) : settings.nodeText)
                }
                this.initialised = true;
            }
            this.initCollection = function (data) {
                this.Items = (this.Items) ? this.Items : [];
                this.data = data;
                for (idx = 0; idx < data.length; idx++) {
                    this.Items.push(new $.perl["get" + settings.childType](data[idx]));
                }
                this.initialised = true;
                this.getNew = function () {
                    return new $.perl["get" + settings.childType]("99999999-9999-9999-9999-999999999999");
                };
            }
            this.load = function (loadArgument, context, callback, callbackArgs) {
                this.initialised = false;
                URL = settings.dataSourceURL + loadArgument;
                var proxy = this;
                $.getJSON(URL, function (data) {
                    proxy.constructor(data);
                    if (callback) {
                        callback.apply(context, callbackArgs)
                    }
                });
            }
            this.extend = function(name,value){
                this[name] = value;
                return this;
            }
            this.deferLoad = function (context, callback, argArray) {
                if (!this.initialised) {
                    this.load(this.LoadArgument, context, callback, argArray);
                }
                else {
                    callback.apply(context, argArray);
                }
            }
            this.renderView = function (target, viewName) {
                this.deferLoad(this.views, this.views.render, [target, viewName, this]);
            }
            this.getSelect = function () {
                if (!this.select) {
                    this.select = $("<select class='perl-select'>");
                }
                this.deferLoad(
                   this,
                   function () {
                       for (var idx = 0; idx < this.Items.length; idx++) {
                           this.Items[idx].getSelectOption(this.select);
                       }
                   },
                   []);
                return this.select;
            };

            this.renderSelect = function (target, selectedValue) {
                target.append(this.select);
                this.select.attr(value) = selectedValue;
                return this.select;
            };
            this.getSelectOption = function (target) {
                this.deferLoad(
                    this,
                    function (target) {
                        if (!this.selectOption) {
                            this.selectOption = $("<option class='perl-select-option'>");
                        }
                        this.selectOption
                            .html(($.isFunction(settings.nodeText)) ? settings.nodeText.call(this) : settings.nodeText)
                            .attr("value", settings.id.call(this));
                        target.append(this.selectOption);
                        return this.selectOption;
                    },
                    [target]);
            };
            this.renderList = function (target, onListItemClick) {
                this.deferLoad(
                    this,
                    function (target) {
                        if (!this.list) {
                            this.list = $("<ol class='perl-ordered-list'>");
                        }
                        for (var idx = 0; idx < this.Items.length; idx++) {
                            this.Items[idx].renderListItem(this.list, onListItemClick);
                        }
                        target.append(this.list);
                        return this.list;
                    },
                    [target]);
            };


            this.renderListItem = function (target, onListItemClick) {
                this.deferLoad(
                    this,
                    function (target, onListItemClick) {
                        var proxy = this;
                        function onClick(e) {
                            proxy.listItem.parent().children(".perl-selected").removeClass("perl-selected");
                            proxy.listItem.addClass("perl-selected");
                            onListItemClick.call(proxy);
                        }
                        if (!this.listItem) {
                            this.listItem = $("<li class='perl-list-item'>")
                                .bind("click", onClick);
                        }
                        this.listItem
                            .html(($.isFunction(settings.nodeText)) ? settings.nodeText.call(this) : settings.nodeText);
                        target.append(this.listItem);
                        return this.listItem;
                    },
                    [target, onListItemClick]);
            }

            function ctor(arg) {
                arg = (arg) ? arg : "";
                if ($.isArray(arg)) {
                    this.initCollection(arg);
                }
                else if ($.isPlainObject(arg)) {
                    this.initItem(arg);
                }
                else {
                    this.LoadArgument = arg;
                }
            }
            ctor.prototype = this;
            ctor.prototype.constructor = ctor;
            return ctor;
        }
    }
}(jQuery));