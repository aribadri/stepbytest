import React from "react";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const [ref, api] = useBox(() => ({ mass: 4.5, ...props }));

  const model = useLoader(GLTFLoader, props.path);
  console.log(model);
  let mixer;
  const handleClick = () => {
    if (model.animations.length) {
      mixer = new THREE.AnimationMixer(model.scene);
      model.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }
  };
  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return (
    <primitive
      object={model.scene}
      onClick={handleClick}
      scale={10}
      ref={ref}
      api={api}
    />
  );
};
export default Model;
