# EcoGrid AI

**Smart India Hackathon 2026** · Problem Statement **26200** · Theme: *Renewable / Sustainable Energy* · Category: *Software*

EcoGrid AI is an AI-powered renewable energy monitoring and prediction platform. It pulls live weather
data for Kanpur, India from the [Open-Meteo](https://open-meteo.com/) API and turns it into solar and
wind generation estimates, 24-hour forecasts, battery guidance, and sustainability reporting — with a
built-in assistant for quick questions about the domain.

## Project structure

```
ecogrid-ai/
├── frontend/                # React + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/      # layout, ui, charts, dashboard, chatbot, team, home
│   │   ├── hooks/            # useLiveData.ts, useChat.ts
│   │   ├── pages/            # Home, Dashboard, AIPrediction, Reports, Team
│   │   ├── utils/             # constants.ts, energyCalculations.ts
│   │   ├── context/           # ThemeContext.tsx (dark / light mode)
│   │   └── types/
│   └── ...
└── server/                  # FastAPI backend
    ├── main.py               # POST /api/chat via Google Gemini 2.5 Flash
    ├── requirements.txt
    └── .env.example
```

## Getting started

### 1. Backend (FastAPI)

```bash
cd server
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # then add your GEMINI_API_KEY
uvicorn main:app --reload --port 8000
```

The API key is read from the environment only and is never sent to, or exposed by, the frontend.

### 2. Frontend (Vite + React)

```bash
cd frontend
npm install
cp .env.example .env             # defaults already point at localhost:8000
npm run dev
```

Visit `http://localhost:5173`. The Vite dev server proxies `/api/*` requests to the FastAPI backend
at `http://localhost:8000`, so the chatbot works out of the box once both servers are running.

### 3. Production build

```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # serve the production build locally
```

Deploy `frontend/dist` as a static site and the `server/` app as a standard ASGI service (e.g. behind
Uvicorn/Gunicorn). Update `VITE_API_BASE_URL` and `FRONTEND_ORIGIN` for your deployed domains.

## Data & assumptions

- **Live weather** (temperature, wind speed, cloud cover, humidity, pressure) comes directly from
  Open-Meteo for Kanpur (26.4499° N, 80.3319° E) and refreshes every 60 seconds.
- **Solar output, wind potential, battery SOC, and CO2 avoided** are derived estimates calculated from
  that weather data against a declared reference system (5 kW solar array, 3 kW turbine, 10 kWh battery,
  18 kWh/day load — see `frontend/src/utils/constants.ts`). They are clearly presented as modelled
  figures, not metered hardware output, since no physical plant is connected in this prototype.
- The India grid emission factor used for CO2 calculations (0.82 kg CO2/kWh) is an illustrative,
  commonly cited baseline and can be swapped for a site-specific figure in `constants.ts`.

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion, React Router, lucide-react
- **Backend:** FastAPI, Google Gemini 2.5 Flash (`google-generativeai`), Uvicorn
- **Data source:** Open-Meteo Forecast API (no API key required)

## Team

Built by Team EcoGrid AI — see the in-app **Team** page for full member details.
