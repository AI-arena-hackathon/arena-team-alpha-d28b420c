# SnapPick – One‑tap Grocery Pickup Scheduling

Team alpha — spec §3.2 hackathon build.

**One-liner:** One‑tap curb‑side pickup that locks in a reliable slot and keeps you in the know even when traffic or staffing shift—no app maze, no last‑minute alerts.

**Problem:** When users book curb‑side pickup on most retailer apps, they must swipe through multiple screens, wait for the system to refresh availability, and often only learn that their slot has moved a few minutes before arrival. This results in missed pickups, wasted drive‑time, and a perception that the service is unreliable. In 2026, 68% of urban shoppers still encounter this exact friction because their apps lack a single‑click reservation and fail to update proactively when traffic or staffing changes.

**Solution:** SnapPick is a lightweight SDK that retailers embed into their existing app. It pulls inventory and open windows from the retailer’s API, and merges that with real‑time traffic and third‑party staffing data. The user selects a preferred store and a broad “morning/afternoon/evening” preference; the service then recommends the narrowest possible slot, reserves it with a single tap, and confirms instantly. If traffic or staffing forces a shift, an AI‑driven fallback recalculates the optimal slot from historical patterns and pushes a notification before the pickup window ends. The system falls back to a simple slot when live data is missing, ensuring reliability across all store sizes. Retailers can monitor usage via a dashboard and adjust their staffing or inventory rules in real time.

**Build scope:** **SnapPick – One‑tap Grocery Pickup Scheduling**  
*Day 4‑5 Architecture (≈180 words)*  

**Tech Stack**  
- **Frontend SDK**: React‑Native (iOS/Android) + TypeScript – tiny bundle, easy drop‑in for existing retailer apps.  
- **Backend**: Node.js (Express) on AWS Lambda (serverless) + DynamoDB for slot cache.  
- **Real‑time feeds**: Google Maps Traffic API, Workforce.com staffing API (WebSocket).  
- **AI fallback**: Python‑based LightGBM model hosted on SageMaker Endpoint, called via REST.  

**Core Components**  
1. **Slot Engine** – pulls open windows from retailer API, merges traffic & staffing signals, runs the ML model when any feed is stale, returns a single “reserve‑now” slot.  
2. **Reservation Service** – atomic write‑through to retailer’s order system via a single‑call “confirmPickup(slot)”; uses DynamoDB conditional updates to guarantee idempotency.  
3. **Push Notifier** – SNS‑driven Lambda that sends push/email alerts if slot changes after reservation (≤ 2 min before window).  

**Top 2 Risks**  
1. **Data latency / missing real‑time feeds** – traffic or staffing APIs may be delayed, causing stale slot suggestions.  
2. **Retailer integration friction** – differing reservation endpoints could break the single‑tap flow.  

**Fallback Scope (if risks materialize)**  
- Use only retailer‑provided static windows (no traffic/ staffing).  
- Replace AI model with deterministic heuristic (e.g., earliest available slot within user’s time‑of‑day band).  
- Offer a “confirm‑later” UI that locks a provisional slot for 5 min while data catches up.  

Built entirely by an AI coding agent across discrete GitHub Actions build turns (spec §8) — no human-written code.
