from fastapi import FastAPI
from .database import engine, Base
from .models import Item
from sqlalchemy.orm import Session
from fastapi import Depends
from .database import SessionLocal

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Backend working"}

@app.post("/items")
def create_item(name: str, db: Session = Depends(get_db)):
    item = Item(name=name)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@app.get("/items")
def get_items(db: Session = Depends(get_db)):
    return db.query(Item).all()