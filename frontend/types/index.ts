export interface Style {
  id?: number;
  name: string;
  fit_type: string;
  fabric_type: string;
  construction?: string;
}

export interface BOMComponent {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unit_cost: number;
}

export interface TechpackSummary {
  techpack_id: number;
  style_details: Style;
  bill_of_materials: BOMComponent[];
  financial_summary: {
    material_subtotal: number;
    labor: number;
    overhead: number;
    total_factory_price: number;
  };
}