from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from . import models
import os
from . import models, ai
# Initialize DB
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
# --- CORS CONFIGURATION ---
# This allows your Next.js frontend to talk to your FastAPI backend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://apparel-bom-frontend.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],              # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all headers
)
# --- END CORS CONFIGURATION ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- STEP 1: Define Style ---
@app.post("/styles")
def create_style(name: str, fit: str, fabric: str, db: Session = Depends(get_db)):
    new_style = models.Style(name=name, fit_type=fit, fabric_type=fabric)
    db.add(new_style)
    db.commit()
    db.refresh(new_style)
    return new_style

# --- STEP 2: Define Components (with AI Suggestion) ---
# --- STEP 2: AI Suggestions ---
@app.get("/styles/{style_id}/ai-suggest")
def suggest_components(style_id: int, db: Session = Depends(get_db)):
    style = db.query(models.Style).filter(models.Style.id == style_id).first()
    if not style:
        raise HTTPException(status_code=404, detail="Style not found")
    
    # Passing name, fit, and fabric for maximum AI accuracy
    suggestions = ai.get_bom_suggestions(style.name, style.fit_type, style.fabric_type)
    return suggestions

# --- STEP 3: Save Components ---
@app.post("/styles/{style_id}/components")
def add_components(style_id: int, components: list[dict], db: Session = Depends(get_db)):
    # Bulk add components from Step 2
    for item in components:
        db_comp = models.Component(
            style_id=style_id,
            name=item['name'],
            category=item['category'],
            quantity=item['quantity'],
            unit=item['unit'],
            unit_cost=item.get('unit_cost', 0.0)
        )
        db.add(db_comp)
    db.commit()
    return {"message": "BOM updated successfully"}

# --- STEP 3: Final Cost Calculation ---
@app.get("/styles/{style_id}/cost-breakdown")
def get_costing(style_id: int, db: Session = Depends(get_db)):
    style = db.query(models.Style).filter(models.Style.id == style_id).first()
    
    # Calculate Step 3 Logic
    material_total = sum(c.quantity * c.unit_cost for c in style.components)
    labor_cost = 4.50  # Industry standard placeholder
    overhead = material_total * 0.10  # 10% overhead
    
    return {
        "style_name": style.name,
        "material_cost": round(material_total, 2),
        "labor_cost": labor_cost,
        "overhead": round(overhead, 2),
        "total_estimated_cost": round(material_total + labor_cost + overhead, 2)
    }

@app.get("/styles/{style_id}")
def get_full_techpack(style_id: int, db: Session = Depends(get_db)):
    # Fetch style and its related components
    style = db.query(models.Style).filter(models.Style.id == style_id).first()
    
    if not style:
        raise HTTPException(status_code=404, detail="Style Techpack not found")

    # Step 3 Logic: Recalculate costs for the final summary
    material_total = sum(c.quantity * c.unit_cost for c in style.components)
    labor_cost = 4.50
    overhead = material_total * 0.10
    total_cost = material_total + labor_cost + overhead

    return {
        "techpack_id": style.id,
        "style_details": {
            "name": style.name,
            "fit": style.fit_type,
            "fabric": style.fabric_type,
            "construction": style.construction
        },
        "bill_of_materials": [
            {
                "name": c.name,
                "category": c.category,
                "quantity": c.quantity,
                "unit": c.unit,
                "cost": c.unit_cost
            } for c in style.components
        ],
        "financial_summary": {
            "material_subtotal": round(material_total, 2),
            "labor": labor_cost,
            "overhead": round(overhead, 2),
            "total_factory_price": round(total_cost, 2)
        },
        "status": "Ready for Production"
    }