"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_1 = __importDefault(require("../reservation"));
describe("Reservation Service", () => {
    it("should be idempotent - reserving same slot twice returns exists=true", () => {
        const result1 = reservation_1.default.reserve("slot-1", "customer-1");
        const result2 = reservation_1.default.reserve("slot-1", "customer-2");
        expect(result1.exists).toBe(false);
        expect(result2.exists).toBe(true);
    });
    it("should allow different slots for different customers", () => {
        const result1 = reservation_1.default.reserve("slot-2", "customer-1");
        const result2 = reservation_1.default.reserve("slot-3", "customer-2");
        expect(result1.exists).toBe(false);
        expect(result2.exists).toBe(false);
    });
});
//# sourceMappingURL=reservation.test.js.map