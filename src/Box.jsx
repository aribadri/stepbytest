import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBox } from "@react-three/cannon";

const Box = (props) => {
  const [ref, api] = useBox(()=>({mass:0.5,...props}))
  const texture = useLoader(THREE.TextureLoader, "/33.png");

  
  const handlePointerDown = (e) => {
    e.object.active = true;
    window.activeMesh = e.object;
  };
//   const handlePointerLeave = (e) => {

//     e.object.scale.x = 1;
//     e.object.scale.y = 1;
//     e.object.scale.z = 1;
//   };


  return (
    <mesh
      ref={ref}
      api={api}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
    //   onPointerLeave={handlePointerLeave}
    //   onPointerEnter={handlePointerEnter}
      // receiveShadow
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial
        color="white"
        map={texture}
        // transparent
        // roughness={0}
        // clearcoat={1}
        // transmission={0.5}
        // reflectivity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Box;
