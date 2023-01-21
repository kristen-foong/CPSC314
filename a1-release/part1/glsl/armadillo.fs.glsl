// The value of the "varying" variable is interpolated between values computed in the vertex shader
// The varying variable we passed from the vertex shader is identified by the 'in' classifier
in float vcolor;
in float orbDistance;

// This is defined as a constant radius
float minDistance = 2.0;

// position of armadillo
in vec4 armadilloPos;

void main() {
 	// HINT: For part C, set the color of the armadillo based on the vcolor
	//gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); 
	gl_FragColor = vec4(vcolor, vcolor, vcolor, 1.0);
	if (orbDistance < minDistance) {
		gl_FragColor = vec4(0, vcolor, 0, 1.0);
	}

	// HINT: For part D, only color it green within the proximity
	if (orbDistance < minDistance) {
		gl_FragColor = vec4(0, vcolor, 0, 1.0);
	}
}