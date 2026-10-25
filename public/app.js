"use strict";

(function () {
  var state = window.SnapPickTap.createTapState();
  var button = document.getElementById("tap-button");
  var status = document.getElementById("tap-status");

  function render() {
    status.textContent = window.SnapPickTap.statusFor(state);
    button.textContent = state.taps > 0 ? "Tap again" : "Tap me";
  }

  button.addEventListener("click", function () {
    state = window.SnapPickTap.applyTap(state);
    render();
  });

  render();
})();
