'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { bomApi } from '../../services/api';
import { Card } from '../../components/ui/Card';

export default function TechpackView() {
  const params = useParams();
  const id = params.id; // This captures the '2' from /techpack/2
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      bomApi.getTechpack(Number(id))
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load techpack:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-20 text-center animate-pulse">Loading Production Specs...</div>;
  if (!data) return <div className="p-20 text-center text-red-500">Techpack Not Found.</div>;

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      {/* Step 3: The Final Summary Card */}
      <Card title={`Final Techpack: ${data.style_details.name}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-bold">Fit</p>
            <p className="text-sm font-semibold">{data.style_details.fit}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-bold">Fabric</p>
            <p className="text-sm font-semibold">{data.style_details.fabric}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 uppercase font-bold">Construction</p>
            <p className="text-sm font-semibold">{data.style_details.construction || 'Standard'}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-600 uppercase font-bold">Status</p>
            <p className="text-sm font-bold text-green-700">Ready for Factory</p>
          </div>
        </div>

        {/* The Financial Handoff Section */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Cost Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border p-4 rounded-xl">
              <p className="text-slate-500 text-sm">Material Subtotal</p>
              <p className="text-2xl font-bold">${data.financial_summary.material_subtotal}</p>
            </div>
            <div className="border p-4 rounded-xl">
              <p className="text-slate-500 text-sm">Labor + Overhead</p>
              <p className="text-2xl font-bold">
                ${(data.financial_summary.labor + data.financial_summary.overhead).toFixed(2)}
              </p>
            </div>
            <div className="bg-indigo-600 p-4 rounded-xl text-white">
              <p className="text-indigo-100 text-sm">Total Factory Price (FOB)</p>
              <p className="text-3xl font-black">${data.financial_summary.total_factory_price}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Simplified BOM List */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-bold mb-4">Confirmed Bill of Materials</h3>
        <div className="space-y-2">
          {data.bill_of_materials.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b last:border-0">
              <span className="text-slate-700">{item.name} <span className="text-xs text-slate-400">({item.category})</span></span>
              <span className="font-mono font-bold">{item.quantity} {item.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}