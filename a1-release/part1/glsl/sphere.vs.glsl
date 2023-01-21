// The uniform variable is set up in the javascript code and the same for all vertices
uniform vec3 orbPosition;

// Q1b shared vector for normals
varying vec3 interpolatedNormal;

void main() {

    // HINT: Q1b, Interpolate the normals here for the fragment shader
    
    interpolatedNormal = normal;

    // Multiply each vertex by the model matrix to get the world position of each vertex, 
    // then the view matrix to get the position in the camera coordinate system, 
    // and finally the projection matrix to get final vertex position.
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position + orbPosition - vec3(0.0,1.0,0.0), 1.0);

}
