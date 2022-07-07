// import { useLoader } from "@react-three/fiber";
// import * as THREE from "three";
// import { useBox } from '@react-three/cannon'
const Floor = (props) => {
    // const [ref, api] = useBox(()=>({args:[20, 0.5, 20],rotation:props.rotation, position:props.position}))
//   const texture = useLoader(THREE.TextureLoader, "/9.jpeg");

  return (
    <mesh {...props} receiveShadow
    rotation={props.rotation}
    r>
      <boxBufferGeometry args={[50, 0.5, 50]} />
      <meshPhysicalMaterial color="white" 
    //   map={texture} 
      />
    </mesh>
  );
};

export default Floor;
