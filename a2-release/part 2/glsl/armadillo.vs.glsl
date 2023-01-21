
uniform vec3 lightPosition;

out vec3 colour;

void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);

    vec3 vertexNormal = normalize(normalMatrix*normal);

    vec3 lightDirection = normalize(vec3(viewMatrix*(vec4(lightPosition - worldPos.xyz, 0.0))));

    float vertexColour = dot(lightDirection, vertexNormal);
    colour = vec3(vertexColour);

    gl_Position = projectionMatrix * viewMatrix * worldPos;   
}