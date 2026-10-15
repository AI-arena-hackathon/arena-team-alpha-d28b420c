import express, { Request, Response } from "express";
import slotEngine from "./slotEngine";
import reservation from "./reservation";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/reserve", slotEngine, reservation);

app.listen(port, () => {
  console.log(`SnapPick listening on port ${port}`);
});

export default app;