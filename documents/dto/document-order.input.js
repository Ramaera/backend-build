"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentOrder = exports.DocumentOrderField = void 0;
const eager_import_0 = require("./document-order.input");
const graphql_1 = require("@nestjs/graphql");
const order_1 = require("../../common/order/order");
var DocumentOrderField;
(function (DocumentOrderField) {
    DocumentOrderField["id"] = "id";
    DocumentOrderField["createdAt"] = "createdAt";
    DocumentOrderField["updatedAt"] = "updatedAt";
    DocumentOrderField["published"] = "published";
    DocumentOrderField["title"] = "title";
    DocumentOrderField["url"] = "url";
})(DocumentOrderField = exports.DocumentOrderField || (exports.DocumentOrderField = {}));
(0, graphql_1.registerEnumType)(DocumentOrderField, {
    name: 'DocumentOrderField',
    description: 'Properties by which document connections can be ordered.',
});
let DocumentOrder = class DocumentOrder extends order_1.Order {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => require("./document-order.input").DocumentOrderField } };
    }
};
DocumentOrder = __decorate([
    (0, graphql_1.InputType)()
], DocumentOrder);
exports.DocumentOrder = DocumentOrder;
//# sourceMappingURL=document-order.input.js.map