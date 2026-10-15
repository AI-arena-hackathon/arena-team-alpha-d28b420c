"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationService = void 0;
exports.default = slotEngine;
exports.reservation = reservation;
const TRAFFIC_WEIGHT = 0.4;
const STAFFING_WEIGHT = 0.6;
function scoreSlot(slot, trafficScore, staffingScore) {
    const timeScore = slot.preference === "morning" && slot.start.startsWith("08")
        ? 1.0
        : slot.preference === "afternoon" && slot.start.startsWith("13")
            ? 0.9
            : slot.preference === "evening" && slot.start.startsWith("18")
                ? 0.8
                : 0.5;
    return timeScore * (1 - trafficScore * STAFFING_WEIGHT) + staffingScore * timeScore;
}
function slotEngine(req, res) {
    const { storeId, preference } = req.body;
    const windows = [
        { id: "w1", start: "08:00", end: "09:00", isAvailable: true },
        { id: "w2", start: "11:00", end: "12:00", isAvailable: true },
        { id: "w3", start: "14:00", end: "15:00", isAvailable: true },
        { id: "w4", start: "17:00", end: "18:00", isAvailable: false },
    ];
    const availableWindows = windows.filter((w) => w.isAvailable);
    if (availableWindows.length === 0) {
        res.status(400).json({ error: "No available slots at this store" });
        return;
    }
    const slots = availableWindows.map((w) => ({
        id: w.id,
        storeId,
        start: w.start,
        end: w.end,
        preference: preference || "morning",
    }));
    // Deterministic heuristic: pick earliest available slot matching preference
    const prefSlots = slots.filter((s) => s.preference === preference);
    const chosen = prefSlots.length > 0 ? prefSlots[0] : slots[0];
    const trafficScore = 0.1; // stub: would fetch from Google Maps Traffic API
    const staffingScore = 0.05; // stub: would fetch from Workforce.com staffing API
    res.json({
        slot: chosen,
        trafficScore,
        staffingScore,
        note: "Live data feeds stubbed for deterministic testing",
    });
}
function reservation(req, res) {
    const { slotId, customerId } = req.body;
    if (!slotId || !customerId) {
        res.status(400).json({ error: "slotId and customerId are required" });
        return;
    }
    const result = reservationService.reserve(slotId, customerId);
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
const reservationService = (() => {
    const reservations = new Map();
    return {
        reserve(slotId, customerId) {
            if (reservations.has(slotId)) {
                return { exists: true };
            }
            reservations.set(slotId, customerId);
            return { exists: false };
        },
    };
})();
exports.reservationService = reservationService;
//# sourceMappingURL=slotEngine.js.map