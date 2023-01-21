
uniform float time;
out vec3 interpolatedNormal;

void main() {

    interpolatedNormal = normal;

    // TODO Q4 transform the vertex position to create deformations
    // Make sure to change the size of the orb sinusoidally with time.
    // The deformation must be a function on the vertice's position on the sphere.
    mat3 scaleMat = mat3(1.5);
    float sinusodial = sin(3.14*time);
    // scale
    scaleMat[0][0] = scaleMat[0][0] + sinusodial;
    scaleMat[1] = scaleMat[1] + sinusodial;
    scaleMat[2] = scaleMat[2] + sinusodial; 
    // vec3 modifiedPos = /* TODO Q4 */ * position;
    vec3 modifiedPos = scaleMat * position;

    // Multiply each vertex by the model matrix to get the world position of each vertex, 
    // then the view matrix to get the position in the camera coordinate system, 
    // and finally the projection matrix to get final vertex position.
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(modifiedPos, 1.0);
}
