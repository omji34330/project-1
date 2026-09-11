# EcoGrid AI Backend Documentation

## Overview
EcoGrid AI is a FastAPI backend designed to support the EcoGrid AI application, which focuses on renewable and sustainable energy solutions. This backend provides APIs for real-time data fetching, AI predictions, and sustainability analytics.

## Project Structure
```
server/
├── app/
│   ├── __init__.py          # Initializes the FastAPI application
│   ├── main.py              # Entry point for the FastAPI backend
│   ├── config.py            # Configuration settings for the application
│   ├── models.py            # Data models used in the application
│   ├── routes/              # Directory for route definitions
│   │   └── chat.py          # Route for handling chat requests
│   └── services/            # Directory for service functions
│       └── gemini.py        # Functions for interacting with the Google Gemini API
├── requirements.txt          # List of dependencies for the backend
├── .env.example              # Example environment variables needed for the backend
└── README.md                 # Documentation for the FastAPI backend
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-repo/ecogrid-ai.git
   cd ecogrid-ai/server
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values, especially `GEMINI_API_KEY`.

## Running the Server
To start the FastAPI server, run:
```
uvicorn app.main:app --reload
```
The server will be available at `http://127.0.0.1:8000`.

## API Endpoints
### POST /api/chat
This endpoint interacts with the Google Gemini API to handle chat requests. Ensure that the `GEMINI_API_KEY` is set in your environment variables.

## CORS Configuration
CORS is enabled for localhost:5173 to allow the frontend application to communicate with the backend.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.