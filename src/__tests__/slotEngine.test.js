"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slotEngine_1 = __importDefault(require("../slotEngine"));
describe("Slot Engine", () => {
    it("should recommend a slot matching the preferred time window", () => {
        const req = { body: { storeId: "store-1", preference: "morning" } };
        const res = { json: jest.fn() };
        (0, slotEngine_1.default)(req, res);
        expect(res.json).toHaveBeenCalled();
        const slot = res.json.mock.calls[0][0].slot;
        expect(slot.preference).toBe("morning");
    });
    it("should fall back to any available slot when no preference matches", () => {
        const req = { body: { storeId: "store-1", preference: "evening" } };
        const res = { json: jest.fn() };
        (0, slotEngine_1.default)(req, res);
        expect(res.json).toHaveBeenCalled();
        const slot = res.json.mock.calls[0][0].slot;
        expect(typeof slot.start).toBe("string");
    });
});
//# sourceMappingURL=slotEngine.test.js.map