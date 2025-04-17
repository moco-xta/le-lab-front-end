uniform float time;
uniform float uIsOdd;
uniform float uZoom;
uniform float uScrollSpeed;
uniform float uScrollDirection;
uniform float uIsMobile;
varying vec2 vUv;

float PI = 3.1415926538;

void main() {
	vec3 pos = position;
	vUv = uv;

	vec2 centeredUv = uv - vec2(0.5);
	vec2 zoomedUv = centeredUv / uZoom;
	vUv = zoomedUv + vec2(0.5);

	float stretchFactor = uScrollSpeed * 0.01;
	if (uScrollDirection > 0.0) {
		pos.z += pow(abs(pos.y - 1.0), 2.0) * stretchFactor;
	} else {
		pos.z += pow(abs((1.0 - pos.y) - 1.0), 2.0) * stretchFactor;
	}

	if (uIsMobile != 1.0) {
		if (uIsOdd > 0.0) {
			pos.x += pow(abs(pos.y - 1.0), 2.0) * stretchFactor;
		} else {
			pos.x -= pow(abs(pos.y - 1.0), 2.0) * stretchFactor;
		}
	}

	vUv.y += sin(time) * 0.02;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}