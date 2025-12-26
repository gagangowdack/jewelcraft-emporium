import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, useGLTF, ContactShadows, Center } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. SAFE MODEL COMPONENT ---
function ProductModel({ url, scale }: { url: string; scale: number }) {
  // If the URL is wrong, useGLTF will throw an error. 
  // We wrap this in a component inside Suspense to catch it.
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <Center top>
      <primitive object={clonedScene} scale={scale} />
    </Center>
  );
}

// --- 2. FIXED PRELOADS ---
// IMPORTANT: These MUST match the paths in menuItems exactly
const RING_PATH = "/the_one_ring_lord_of_the_rings.glb";
const NECKLACE_PATH = "/the_one_ring_lord_of_the_rings.glb"; // Make sure this file exists in /public
const EARRING_PATH = "/ear-ring_made_with_sculptool_blender_2.9 (3).glb";

useGLTF.preload(RING_PATH);
useGLTF.preload(NECKLACE_PATH);
useGLTF.preload(EARRING_PATH);

export const Jewelry3DShowcase = () => {
  const [activeTab, setActiveTab] = useState("Ring");

  const menuItems = [
    { 
        id: "Ring", 
        label: "Diamond Ring", 
        path: "/the_one_ring_lord_of_the_rings.glb", 
        scale: 0.015, 
        desc: "Handcrafted 18k gold band." 
    },
   { 
    id: "Necklace", 
    label: "Sapphire Pendant", 
    path: "/the_one_ring_lord_of_the_rings.glb", 
    // If 0.0005 was invisible and 1.0 was giant, 
    // 0.005 to 0.01 is usually the sweet spot for CM-to-Meter conversions.
    scale: 0.01, 
    desc: "Deep ocean sapphire pendant." 
  },
    { 
        id: "Earring", 
        label: "Pearl Earring", 
        path: "/ear-ring_made_with_sculptool_blender_2.9 (3).glb", 
                scale: 1.2, // MADE BIGGER: Increased from 0.8 to 1.2
        desc: "Classic South Sea pearls." 
    }
  ];

  const currentItem = menuItems.find((i) => i.id === activeTab)!;

  return (
    <section className="relative py-24 bg-charcoal min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-black/40 p-1 rounded-full border border-gold/20 backdrop-blur-md">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-8 py-2 rounded-full text-sm font-display transition-all duration-300 ${
                  activeTab === item.id ? "bg-gold text-charcoal shadow-lg" : "text-cream/50"
                }`}
              >
                {item.id}s
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Display Area */}
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl bg-black/60 border border-gold/10 overflow-hidden shadow-inner">
            <Canvas camera={{ position: [0, 2, 15], fov: 35 }}> 
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              
              {/* Suspense handles the "Wait for Model" state locally 
                  so the entire website doesn't turn white/crash */}
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <ProductModel 
                    key={currentItem.path} 
                    url={currentItem.path} 
                    scale={currentItem.scale} 
                  />
                </Float>
                <Environment preset="studio" />
              </Suspense>

              <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={15} blur={2.5} />
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>

          {/* Info Side Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6 lg:pl-12"
            >
              <h3 className="text-gold font-display text-5xl lg:text-6xl">{currentItem.label}</h3>
              <p className="text-cream/70 text-xl font-body leading-relaxed max-w-md">
                {currentItem.desc}
              </p>
              
              <div className="pt-8 flex gap-4">
                <button className="flex-1 lg:flex-none px-12 py-5 bg-gold text-charcoal font-display tracking-widest text-sm rounded-full hover:scale-105 transition-all shadow-xl shadow-gold/10">
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};