import slotEngine from "../slotEngine";

describe("Slot Engine", () => {
  it("should recommend a slot matching the preferred time window", () => {
    const req = { body: { storeId: "store-1", preference: "morning" } } as any;
    const res: any = { json: jest.fn() };

    slotEngine(req, res);

    expect(res.json).toHaveBeenCalled();
    const slot = res.json.mock.calls[0][0].slot;
    expect(slot.preference).toBe("morning");
  });

  it("should fall back to any available slot when no preference matches", () => {
    const req = { body: { storeId: "store-1", preference: "evening" } } as any;
    const res: any = { json: jest.fn() };

    slotEngine(req, res);

    expect(res.json).toHaveBeenCalled();
    const slot = res.json.mock.calls[0][0].slot;
    expect(typeof slot.start).toBe("string");
  });
});