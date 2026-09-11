# EcoGrid AI

## Overview
EcoGrid AI is a web application designed to promote renewable and sustainable energy solutions through the use of artificial intelligence. This project aims to provide real-time data, predictive analytics, and sustainability reports to empower users in making informed decisions about energy consumption and generation.

## Problem Statement
The project addresses the need for efficient energy management and awareness of renewable energy sources, particularly in the context of Smart India Hackathon 2026.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI
- **Design**: Responsive mobile-first design with modern glassmorphism UI

## Features
- Real-time weather and renewable energy data
- AI-powered predictions for renewable energy output
- Sustainability analytics and reporting
- Interactive charts and visualizations
- User-friendly chatbot for assistance

## Pages
1. **Home**: Introduction to EcoGrid AI with features and benefits.
2. **Dashboard**: Real-time data visualization including KPIs and charts.
3. **AI Prediction**: 24-hour renewable energy prediction dashboard.
4. **Reports**: Sustainability analytics and export functionality.
5. **Team**: Meet the team behind EcoGrid AI.

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ecogrid-ai.git
   cd ecogrid-ai
   ```

2. Install the client dependencies:
   ```
   cd client
   npm install
   ```

3. Install the server dependencies:
   ```
   cd server
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory and fill in the required values.

5. Start the client:
   ```
   cd client
   npm run dev
   ```

6. Start the server:
   ```
   cd server
   uvicorn app.main:app --reload
   ```

## Usage
- Access the application at `http://localhost:5173` for the client and `http://localhost:8000` for the FastAPI backend.
- Use the chatbot for assistance with renewable energy queries.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements
- Open-Meteo API for weather data
- Google Gemini API for AI predictions
- Tailwind CSS for styling

## Contact
For inquiries, please reach out to the team via the contact section on the website.