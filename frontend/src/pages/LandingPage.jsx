import React, {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Boxes, Globe, Move3d, CloudUpload, Code2, Layers3, Zap } from 'lucide-react';
import Stat from '../components/landing/Stat';
import FeatureCard from '../components/landing/FeatureCard';
import TestimonialCard from '../components/landing/TestimonialCard';
import FAQItem from '../components/landing/FAQItem';
import Header from '../components/Header';


const LandingPage = () => {
  return (
    <section>
        <Header />
    <div className="bg-[#05060f] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className=" min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 mt-10">
        {/* Badge */}
        <div className="flex items-center animate-bounce gap-2 text-xs font-mono font-semibold uppercase px-3 py-1 rounded-full bg-[#5b73ff]/10 text-[#5b73ff] mb-6 animate-fade-up [animation-delay:50ms]">
          <Zap size={11} fill="#a5b4fc" />
          VRSB: VR Scene Builder version 1.0.2
        </div>

        {/* Headline */}
        <h2 className="font-display font-black leading-[1.05] animate-fade-up [animation-delay:100ms] [animation-fill-mode:both] text-[clamp(2.8rem,8vw,6rem)] text-[#f2f0ff]">
          Build{' '}
          <span className="bg-gradient-to-r from-[#5b73ff] to-[#a855f7] bg-clip-text text-transparent">
            3D Virtual
          </span>
          <br />
          Worlds,<br />
          <em className="not-italic text-[#f2f0ff]/60">In-Browser.</em>
          <br />
        </h2>

        <p className="text-lg max-w-xl mt-6 leading-relaxed animate-fade-up [animation-delay:200ms] text-gray-400">
          The professional-grade 3D scene system that lets you create, import, and manage
          production-ready scenes drag, drop, save, reload. No install required.
        </p>


        <div className="flex flex-wrap gap-4 mt-10 justify-center animate-fade-up [animation-delay:300ms] [animation-fill-mode:both]">
          <Link to="/signup">
            <button className="px-8 py-3.5 text-base bg-white text-gray-900 rounded-full hover:bg-gray-100 transition">
              <span>Start Building Free</span>
            </button>
          </Link>
          <Link to="/login">
            <button className="px-8 py-3.5 text-base bg-blue-500 hover:bg-blue-700 text-gray-200 font-semibold rounded-md transition">
              View Demo
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mt-20 justify-center animate-fade-up [animation-delay:400ms]">
          <Stat value="50K+" label="Scenes created" />
          <div className="w-px bg-white/10" />
          <Stat value="3ms" label="Avg render time" />
          <div className="w-px bg-white/10" />
          <Stat value="99.9%" label="Uptime SLA" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3 text-[#5b73ff]">
            Features
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#f2f0ff]">
            A complete 3D creation<br />
            <em className="text-[#f2f0ff]/55 not-italic">suite in your browser</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard icon={Globe} color="#5b73ff" title="3D WebGL Viewport" description="Real-time rendering with orbit controls, perspective camera, and ambient lighting - all at 60fps." />
          <FeatureCard icon={Move3d} color="#9333ea" title="Drag & Drop Editor" description="Click any object to select it. Drag to reposition. Live coordinate sync in the properties panel." />
          <FeatureCard icon={CloudUpload} color="#00d9f5" title="Cloud Scene Persistence" description="Every scene auto-saves to MongoDB. Sign in on any device and your world is waiting." />
          <FeatureCard icon={Boxes} color="#f59e0b" title="GLB Model Support" description="Import freely available .glb and .gltf models from the web. Duck, car, furniture - anything goes." />
          <FeatureCard icon={Code2} color="#10b981" title="Developer-First API" description="Full REST API with session auth. Integrate VR Scene Builder into your own products." />
          <FeatureCard icon={Layers3} color="#f43f5e" title="Multi-Scene Management" description="Organize scenes into projects. Each scene is a self-contained JSON snapshot you can export." />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl text-[#f2f0ff]">How it works</h2>
        </div>
        <div className="flex flex-col gap-10">
          {[
            { n: '01', title: 'Sign up in seconds', desc: 'Create your free account. No credit card, no setup.' },
            { n: '02', title: 'Add objects to your scene', desc: 'Choose from cubes, spheres, or import a GLB model. Each click spawns it at a random position.' },
            { n: '03', title: 'Drag & arrange', desc: 'Click to select, drag to reposition. Fine-tune coordinates in the properties panel.' },
            { n: '04', title: 'Save & reload', desc: 'Hit Save — your scene persists to MongoDB. Log back in anytime and pick up where you left off.' },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm bg-[#5b73ff]/10 border border-[#5b73ff]/25 text-[#5b73ff]">
                {step.n}
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-xl mb-1 text-[#f2f0ff]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#f2f0ff]/50">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl text-[#f2f0ff]">
            Loved by creators <em className="text-[#f2f0ff]/50 not-italic">worldwide</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard quote="VRSB replaced four tools I was using. The drag-and-drop editor is effortless and the auto-save is a lifesaver." name="Olivia Chen" role="3D Artist, Freelance" avatar="OC" />
          <TestimonialCard quote="I can't believe this runs in a browser. I've been building AR museum exhibits entirely in VRSB." name="Diego Ruiz" role="XR Developer" avatar="DR" />
          <TestimonialCard quote="The GLB model support is phenomenal. I import Sketchfab assets and arrange them in minutes." name="Miriam Okafor" role="Product Designer" avatar="MO" />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl text-[#f2f0ff]">
            Common questions,<br />
            <em className="text-[#f2f0ff]/50 not-italic">straight answers</em>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <FAQItem q="What 3D formats are supported?" a="Currently .glb and .gltf. We plan to support .obj, .fbx, and .usdz in upcoming releases." />
          <FAQItem q="How does cloud saving work?" a="Every object's position is stored in MongoDB on your behalf. Scenes are tied to your account and load automatically on sign-in." />
          <FAQItem q="Can I use VR Scene Builder in my own product via API?" a="Yes — the Pro and Enterprise tiers include full REST API access with session-based auth. Check the docs for integration guides." />
          <FAQItem q="Is my data secure?" a="All data is encrypted in transit (TLS 1.3) and at rest. We never share your scenes with third parties." />
          <FAQItem q="Does it work on mobile devices?" a="The dashboard is desktop-first for the 3D editor. The landing page and auth flows are fully responsive." />
        </div>
      </section>

   
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="glass-card rounded-3xl px-10 py-16 flex flex-col items-center gap-8 border border-[#5b73ff]/20 shadow-[0_0_100px_rgba(91,115,255,0.1)]">
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#f2f0ff]">
            Ready to build your<br />first 3D scene?
          </h2>
          <p className="text-[#f2f0ff]/50">
            Join 5000+ creators. No credit card required.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/signup">
              <button className="px-10 py-3.5 text-base bg-[#5b73ff] hover:bg-[#5b73ff]/90 text-white rounded-full transition">
                <span>Start Building Free</span>
              </button>
            </Link>
            <Link to="/login">
              <button className="px-10 py-3.5 text-base border border-white/20 text-white hover:bg-white/5 rounded-full transition">
                View the Demo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </section>
  );
};

export default LandingPage;