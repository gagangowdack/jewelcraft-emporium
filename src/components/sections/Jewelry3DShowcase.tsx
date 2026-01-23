import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  Float, 
  useGLTF, 
  ContactShadows, 
  Center 
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// --- 1. MODEL COMPONENT WITH AUTO-ROTATION ---
function ProductModel({ url, scale }: { url: string; scale: number }) {
  const { scene } = useGLTF(url);
  
  // Memoize the clone so switching tabs doesn't cause glitches
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // Reference for the rotation
  const modelRef = useRef<THREE.Group>(null!);

  // useFrame runs every frame (infinite loop)
  useFrame((state, delta) => {
    if (modelRef.current) {
      // delta ensures smooth rotation regardless of screen refresh rate
      // Adjust 0.5 to make it faster or slower
      modelRef.current.rotation.y += delta * 0.5; 
    }
  });

  return (
    <Center top>
      <group ref={modelRef}>
        <primitive object={clonedScene} scale={scale} />
      </group>
    </Center>
  );
}

// --- 2. PRELOAD ASSETS ---
const RING_PATH = "/the_one_ring_lord_of_the_rings.glb";
const EARRING_PATH = "/ear-ring_made_with_sculptool_blender_2.9 (3).glb";
const NECKLACE_PATH = "/minecraft_thug_life_gold_chain.glb";

useGLTF.preload(RING_PATH);
useGLTF.preload(EARRING_PATH);
useGLTF.preload(NECKLACE_PATH);

// --- 3. MAIN SHOWCASE COMPONENT ---
export const Jewelry3DShowcase = () => {
  const [activeTab, setActiveTab] = useState("Ring");

  const menuItems = [
    { 
      id: "Ring", 
      label: "Diamond Ring", 
      path: RING_PATH, 
      scale: 0.015, 
      desc: "Handcrafted 18k gold band with an exquisite finish." 
    },
    { 
      id: "Necklace", 
      label: "Sapphire Pendant", 
      path: NECKLACE_PATH, // Ensure you update this path when you have the necklace file
      scale: 5, 
      desc: "Deep ocean sapphire pendant hanging from a delicate chain." 
    },
    { 
      id: "Earring", 
      label: "Pearl Earring", 
      path: EARRING_PATH, 
      scale: 1.2, 
      desc: "Classic South Sea pearls selected for their luster." 
    }
  ];

  const currentItem = menuItems.find((i) => i.id === activeTab)!;

  return (
    <section className="relative py-24 bg-[#1a1a1a] min-h-screen text-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-black/40 p-1 rounded-full border border-yellow-600/20 backdrop-blur-md">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id 
                    ? "bg-yellow-600 text-black shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.id}s
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Display Area */}
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl bg-black/60 border border-yellow-600/10 overflow-hidden shadow-2xl">
            <Canvas camera={{ position: [0, 2, 15], fov: 35 }}> 
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
              
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                  <ProductModel 
                    key={currentItem.id} // Key switch forces re-mount for clean transition
                    url={currentItem.path} 
                    scale={currentItem.scale} 
                  />
                </Float>
                <Environment preset="studio" />
              </Suspense>

              <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={15} blur={2.5} />
              <OrbitControls enableZoom={true} makeDefault />
            </Canvas>
          </div>

          {/* Info Side Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 lg:pl-12"
            >
              <h3 className="text-yellow-600 font-serif text-5xl lg:text-6xl">
                {currentItem.label}
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed max-w-md">
                {currentItem.desc}
              </p>
              
              <div className="pt-8 flex gap-4">
                <button className="flex-1 lg:flex-none px-12 py-5 bg-yellow-600 text-black font-bold tracking-widest text-sm rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-600/20">
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