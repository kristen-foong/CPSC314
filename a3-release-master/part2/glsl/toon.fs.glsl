// HINT: Don't forget to define the uniforms here after you pass them in in A3.js

uniform vec3 toonColor;
uniform vec3 toonColor2;
uniform vec3 outlineColor;

// The value of our shared variable is given as the interpolation between normals computed in the vertex shader
// below we can see the shared variable we passed from the vertex shader using the 'in' classifier
in vec3 interpolatedNormal;
in vec3 lightDirection;
in vec3 viewPosition;
in float fresnel;

varying vec3 viewDirection;
varying vec3 viewNormal;

void main() {
    // HINT: Compute the light intensity the current fragment by determining
    // the cosine angle between the surface normal and the light vector
    // float intensity = 1.0;
    float intensity = dot(normalize(lightDirection), normalize(interpolatedNormal));

    // HINT: Define ranges of light intensity values to shade. GLSL has a
    // built-in `ceil` function that you could use to determine the nearest
    // light intensity range.
    float step1 = 0.8;
    float step2 = 0.5;
    float step3 = 0.0;
    
    // HINT: You should use two tones of colors here; `toonColor` is a cyan
    // color for brighter areas and `toonColor2` is a blue for darker areas.
    // Use the light intensity to blend the two colors, there should be 3 distinct
    // colour regions 
    // vec3 out_Toon = mix(toonColor, toonColor2, 1.0 - intensity);
    vec3 out_Toon = mix(toonColor2, toonColor, 0.0);
    if (intensity > step1) {
        out_Toon = mix(toonColor2, toonColor, 1.5);
    } else if (intensity > step2) {
        out_Toon = mix(toonColor2, toonColor, 1.0);
    } else if (intensity > step3) {
        out_Toon = mix(toonColor2, toonColor, 0.0);
    }

    // HINT: To achieve the toon silhouette outline, set a dark fragment color
    // if the current fragment is located near the edge of the 3D model.
    // Use a reasonable value as the threshold for the silhouette thickness
    // (i.e. proximity to edge).
    float silhouette = abs(dot(normalize(interpolatedNormal), normalize(viewPosition)));
    if (silhouette < 0.3) {
        out_Toon = outlineColor;
    }


    gl_FragColor = vec4(out_Toon, 1.0);
}
