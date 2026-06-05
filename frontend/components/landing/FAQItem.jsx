import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden cursor-pointer"
     onClick={() => setOpen((v) => !v)}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold text-[#f2f0ff]">{q}</span>
        <ChevronDown
          size={16}
          className={`text-[#f2f0ff]/40 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-sm leading-relaxed text-[#f2f0ff]/50">{a}</p>
        </div>
      )}
    </div>
  );
}

export default FAQItem;