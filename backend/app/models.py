from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Style(Base):
    __tablename__ = "styles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    # Step 1 attributes
    fit_type = Column(String)      # e.g., Slim, Oversized
    fabric_type = Column(String)   # e.g., Woven, Knit
    construction = Column(String)  # e.g., Seamless, Double-Stitched

    # Relationship to Step 2
    components = relationship("Component", back_populates="style", cascade="all, delete-orphan")

class Component(Base):
    __tablename__ = "components"

    id = Column(Integer, primary_key=True, index=True)
    style_id = Column(Integer, ForeignKey("styles.id"))
    name = Column(String)          # e.g., Main Fabric, Zipper, Thread
    category = Column(String)      # e.g., Trim, Fabric, Label
    quantity = Column(Float)       # e.g., 1.5
    unit = Column(String)          # e.g., Meters, Pieces
    unit_cost = Column(Float)      # Step 3 attribute: Price per unit

    style = relationship("Style", back_populates="components")