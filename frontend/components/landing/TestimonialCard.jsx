import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, name, role, avatar }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} fill="#f59e0b" className="text-[#f59e0b]" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-[#f2f0ff]/65">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 bg-gradient-to-br from-[#5b73ff] to-[#9333ea] text-white">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#f2f0ff]">{name}</p>
          <p className="text-xs text-[#f2f0ff]/35">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
