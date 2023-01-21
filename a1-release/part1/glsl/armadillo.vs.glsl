// The uniform variable is set up in the javascript code and the same for all vertices
uniform vec3 orbPosition;

// This is a "varying" variable and interpolated between vertices and across fragments.
// The shared variable is initialized in the vertex shader and passed to the fragment shader.
out float vcolor;
out float orbDistance;

// position of armadillo
out vec4 armadilloPos;

void main() {

    // Q1C:
    // HINT: GLSL PROVIDES THE DOT() FUNCTION 
  	// HINT: SHADING IS CALCULATED BY TAKING THE DOT PRODUCT OF THE NORMAL AND LIGHT DIRECTION VECTORS
    // vcolor = 0.5; // REPLACE ME  
    
    armadilloPos =  modelMatrix * vec4(position, 1.0); // armadillo position in world space
    vec3 lightDir = normalize(orbPosition - armadilloPos.xyz); // light vector
 
    // make normal with regards to world space instead of armadillo space: 
    // mat3(transpose(inverse(modelMatrix)))
    // then dot prod normal & lightDir vectors

    // armadillo rotating lighting?? inv(transpose(modelMatrix) * vec4(normal, 0)
    vcolor = max(dot(normalize(mat3(transpose(inverse(modelMatrix))) * normal), lightDir), 0.0);

    // Q1D:
    // HINT: Compute distance in World coordinate to make the magnitude easier to interpret
    // HINT: GLSL has a build-in distance() function
    // orbDistance = 1.0;// REPLACE ME
    orbDistance = distance(orbPosition, armadilloPos.xyz); 

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
