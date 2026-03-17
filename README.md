Apparel BOM Editor: Design Thinking Case Study
A full-stack, AI-powered Technical Design (Techpack) tool developed as a solution for a Design Thinking assessment. This application streamlines the garment manufacturing process by automating Bill of Materials (BOM) generation and financial costing.

🌐 Live Links
Frontend UI: https://apparel-bom-frontend.onrender.com

Backend API: https://apparel-bom-backend.onrender.com

GitHub Repo: https://github.com/vidisha2296/design-thinking-case-study

🏗️ Technical Architecture
Tech Stack
Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS

Backend: Python 3.12, FastAPI, SQLAlchemy

AI Engine: Gemini 3 Flash (Google Generative AI)

DevOps: Docker (Multi-stage builds), Render (CI/CD)

Repository Structure
Plaintext
.
├── backend/
│   ├── app/            # FastAPI routes, models, and AI logic
│   ├── Dockerfile      # Production-ready Python environment
│   └── requirements.txt
├── frontend/
│   ├── app/            # Next.js pages and services layer
│   ├── components/     # Modular UI & Wizard components
│   ├── Dockerfile      # Optimized multi-stage Node build
│   └── types/          # Shared TypeScript interfaces
└── docker-compose.yml  # Local orchestration
🔄 User Flow & API Integration
The application follows a Mandatory 3-Step Wizard to ensure data integrity and manufacturing accuracy.

Step 1: Define Style Cut
User Action: Enters Style Name (e.g., "Linen Trousers"), Fit (Slim/Relaxed), and Fabric Type.

API Called: POST /styles

Logic: Backend creates a unique Style ID in the database to track the garment's lifecycle.

Step 2: Intelligent BOM Generation
User Action: Clicks "Suggest BOM with AI."

API Called: GET /styles/{id}/ai-suggest

Logic: The backend feeds style attributes into the Gemini 3 Flash model. The AI returns a structured list of materials (Zippers, Buttons, Thread, Interfacing) with suggested quantities and units.

Confirmation: User reviews the list and clicks "Save."

API Called: POST /styles/{id}/components (Bulk-persists components to DB).

Step 3: Financial Costing & Techpack
User Action: Views the final Techpack summary.

API Called: GET /styles/{id}

Logic: The backend performs server-side math to calculate the Total Factory Price (FOB) by aggregating:

Material Subtotal (Sum of BOM costs)

Labor Cost (Fixed $4.50 industry standard)

Overhead (10% of materials)

🚀 Key Engineering Practices
CORS Security: Restricted origins to ensure only the authorized Render frontend can access manufacturing data.

State-Driven UI: Decoupled frontend components (Atomic Design) ensure the UI reacts instantly to API responses.

Docker Optimization: Multi-stage Docker builds for the frontend reduced the final production image size by over 60%.

Error Handling: Implemented a service layer in Next.js to handle API failures gracefully.

🛠️ Setup Instructions
Run Locally (Recommended)
Bash
docker compose up --build
Backend: http://localhost:8000

Frontend: http://localhost:3000

Environment Variables
Ensure the following are set in your environment or Render dashboard:

GOOGLE_API_KEY: For Gemini AI generation.

NEXT_PUBLIC_API_URL: Points the frontend to the backend URL.
