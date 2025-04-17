uniform float uTime;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  
  // Create wave deformation
  float wave = sin(position.x * 5.0 + uTime * 2.0) * uIntensity;
  
  vec3 newPosition = position;
  newPosition.z += wave;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}