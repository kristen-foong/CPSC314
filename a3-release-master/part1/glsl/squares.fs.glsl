// HINT: Don't forget to define the uniforms here after you pass them in in A3.js

// The value of our shared variable is given as the interpolation between normals computed in the vertex shader
// below we can see the shared variable we passed from the vertex shader using the 'in' classifier
in vec3 interpolatedNormal;
in vec3 lightDirection;
in vec3 vertexPosition;

uniform vec3 squareColor;
uniform vec3 squareColor2;

uniform float ticks;

void main() {
    // HINT: Compute the light intensity the current fragment by determining
    // the cosine angle between the surface normal and the light vector.
    float intensity = dot(normalize(lightDirection), normalize(interpolatedNormal));;

    // HINT: Pick any two colors and blend them based on light intensity
    // to give the 3D model some color and depth.
    // vec3 out_Stripe = vec3(0.5);
    vec3 out_Stripe = mix(squareColor, squareColor2, intensity);

    float time = ticks/10.0;

    if (!(mod(vertexPosition.x+time, 0.1) < 0.09 && 
        mod(vertexPosition.y+time, 0.1) < 0.09 && 
        mod(vertexPosition.z+time, 0.1) < 0.09)) {
        discard;
    }
    

    // HINT: Set final rendered colour
    gl_FragColor = vec4(out_Stripe, 1.0);
}
