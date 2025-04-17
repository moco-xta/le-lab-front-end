varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;
uniform vec3 uColor;

void main() {
  // Add some lighting based on normals
  float lighting = dot(vNormal, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
  
  // Create pulsating effect
  float pulse = sin(uTime) * 0.1 + 0.9;
  
  gl_FragColor = vec4(uColor * lighting * pulse, 1.0);
}