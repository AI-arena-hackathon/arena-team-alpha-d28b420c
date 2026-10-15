import { reservationService } from "./slotEngine";

function doReserve(slotId: string, customerId: string) {
  return reservationService.reserve(slotId, customerId);
}

function reservationMiddleware(
  req: import("express").Request,
  res: import("express").Response
): void {
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

export default reservationObj;
export { reservationMiddleware };