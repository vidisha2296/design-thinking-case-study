export const Card = ({ children, title, className = '' }: any) => (
  <div className={`bg-white p-8 rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {title && <h2 className="text-xl font-bold mb-6 text-slate-800">{title}</h2>}
    {children}
  </div>
);