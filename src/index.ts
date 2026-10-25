import express, { Request, Response } from "express";
import path from "path";
import slotEngine from "./slotEngine";
import reservation from "./reservation";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/src", express.static(path.join(__dirname, "..", "src")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.post("/reserve", slotEngine, reservation);

app.listen(port, () => {
  console.log(`SnapPick listening on port ${port}`);
});

export default app;
