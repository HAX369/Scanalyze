
# Scanalyze - Production Setup Instructions

## Prerequisites
- Node.js 18+ & npm
- Python 3.9+
- PostgreSQL 14+
- Tesseract OCR engine (`sudo apt install tesseract-ocr`)

## Quick Start (Frontend)
1. Install dependencies: `npm install`
2. Run React dev server: `npm start`
3. Access at `http://localhost:3000`

## Backend Setup (Node/Express)
1. Navigate to `backend/`
2. Configure `.env` with `DATABASE_URL` and `JWT_SECRET`
3. Run `npx prisma migrate dev` to setup schema
4. Start server: `npm run dev`

## OCR Microservice Setup (Python)
1. Navigate to `ocr_service/`
2. Install dependencies: `pip install -r requirements.txt`
3. Start service: `python app.py`

## Testing the API
Use the following endpoints in Postman:
- `POST /auth/register`: `{ "name": "...", "email": "...", "password": "..." }`
- `POST /scan/upload`: FormData with key `file` containing an image.
- `GET /history`: Header `Authorization: Bearer <token>`
