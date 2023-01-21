in vec3 interpolatedNormal;
uniform float time;

void main() {
  	gl_FragColor = vec4(interpolatedNormal, 1.0);
}
