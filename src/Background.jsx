import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react"

const Background = () => {
  const { gl } = useThree();
  const texture = useLoader(THREE.TextureLoader, "/44.jpeg");
  const formatted = useMemo(() =>

      new THREE.WebGLCubeRenderTarget(
        1080
      ).fromEquirectangularTexture(gl, texture)
  , [])

  return <primitive attach="background" object={formatted.texture} />;
};

export default Background;
