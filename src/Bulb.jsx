import { useSphere, useBox } from "@react-three/cannon";
const Bulb = (props) => {
  const [ref, api] = useSphere(()=>({mass:3,...props}))

  return (
    <mesh {...props}
    ref={ref}
    api={api}
    >
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.8]} />
      <meshPhongMaterial emissive="red" />
    </mesh>
  );
};

export default Bulb;
