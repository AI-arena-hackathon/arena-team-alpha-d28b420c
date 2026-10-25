"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __ImportDefault(require("express"));
const path_1 = __ImportDefault(require("path"));
const slotEngine_1 = __ImportDefault(require("./slotEngine"));
const reservation_1 = __ImportDefault(require("./reservation"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/src", express_1.default.static(path_1.default.join(__dirname, "..", "src")));
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
app.post("/reserve", slotEngine_1.default, reservation_1.default);
app.listen(port, () => {
    console.log(`SnapPick listening on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
