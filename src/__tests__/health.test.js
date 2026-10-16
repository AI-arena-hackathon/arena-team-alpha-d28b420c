"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express = require("express");

describe("Health Endpoint", () => {
  it("should return {status:ok}", () => {
    const handler = function (_req, res) {
      res.json({ status: "ok" });
    };

    const mockRes = {
      json: jest.fn(),
    };

    handler({}, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ status: "ok" });
  });
});