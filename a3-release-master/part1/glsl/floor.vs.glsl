out vec2 texCoord;

void main() {
    // HINT: pass texture coords to fragment shader

    texCoord = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}