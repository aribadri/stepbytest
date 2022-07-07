import React from "react";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const [ref, api] = useBox(() => ({ mass: 0, ...props }))

  const model = useLoader(GLTFLoader, props.path);
  

  let mixer;
  model.scene.traverse((child) => {
      if (child.isMesh) {
          child.castShadow = true
      }
  })
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
    castShadow
    receiveShadow
    {...props}
      object={model.scene}
      onClick={handleClick}
      ref={ref}
      api={api}
    />
  );
};
export default Model;
