import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleField() {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4f8ef7"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-white dark:bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Glitch Effect on Text */}
          <h1 className="text-[150px] md:text-[250px] font-display font-bold leading-none text-gray-900 dark:text-white mix-blend-difference relative select-none">
            <span className="absolute top-0 left-0 -ml-1 text-red-500 opacity-70 animate-pulse mix-blend-screen">404</span>
            <span className="absolute top-0 left-0 ml-1 text-blue-500 opacity-70 animate-pulse mix-blend-screen" style={{ animationDelay: '0.1s'}}>404</span>
            404
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-mono"
        >
          This page got lost in the void.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/">
            <MagneticButton className="bg-white text-black hover:bg-gray-200">
              Back to Home
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
