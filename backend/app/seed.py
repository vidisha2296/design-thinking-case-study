from .database import SessionLocal, engine
from . import models

def seed_data():
    db = SessionLocal()
    # Check if data already exists to avoid duplicates
    if db.query(models.Style).first():
        print("Database already seeded.")
        return

    # Step 1: Create a Base Style
    sample_style = models.Style(
        name="Classic Denim Jacket",
        fit_type="Relaxed",
        fabric_type="Woven",
        construction="Double-Stitched"
    )
    db.add(sample_style)
    db.commit()
    db.refresh(sample_style)

    # Step 2 & 3: Add Components with Costs
    components = [
        models.Component(style_id=sample_style.id, name="12oz Denim", category="Fabric", quantity=2.5, unit="Meters", unit_cost=12.0),
        models.Component(style_id=sample_style.id, name="Metal Buttons", category="Trim", quantity=8.0, unit="Pieces", unit_cost=0.50),
        models.Component(style_id=sample_style.id, name="Contrast Thread", category="Trim", quantity=1.0, unit="Spool", unit_cost=2.0)
    ]
    db.add_all(components)
    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()