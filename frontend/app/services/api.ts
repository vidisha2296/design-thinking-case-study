const BASE_URL = "http://127.0.0.1:8000";

export const bomApi = {
  /**
   * STEP 1: Define Cut
   * Note: Your FastAPI uses query params for name, fit, and fabric.
   */
  createStyle: async (name: string, fit: string, fabric: string) => {
    const params = new URLSearchParams({ name, fit, fabric });
    const res = await fetch(`${BASE_URL}/styles?${params.toString()}`, {
      method: "POST",
      headers: { "accept": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to create style");
    return res.json();
  },

  /**
   * STEP 2a: Get AI Suggestions
   * Triggers the Gemini AI logic based on the style ID.
   */
  getAiSuggestions: async (styleId: number) => {
    const res = await fetch(`${BASE_URL}/styles/${styleId}/ai-suggest`, {
      headers: { "accept": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch AI suggestions");
    return res.json();
  },

  /**
   * STEP 2b: Save Components
   * Persists the list of components (AI suggested or manually edited) to the DB.
   */
  saveComponents: async (styleId: number, components: any[]) => {
    const res = await fetch(`${BASE_URL}/styles/${styleId}/components`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json" 
      },
      body: JSON.stringify(components),
    });
    if (!res.ok) throw new Error("Failed to save components");
    return res.json();
  },

  /**
   * STEP 3 (Optional): Get Cost Breakdown
   * Just the financial calculation.
   */
  getCostBreakdown: async (styleId: number) => {
    const res = await fetch(`${BASE_URL}/styles/${styleId}/cost-breakdown`, {
      headers: { "accept": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch cost breakdown");
    return res.json();
  },

  /**
   * STEP 3 & UTILITY: Get Full Techpack
   * Retrieves everything (Style details + BOM + Finances) for final handoff.
   */
  getTechpack: async (styleId: number) => {
    const res = await fetch(`${BASE_URL}/styles/${styleId}`, {
      headers: { "accept": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch techpack");
    return res.json();
  }
};