'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';

export default function Step1StyleForm({ onSubmit, loading }: any) {
  const [data, setData] = useState({ name: '', fit: 'Relaxed', fabric: 'Woven' });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Style Name</label>
        <input required className="w-full p-2 border rounded-md" placeholder="e.g., Slim Fit T-Shirt"
          onChange={(e) => setData({ ...data, name: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Fit</label>
          <select className="w-full p-2 border rounded-md" onChange={(e) => setData({ ...data, fit: e.target.value })}>
            <option>Relaxed</option><option>Slim</option><option>Oversized</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Fabric</label>
          <select className="w-full p-2 border rounded-md" onChange={(e) => setData({ ...data, fabric: e.target.value })}>
            <option>Woven</option><option>Knit</option><option>Jersey</option>
          </select>
        </div>
      </div>
      <Button disabled={loading} className="w-full">{loading ? "Creating..." : "Next: Generate BOM"}</Button>
    </form>
  );
}