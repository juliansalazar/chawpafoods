import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Plane } from '@react-three/drei';
import { TextureLoader } from 'three';
import './HeroSection.css';

const PanDeYucaDesformado = () => {
  const sphereRef = useRef();
  const colorMap = useLoader(TextureLoader, './src/assets/textura.png');

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y -= 0.004; // Rotación de la esfera
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 200]} scale={[2.9, 2.8, 3.2]}>
      <meshStandardMaterial
        color="#A9B08C"
        roughness={1}
        metalness={0.3}
        emissiveIntensity={3}
        map={colorMap}
      />
    </Sphere>
  );
};

const LogoOnEquator = ({ position }) => {  
  const texture = useLoader(TextureLoader, '/src/assets/logo.png'); // Ruta del logo y tamaño grande

  return (
    <Plane args={[1.5, 1.5]} position={position}>
      <meshBasicMaterial 
        map={texture}
        transparent
      />
    </Plane>
  );
};

const EquatorialLine = () => {
  const lineRef = useRef();
  const points = [];
  const radius = 3.25;
  const segments = 100;


  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    points.push([x, 0, z]);
  }

  const logoPositions = [
    [0, 0, radius], // Logo en el eje +Z
  ];

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y -= 0.004; // Rotación de la línea
    }
  });

  return (
    <group ref={lineRef}>
      {/* Línea ecuatorial */}
      <Line points={points} color="#026b62" lineWidth={2} />
      {/* Agregando logos en posiciones específicas */}
      {logoPositions.map((pos, index) => (
        <LogoOnEquator key={index} position={pos} />
      ))}
    </group>
  );
};

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1 style={{ color: 'white', fontSize: '80px' }}>SABORES DE LA MITAD DEL MUNDO</h1>
      <div className="canvas-container">
        <Canvas>
          {/* Luz ambiental para iluminar todo uniformemente */}
          <ambientLight intensity={0.7} />
          {/* Luz hemisférica para simular cielo y suelo */}
          <hemisphereLight 
            skyColor="#ffffff" // Color del cielo
            groundColor="#444444" // Color del suelo
            intensity={10} 
          />
          <PanDeYucaDesformado />
          <EquatorialLine />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroSection;
