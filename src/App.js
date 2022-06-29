import './App.css';
import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber'
import { useRef, Suspense, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend ({OrbitControls})
function App() {
const [isOrbit, setIsOrbit] = useState(true)
console.log(isOrbit);
  const Orbit = props => {
    const {camera, gl} = useThree()
return(
<orbitControls args={[camera, gl.domElement]} {...props}/>
)
      
    
  }

  const rotate = () => {
    let a = 0
    for (let index = 0; index < 10; index++) {
      setInterval(() => {
        a = index
      }, 1000);
    }
    return a
  }
  const Background = () => {
    const {gl} = useThree()
    const texture = useLoader(THREE.TextureLoader, '/44.jpeg')
    const formatted = new THREE.WebGLCubeRenderTarget(
      1080).fromEquirectangularTexture(gl, texture)

    return (
<primitive 
attach='background'
object={formatted.texture}
/>
    )
  }

  let orbitActive
  
  const Box = (props) => {
    const ref = useRef()
    const texture = useLoader(THREE.TextureLoader, '/33.png')
    useFrame(() =>{

      ref.current.position.x +=0.015
      ref.current.rotation.y +=0.01

      ref.current.rotation.z +=0.003



    }) 
    const handlePointerDown = (e) => {
      setIsOrbit(false)
      console.log(e);
  


     
    }
    const handlePointerLeave = (e) => {
      // e.object.scale.x = 1
      // e.object.scale.y = 1
      // e.object.scale.z = 1
     
   }
   const handlePointerEnter = (e) => {
    // e.object.scale.x = 2
    // e.object.scale.x = 4
    // e.object.scale.y = 4
    // e.object.scale.z = 4
 } 
    
    return (
    <mesh ref={ref} {...props} 
    castShadow 
    onPointerDown={handlePointerDown}
    onPointerLeave={handlePointerLeave}
    onPointerEnter={handlePointerEnter}
    // receiveShadow 
    >
    <boxBufferGeometry/>
    <meshPhysicalMaterial color='white'
    map={texture}
    // transparent
    // roughness={0}
    // clearcoat={1}
    // transmission={0.5}
    // reflectivity={1}
    // side={THREE.DoubleSide}

    />
  </mesh>
  )
  }

  const Floor  = props =>{
    const texture = useLoader(THREE.TextureLoader, '/9.jpeg')

    return (
      <mesh {...props} receiveShadow>
        <boxBufferGeometry args={[20, 0.5, 20]}/>
        <meshPhysicalMaterial color='grey'
    map={texture}
    /> 
      </mesh>
    )
  }
   const Bulb = props =>{
     return (
     <mesh {...props}>
    <pointLight castShadow/> 
        <sphereBufferGeometry args={[0.8]} /> 
        <meshPhongMaterial emissive='white'/>
     </mesh>
     )
   }
  

  return (
    <div id="root">
<Canvas 
shadows
style={{backgroundColor: 'black'}} camera={{position: [10, 10, 3]}}>
    {/* <fog attach='fog' args={['white', 1, 10]}/> */}
    {/* <Box position={[0, 0.9, 0]}/> */}
    <Suspense fallback={null}>
      <Orbit enabled={isOrbit}/>
    <Box position={[0, 5, 0]}
    scale = {3}
    />
    </Suspense>
    <Suspense fallback={null}>
    <Background/>
    </Suspense>
    {/* <Bulb position={[0, 10, 0]}/> */}
    <Bulb position={[10, 15, 0]}/>

  

    <Floor position={[0, -0.25, 0.5]}/>
    <ambientLight intensity={0.5} />

    {/* <orbitControls/> */}
    {/* <axesHelper args={[10]}/> */}
</Canvas>
    </div>
  );
}
 
export default App;
 