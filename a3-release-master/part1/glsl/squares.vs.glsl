// The uniform variable is set up in the javascript code and the same for all vertices
uniform vec3 spherePosition;

// The shared variable is initialized in the vertex shader and attached to the current vertex being processed,
// such that each vertex is given a shared variable and when passed to the fragment shader,
// these values are interpolated between vertices and across fragments,
// below we can see the shared variable is initialized in the vertex shader using the 'out' classifier
out vec3 interpolatedNormal;
out vec3 lightDirection;
out vec3 vertexPosition;

void main() {
    vertexPosition = position;

    vec3 viewPosition = vec3(viewMatrix * modelMatrix * vec4(position, 1.0));
    lightDirection = normalize(vec3(viewMatrix * vec4(spherePosition, 1.0)) - viewPosition);

    interpolatedNormal = normalize(normalMatrix * normal);

    // Multiply each vertex by the model matrix to get the world position of each vertex, 
    // then the view matrix to get the position in the camera coordinate system, 
    // and finally the projection matrix to get final vertex position
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
