import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, MeshDistortMaterial, Torus, RoundedBox, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const DiamondRing = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ringRef} position={position}>
        {/* Ring Band */}
        <Torus args={[1, 0.15, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </Torus>
        
        {/* Diamond */}
        <group position={[0, 0.4, 0]}>
          <Sphere args={[0.25, 32, 32]}>
            <MeshDistortMaterial
              color="#ffffff"
              envMapIntensity={3}
              clearcoat={1}
              clearcoatRoughness={0}
              metalness={0.1}
              roughness={0}
              distort={0.1}
              speed={2}
            />
          </Sphere>
          {/* Diamond glow */}
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#d4af37" distance={3} />
        </group>
        
        {/* Small accent diamonds */}
        {[0, Math.PI / 4, -Math.PI / 4].map((angle, i) => (
          <group key={i} position={[Math.sin(angle) * 0.9, 0.15, Math.cos(angle) * 0.9]}>
            <Sphere args={[0.08, 16, 16]}>
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.2}
                roughness={0}
                envMapIntensity={3}
              />
            </Sphere>
          </group>
        ))}
      </group>
    </Float>
  );
};

const PendantNecklace = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const pendantRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pendantRef.current) {
      pendantRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={pendantRef} position={position}>
        {/* Chain */}
        <Torus args={[1.5, 0.03, 16, 100]} rotation={[0, 0, 0]}>
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </Torus>
        
        {/* Pendant holder */}
        <RoundedBox args={[0.15, 0.3, 0.05]} position={[0, -1.5, 0]} radius={0.02}>
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>
        
        {/* Main gem */}
        <group position={[0, -1.9, 0]}>
          <RoundedBox args={[0.4, 0.5, 0.15]} radius={0.05}>
            <meshStandardMaterial
              color="#1a5f7a"
              metalness={0.3}
              roughness={0.1}
              envMapIntensity={2}
            />
          </RoundedBox>
          <pointLight position={[0, 0, 0.5]} intensity={0.3} color="#4fc3f7" distance={2} />
        </group>
      </group>
    </Float>
  );
};

const Earring = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const earringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (earringRef.current) {
      earringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={earringRef} position={position}>
        {/* Hook */}
        <Torus args={[0.2, 0.02, 16, 50]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
        </Torus>
        
        {/* Decorative elements */}
        {[0, 1, 2].map((i) => (
          <group key={i} position={[0, -0.3 - i * 0.4, 0]}>
            <Sphere args={[0.1 - i * 0.02, 16, 16]}>
              <meshStandardMaterial
                color={i === 0 ? "#d4af37" : "#ffffff"}
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={2}
              />
            </Sphere>
          </group>
        ))}
        
        {/* Drop pearl */}
        <Sphere args={[0.15, 32, 32]} position={[0, -1.5, 0]}>
          <meshStandardMaterial
            color="#ffecd2"
            metalness={0.1}
            roughness={0.3}
            envMapIntensity={1}
          />
        </Sphere>
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
      <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={0.5} color="#ffd700" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
      
      <DiamondRing position={[-3, 0, 0]} />
      <PendantNecklace position={[0, 0.5, 0]} />
      <Earring position={[3, 0.5, 0]} />
      
      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground font-body text-sm">Loading 3D Experience...</p>
    </div>
  </div>
);

export const Jewelry3DShowcase = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-charcoal overflow-hidden" id="3d-showcase">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-body uppercase tracking-widest mb-6">
            Interactive Experience
          </span>
          <h2 className="font-display text-4xl lg:text-6xl text-cream mb-4">
            Explore in <span className="text-gradient-gold">3D</span>
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto font-body text-lg">
            Rotate and view our signature pieces from every angle. Experience the craftsmanship before you buy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-gold/10 shadow-elevated"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal/80" />
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
          
          {/* Labels */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 lg:gap-16">
            {["Diamond Ring", "Sapphire Pendant", "Pearl Earring"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-cream text-sm lg:text-base">{item}</div>
                <div className="text-gold text-xs font-body mt-1">Click to view</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center text-cream/40 text-sm mt-6 font-body"
        >
          Drag to rotate • Scroll to explore
        </motion.p>
      </div>
    </section>
  );
};
