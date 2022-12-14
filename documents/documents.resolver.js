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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const document_entity_1 = require("./entities/document.entity");
const createDocument_input_1 = require("./dto/createDocument.input");
const nestjs_prisma_1 = require("nestjs-prisma");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const documents_service_1 = require("./documents.service");
const update_document_1 = require("./dto/update-document");
const user_model_1 = require("../users/models/user.model");
const user_id_args_1 = require("../users/args/user-id.args");
let DocumentsResolver = class DocumentsResolver {
    constructor(documentsService, prisma) {
        this.documentsService = documentsService;
        this.prisma = prisma;
    }
    async createDocument(user, data) {
        const newDocument = this.prisma.document.create({
            data: {
                title: data.title,
                url: data.url,
                userId: user.id
            }
        });
        return newDocument;
    }
    async updateDocument(user, newDocumentData) {
        return this.documentsService.updateDocuments(user.id, newDocumentData);
    }
    myDocuments(id) {
        return this.prisma.user
            .findUnique({ where: { id: id.userId } })
            .documents();
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => document_entity_1.Document),
    __param(0, (0, user_decorator_1.UserEntity)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        createDocument_input_1.CreateDocumentInput]),
    __metadata("design:returntype", Promise)
], DocumentsResolver.prototype, "createDocument", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => document_entity_1.Document),
    __param(0, (0, user_decorator_1.UserEntity)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        update_document_1.UpdateDocumentsInput]),
    __metadata("design:returntype", Promise)
], DocumentsResolver.prototype, "updateDocument", null);
__decorate([
    (0, graphql_1.Query)(() => [document_entity_1.Document]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_args_1.UserIdArgs]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "myDocuments", null);
DocumentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => document_entity_1.Document),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService,
        nestjs_prisma_1.PrismaService])
], DocumentsResolver);
exports.DocumentsResolver = DocumentsResolver;
//# sourceMappingURL=documents.resolver.js.map