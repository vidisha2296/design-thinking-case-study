import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_bom_suggestions(style_name: str, fit_type: str, fabric_type: str):
    # Standardizing model for 2026 Free Tier
    model_name = 'gemini-2.5-flash' 
    model = genai.GenerativeModel(model_name)
    
    # Prompting for high accuracy to reduce production errors
    prompt = f"""
    Act as an expert Apparel Production Lead. 
    Generate a Bill of Materials (BOM) for a '{style_name}' which is a {fit_type} {fabric_type} garment.
    
    Return ONLY a JSON array of objects. Do not include markdown formatting or backticks.
    The objects must use these exact keys:
    "name": (e.g., 'YKK Zipper', '12oz Denim'),
    "category": (Must be one of: 'Fabric', 'Trim', 'Label', 'Packaging'),
    "quantity": (float value),
    "unit": (e.g., 'Meters', 'Pieces', 'Spool'),
    "unit_cost": (estimated float USD cost per unit).
    
    Provide 5 essential components required to manufacture this specific style.
    """
    
    try:
        response = model.generate_content(prompt)
        text_content = response.text.strip()
        
        # Robust JSON cleaning
        if "```" in text_content:
            text_content = text_content.split("```")[1]
            if text_content.startswith("json"):
                text_content = text_content[4:]
            text_content = text_content.split("```")[0]
            
        return json.loads(text_content.strip())

    except Exception as e:
        print(f"AI Error: {e}")
        # Fallback aligned with your 'Classic Denim Jacket' seed data
        return [
            {"name": "Main Fabric", "category": "Fabric", "quantity": 2.5, "unit": "Meters", "unit_cost": 12.0},
            {"name": "Metal Buttons", "category": "Trim", "quantity": 8.0, "unit": "Pieces", "unit_cost": 0.5},
            {"name": "Standard Thread", "category": "Trim", "quantity": 1.0, "unit": "Spool", "unit_cost": 2.0}
        ]
# import os
# import json
# import google.generativeai as genai
# from dotenv import load_dotenv

# load_dotenv()
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# def get_bom_suggestions(fit_type: str, fabric_type: str):
#     model = genai.GenerativeModel('gemini-1.5-flash')
    
#     prompt = f"""
#     Act as a professional Garment Technologist. 
#     Provide a Bill of Materials (BOM) for a {fit_type} {fabric_type} garment.
#     Return ONLY a JSON array of objects with these keys:
#     "name" (string), "category" (Fabric, Trim, or Label), "quantity" (float), "unit" (string), "unit_cost" (float estimation).
    
#     Limit to the 5 most essential components.
#     """
    
#     response = model.generate_content(prompt)
#     # Clean up the response text in case Gemini adds markdown backticks
#     clean_json = response.text.replace("```json", "").replace("```", "").strip()
#     return json.loads(clean_json)