var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetsById = findWidgetsById;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reOrderWidget = reOrderWidget;

module.exports = widgetModel;

var pageModel = require("../models/page.model.server");

function createWidget(pageId, widget) {
    widget._page = pageId;
    // return widgetModel.create(widget);
    var widgetTmp = null;
    return widgetModel.create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id);
        })
        .then(function (pageDoc) {
            return widgetTmp;
        });
}

function findWidgetsByPageId(pageId) {
    // return widgetModel.find({_page: pageId});
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            return page.widgets;
        });
}

function findWidgetsById(widgetId) {
    return widgetModel.findById({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        });
}

function reOrderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var _widget = page.widgets.splice(start, 1)[0];
            page.widgets.splice(end, 0, _widget);
            return page.save();
        });
}