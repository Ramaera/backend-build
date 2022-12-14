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
exports.AuthService = void 0;
const nestjs_prisma_1 = require("nestjs-prisma");
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const password_service_1 = require("./password.service");
let AuthService = class AuthService {
    constructor(jwtService, prisma, passwordService, configService) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.passwordService = passwordService;
        this.configService = configService;
    }
    async createUser(payload) {
        const hashedPassword = await this.passwordService.hashPassword(payload.password);
        try {
            const rm_id = `RM-${(Math.random() + 1)
                .toString(36)
                .substring(7)
                .toLocaleUpperCase()}`;
            const user = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, payload), { password: hashedPassword, pw_id: payload.pw_id.toUpperCase(), rm_id, role: 'USER', membership: payload.membership }),
            });
            return this.generateTokens({
                userId: user.id,
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002') {
                let problemField = e.meta.target[0];
                if (problemField === 'pw_id') {
                    problemField = `PlanetWay Id ${payload.pw_id}`;
                }
                throw new common_1.ConflictException(`${problemField} already used.`);
            }
            throw new Error(e);
        }
    }
    async passwordresetRequest(pw_id) {
        const user = await this.prisma.user.findUnique({ where: { pw_id } });
        if (!user) {
            throw new common_1.NotFoundException(`No user found for PW_Id: ${pw_id}`);
        }
        return this.generateTokens({
            userId: user.id,
        });
    }
    async login(pw_id, password) {
        const user = await this.prisma.user.findUnique({ where: { pw_id } });
        if (!user) {
            throw new common_1.NotFoundException(`No user found for PW_Id: ${pw_id}`);
        }
        const passwordValid = await this.passwordService.validatePassword(password, user.password);
        if (!passwordValid) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return this.generateTokens({
            userId: user.id,
        });
    }
    validateUser(userId) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
    getUserFromToken(token) {
        const id = this.jwtService.decode(token)['userId'];
        return this.prisma.user.findUnique({ where: { id } });
    }
    generateTokens(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload);
    }
    generateRefreshToken(payload) {
        const securityConfig = this.configService.get('security');
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: securityConfig.refreshIn,
        });
    }
    refreshToken(token) {
        try {
            const { userId } = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            return this.generateTokens({
                userId,
            });
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async forgetPasswordWithPrivateKey(payload) {
        const hashedPassword = await this.passwordService.hashPassword(payload.newPassword);
        const user = await this.prisma.user.findFirst({
            where: {
                private_key: {
                    equals: payload.private_key,
                    mode: "insensitive"
                }
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`No user found`);
        }
        await this.prisma.user.update({
            data: {
                password: hashedPassword,
            },
            where: {
                id: user.id,
            },
        });
        return { message: "success" };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        nestjs_prisma_1.PrismaService,
        password_service_1.PasswordService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map