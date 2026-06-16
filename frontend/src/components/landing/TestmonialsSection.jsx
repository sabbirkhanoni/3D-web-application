import React from 'react'
import { FadeSection, StaggerGrid } from '../../ui/Animation'
import TestimonialCard from './TestimonialCard'

const TESTIMONIALS = [
  {
    quote: "VRSB replaced four tools I was using. The drag-and-drop editor is effortless and the auto-save is a lifesaver.",
    name: "Olivia Chen",
    role: "3D Artist, Freelance",
    avatar: "OC"
  },
  {
    quote: "I can't believe this runs in a browser. I've been building AR museum exhibits entirely in VRSB.",
    name: "Diego Ruiz",
    role: "XR Developer",
    avatar: "DR"
  },
  {
    quote: "The GLB model support is phenomenal. I import Sketchfab assets and arrange them in minutes.",
    name: "Miriam Okafor",
    role: "Product Designer",
    avatar: "MO"
  },
  {
    quote: "VRSB has streamlined my workflow and boosted my productivity. Highly recommend!",
    name: "Alex Johnson",
    role: "UI/UX Designer",
    avatar: "AJ"  
  },
  {
    quote: "The real-time collaboration features are a game-changer. My team can work together seamlessly.",
    name: "Sofia Martinez",
    role: "Creative Director",
    avatar: "SM"
  },
  {
    quote: "As an educator, VRSB has made teaching 3D concepts so much more interactive and engaging.",
    name: "Ethan Lee",
    role: "Professor of Digital Media",
    avatar: "EL"
  }
];

const TestimonialsSection = () => {
  return (
   <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
             <FadeSection className="text-center mb-16">
               <h2 className="font-display font-black text-4xl text-[#f2f0ff]">
                 Loved by creators <em className="text-[#f2f0ff]/50 not-italic">worldwide</em>
               </h2>
             </FadeSection>
             <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} avatar={t.avatar} />
                ))}
             </StaggerGrid>
           </section>
  )
}

export default TestimonialsSection