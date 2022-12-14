"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
require("reflect-metadata");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const base_model_1 = require("../../common/models/base.model");
const client_1 = require("@prisma/client");
const document_models_1 = require("../../documents/models/document.models");
(0, graphql_1.registerEnumType)(client_1.Role, {
    name: 'Role',
    description: 'User role',
});
(0, graphql_1.registerEnumType)(client_1.KYC, {
    name: 'KYC',
    description: 'User KYC Status',
});
(0, graphql_1.registerEnumType)(client_1.Membership, {
    name: 'Membership',
    description: 'User Membership Type',
});
let User = class User extends base_model_1.BaseModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.Role, {}),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "rm_id", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {}),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {}),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "father_or_husband_name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mobile_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "alternate_mobile_number", void 0);
__decorate([
    (0, graphql_1.Field)(() => document_models_1.DocumentModal, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "documents", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.KYC, {}),
    __metadata("design:type", String)
], User.prototype, "kyc", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "date_of_birth", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "demat_account", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "private_key", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "pw_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.Membership, {}),
    __metadata("design:type", String)
], User.prototype, "membership", void 0);
User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map