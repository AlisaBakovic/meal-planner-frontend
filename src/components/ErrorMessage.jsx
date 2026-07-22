function ErrorMessage({ children }) {
  if (!children) return null;

  return (
    <div className=" w-full rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur-xl px-5 py-4 text-sm text-red-500 shadow-[0_8px_20px_rgba(239,68,68,0.08)] ">
      {children}
    </div>
  );
}
export default ErrorMessage;
