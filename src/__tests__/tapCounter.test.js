"use strict";

const { createTapState, applyTap, statusFor } = require("../tapCounter");

describe("Tap Counter", () => {
  it("starts with zero taps and a not-tapped status", () => {
    const state = createTapState();

    expect(state.taps).toBe(0);
    expect(statusFor(state)).toBe("Not tapped yet");
  });

  it("increments the tap count on each tap", () => {
    let state = createTapState();

    state = applyTap(state);
    expect(state.taps).toBe(1);

    state = applyTap(state);
    expect(state.taps).toBe(2);
  });

  it("reports a tapped status after the first tap", () => {
    let state = createTapState();

    state = applyTap(state);

    expect(statusFor(state)).toBe("Tapped 1 times");
  });
});
