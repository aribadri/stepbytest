import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree, extend } from "@react-three/fiber";
import ContextProvider from "./ContextProvider";
import { useContext } from "react";

extend({ OrbitControls });

const Orbit = (props) => {
  const { enableOrbit } = useContext(ContextProvider);
  console.log(enableOrbit);
  const { camera, gl } = useThree();
  return (
    <orbitControls
      enabled={enableOrbit}
      attach="OrbitControls"
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};
export default Orbit;
