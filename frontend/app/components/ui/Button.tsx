export const Button = ({ children, onClick, disabled, variant = 'primary', className = '' }: any) => {
  const base = "px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50";
  const styles = variant === 'primary' 
    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
    : "bg-slate-100 text-slate-700 hover:bg-slate-200";
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};