varying vec3 interpolatedNormal;

void main() {

 	// HINT: Q1b, Set final rendered color surface normals
  	// gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // REPLACE ME
	gl_FragColor = vec4(interpolatedNormal, 1.0);
}
