import { DragControls } from "three/examples/jsm/controls/DragControls";
import { extend, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, useContext } from "react";
import ContextProvider from "./ContextProvider";
extend({ DragControls });

const Dragable = (props) => {
  const { enableOrbit, setEnableOrbit } = useContext(ContextProvider);
  const [children, setChildren] = useState([]);
  const groupRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    setChildren(groupRef.current.children);
    setEnableOrbit(true);
  }, [setEnableOrbit, setChildren]);

  useEffect(() => {
    controlsRef.current.addEventListener(
      "hoveron",
      (e) => setEnableOrbit(false)
    
    
    );
    controlsRef.current.addEventListener("hoveroff", (e) =>
      setEnableOrbit(true)
    );
    controlsRef.current.addEventListener("dragstart", (e) =>
    e.object.api.mass.set(0)
  );
  controlsRef.current.addEventListener("dragend", (e) =>
  e.object.api.mass.set(1)

);
    controlsRef.current.addEventListener("drag", (e) =>{
        console.log(e.object);

        e.object.api.position.copy(e.object.position)
        e.object.api.velocity.set(0, 0, 0)
    }

  );
  }, [children, enableOrbit, setEnableOrbit]);
  const { camera, gl } = useThree();

  return (
    <group ref={groupRef}>
      <dragControls
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  );
};
export default Dragable;
