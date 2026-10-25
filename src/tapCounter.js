"use strict";

function createTapState() {
  return { taps: 0 };
}

function applyTap(state) {
  return { taps: state.taps + 1 };
}

function statusFor(state) {
  if (state.taps === 0) {
    return "Not tapped yet";
  }
  return `Tapped ${state.taps} times`;
}

const tapApi = { createTapState, applyTap, statusFor };

if (typeof module !== "undefined") {
  module.exports = tapApi;
}

if (typeof window !== "undefined") {
  window.SnapPickTap = tapApi;
}
