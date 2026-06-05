const Stat = ({ value, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display font-black text-4xl text-[#f2f0ff]">{value}</span>
      <span className="text-sm text-[#f2f0ff]/40">{label}</span>
    </div>
  );
}

export default Stat;
