import "./App.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Orbit from "./Orbit";
import Background from "./Background";
import Box from "./Box";
import Floor from "./Floor";
import Bulb from "./Bulb";
import Dragable from "./Dragable";
import ContextProvider from "./ContextProvider";
import { Physics } from "@react-three/cannon";
import Model from "./Model";

function App() {
  const [enableOrbit, setEnableOrbit] = useState(false);
  const handleClick = (e) => {
    if (!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(
      e.target.style.background
    );
  };
  return (
    <div id="root">
      <div style={{ position: "absolute", zIndex: 1 }}>
        <div
          onClick={handleClick}
          style={{ width: "40px", height: "40px", background: "green" }}
        ></div>
        <div
          onClick={handleClick}
          style={{ width: "40px", height: "40px", background: "red" }}
        ></div>
        <div
          onClick={handleClick}
          style={{ width: "40px", height: "40px", background: "blue" }}
        ></div>
      </div>

      <Canvas
        shadows
        style={{ backgroundColor: "black" }}
        camera={{ position: [25, 25, 15] }}
      >
        {/* <fog attach='fog' args={['white', 1, 10]}/> */}
        {/* <Box position={[0, 0.9, 0]}/> */}
        <ContextProvider.Provider value={{ enableOrbit, setEnableOrbit }}>
          <Orbit />
          <Physics>
            <Bulb position={[10, 15, 0]} />
            <Dragable
            transformGroup
            >
              <Suspense fallback={null}>
                <Model path="/box2.glb" 
            position={[-4,0,0]}
            scale={10}
            />
              </Suspense>
              
              <Suspense fallback={null}>
                <Model
                  scale={10}
                  castShadow
                  path="/modelka/scene.gltf"
                  position={[4, 0, 0]}
                />
                <Bulb position={[0, 15, 0]} />
                <Box position={[0, 10, 6]} scale={1} />
                <Box position={[0, 15, 5]} scale={1} />
              </Suspense>
              <Suspense fallback={null}>
              </Suspense>
            </Dragable>
            {/* <Floor position={[0, -0.25, 0.5]} rotation={[0, 0.9, 0.8]} /> */}
            <Floor position={[0, 0, 0]} rotation={[0, -0.8, 0]} scale={1} />
          </Physics>
        </ContextProvider.Provider>
        <Suspense fallback={null}>
          <Background />
        </Suspense>

        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.5}
          castShadow
          receiveShadow
          shadowBias={-0.0001}
        />

        {/* <orbitControls/> */}
        <axesHelper args={[10]}/>
      </Canvas>
    </div>
  );
}

export default App;
