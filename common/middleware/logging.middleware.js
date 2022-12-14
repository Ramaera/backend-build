"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
function loggingMiddleware(logger = console) {
    return async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();
        logger.log(`Prisma Query ${params.model}.${params.action} took ${after - before}ms`);
        return result;
    };
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging.middleware.js.map