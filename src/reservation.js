"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationMiddleware = reservationMiddleware;
const slotEngine_1 = require("./slotEngine");
function doReserve(slotId, customerId) {
    return slotEngine_1.reservationService.reserve(slotId, customerId);
}
function reservationMiddleware(req, res) {
    const { slotId, customerId } = req.body;
    if (!slotId || !customerId) {
        res.status(400).json({ error: "slotId and customerId are required" });
        return;
    }
    const result = doReserve(slotId, customerId);
    if (result.exists) {
        res.json({
            confirmed: true,
            slotId,
            customerId,
            message: "Slot already reserved (idempotent)",
        });
        return;
    }
    res.json({
        confirmed: true,
        slotId,
        customerId,
        message: "Slot reserved successfully",
    });
}
const reservationObj = Object.defineProperty(reservationMiddleware, "reserve", {
    get: () => doReserve,
    enumerable: true,
    configurable: true,
});
exports.default = reservationObj;
//# sourceMappingURL=reservation.js.map