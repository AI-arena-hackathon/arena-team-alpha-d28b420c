import reservation from "../reservation";

describe("Reservation Service", () => {
  it("should be idempotent - reserving same slot twice returns exists=true", () => {
    const result1 = (reservation as any).reserve("slot-1", "customer-1");
    const result2 = (reservation as any).reserve("slot-1", "customer-2");

    expect(result1.exists).toBe(false);
    expect(result2.exists).toBe(true);
  });

  it("should allow different slots for different customers", () => {
    const result1 = (reservation as any).reserve("slot-2", "customer-1");
    const result2 = (reservation as any).reserve("slot-3", "customer-2");

    expect(result1.exists).toBe(false);
    expect(result2.exists).toBe(false);
  });
});