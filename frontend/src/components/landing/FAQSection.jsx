import React from 'react'
import { FadeSection } from '../../ui/Animation'
import FAQItem from './FAQItem'

const FAQ = [
  {
    q: "What 3D formats are supported?",
    a: "Currently .glb and .gltf. We plan to support .obj, .fbx, and .usdz in upcoming releases.",
  },
  {
    q: "How does cloud saving work?",
    a: "Every object's position is stored in MongoDB on your behalf. Scenes are tied to your account and load automatically on sign-in.",
  },
  {
    q: "Can I use VR Scene Builder in my own product via API?",
    a: "Yes — the Pro and Enterprise tiers include full REST API access with session-based auth. Check the docs for integration guides.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit (TLS 1.3) and at rest. We never share your scenes with third parties.",
  },
  {
    q: "Does it work on mobile devices?",
    a: "The dashboard is desktop-first for the 3D editor. The landing page and auth flows are fully responsive.",
  },
  {
    q: "Can I collaborate with others?",
    a: "Yes! You can invite collaborators to your scenes and work together in real-time. Changes sync instantly for everyone.",
  }
];

const FAQSection = () => {
  return (
    <section className="relative z-10 max-w-3xl mx-auto px-6 py-20">
          <FadeSection className="text-center mb-12">
            <h2 className="font-display font-black text-4xl text-[#f2f0ff]">
              Common questions,<br />
              <em className="text-[#f2f0ff]/50 not-italic">straight answers</em>
            </h2>
          </FadeSection>
          <FadeSection delay={0.1} className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </FadeSection>
        </section>
  )
}

export default FAQSection