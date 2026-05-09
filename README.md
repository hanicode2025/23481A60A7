# 23481A60A7 - Campus Hiring Evaluation

## Track: Frontend

## Structure

- `logging_middleware/` - Reusable logging middleware that calls AffordMed Log API
- `notification_app_fe/` - React frontend for Campus Notifications with Priority Inbox
- `notification_app_be/` - Proxy server to handle CORS for frontend API calls
- `notification_system_design.md` - System design approach for Stage 1

## How to Run

### 1. Proxy Server
```bash
cd notification_app_be
npm install
node server.js
```

### 2. Frontend
```bash
cd notification_app_fe
npm install
npm start
```

App runs on http://localhost:3000
