// Textures are passed in as uniforms
uniform sampler2D colorMap;

in vec2 texCoord;

void main() {

    // gl_FragColor = vec4(vec3(0.0), 1.0);
    vec4 out_FragColor = normalize(texture(colorMap, texCoord));
    gl_FragColor = out_FragColor;
}