'use client';
import { useState } from 'react';
import { bomApi } from './services/api';
import Step1StyleForm from './components/wizard/Step1StyleForm';
import Step2BOMTable from './components/wizard/Step2BOMTable';
import { Card } from './components/ui/Card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [styleId, setStyleId] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleCreateStyle = async (data: any) => {
    setLoading(true);
    try {
      const style = await bomApi.createStyle(data.name, data.fit, data.fabric);
      setStyleId(style.id);
      const aiItems = await bomApi.getAiSuggestions(style.id);
      setSuggestions(aiItems);
      setStep(2);
    } catch (err) { alert("Error!"); }
    finally { setLoading(false); }
  };

  const handleSaveBOM = async (items: any[]) => {
    if (!styleId) return;
    setLoading(true);
    try {
      await bomApi.saveComponents(styleId, items);
      router.push(`/techpack/${styleId}`); // Direct to Step 3 View
    } catch (err) { alert("Error saving!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex justify-between mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
        <span className={step >= 1 ? "text-indigo-600" : ""}>Step 1: Attributes</span>
        <span className={step >= 2 ? "text-indigo-600" : ""}>Step 2: AI BOM</span>
        <span>Step 3: Techpack</span>
      </div>

      {step === 1 && (
        <Card title="Start New Techpack">
          <Step1StyleForm onSubmit={handleCreateStyle} loading={loading} />
        </Card>
      )}

      {step === 2 && (
        <Card title="AI Suggested Components">
          <Step2BOMTable suggestions={suggestions} onSave={handleSaveBOM} loading={loading} />
        </Card>
      )}
    </main>
  );
}