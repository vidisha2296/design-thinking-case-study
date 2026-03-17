'use client';
import { Button } from '../ui/Button';

export default function Step2BOMTable({ suggestions, onSave, loading }: any) {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-3">Component</th>
              <th className="p-3">Category</th>
              <th className="p-3">Qty/Unit</th>
              <th className="p-3">Unit Cost</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((item: any, i: number) => (
              <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{item.category}</span></td>
                <td className="p-3">{item.quantity} {item.unit}</td>
                <td className="p-3">${item.unit_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={() => onSave(suggestions)} disabled={loading} className="w-full">
        {loading ? "Saving..." : "Confirm & Finalize Techpack"}
      </Button>
    </div>
  );
}