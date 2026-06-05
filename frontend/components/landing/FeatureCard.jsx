
const FeatureCard = ({ icon: Icon, color, title, description, tag }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-600 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white">
          <Icon size={18} />
        </div>
        {tag && (
          <span 
            className="text-xs px-2 py-0.5 rounded-full font-mono border"
          >
            {tag}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-display font-bold text-base mb-1.5 text-[#f2f0ff]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#f2f0ff]/50">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;