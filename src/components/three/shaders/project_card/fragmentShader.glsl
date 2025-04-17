uniform float time;
uniform sampler2D uTexture;
uniform float uBlur;

varying vec2 vUv;

float PI = 3.1415926538;

vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, float intensity) {
	vec4 color = vec4(0.0);
	vec2 off1 = vec2(1.411764705882353) * intensity;
	vec2 off2 = vec2(3.2941176470588234) * intensity;
	vec2 off3 = vec2(5.176470588235294) * intensity;
	
	color += texture2D(image, uv) * 0.1964825501511404;
	color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
	color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
	color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
	color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
	color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
	color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
	
	return color;
}

void main() {
	vec2 resolution = vec2(1024.0);
	vec4 blurredColor = blur13(uTexture, vUv, resolution, uBlur);
	gl_FragColor = blurredColor;
}