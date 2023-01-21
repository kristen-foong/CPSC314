
uniform vec3 ambientColor;
uniform float kAmbient;

uniform vec3 diffuseColor;
uniform float kDiffuse;

uniform vec3 specularColor;
uniform float kSpecular;
uniform float shininess;

uniform mat4 modelMatrix;

uniform vec3 spherePosition;

// The value of our shared variable is given as the interpolation between normals computed in the vertex shader
// below we can see the shared variable we passed from the vertex shader using the 'in' classifier
in vec3 interpolatedNormal;
in vec3 viewPosition;
in vec3 worldPosition;

varying vec4 fragPos;


vec3 calculateAmbient(){
    // return vec3(1.0);
    return kAmbient*ambientColor;
}

vec3 calculateDiffuse(vec3 normal, vec3 lightDirection){
    // return vec3(1.0);

    // from textbook
    // vec3 toLight = normalize(lightDirection - viewPosition);
    // vec3 normalizedNICF = normalize(normalInCameraFrame);
    // float diffuse = max(0.0, dot(normalizedNICF, normalize(lightDirection)));
    // vec3 intensity = diffuseColor * diffuse;
    // return vec3(intensity.x, intensity.y, intensity.z);

    float diffuse = max(dot(normal, lightDirection), 0.0);
    return kDiffuse * diffuse * diffuseColor;
}


vec3 calculateSpecular(vec3 normal, vec3 lightDirection){
    // HINT: Make sure to use the Jim Blinn's modification to the Phong Model (Blinn-Phong reflectance)
    // See textbook, Section 14.3
    // return vec3(1.0);

    // from textbook
    // vec3 toLight = normalize(lightDirection - viewPosition);
    // vec3 toV = -normalize(viewPosition); 
    // vec3 h = normalize(toV + toLight);
    // float specular = pow(max(0.0, dot(h, normal)), 0.64);
    // float diffuse = max(0.0, dot(normal, toLight));
    // vec3 intensity = vec3((0.1,0.1,0.1) + specularColor * diffuseColor + vec3(0.6,0.6,0.6) * specular);
    // return vec3(intensity.x, intensity.y, intensity.z);

    float diffuse = max(dot(normal, lightDirection), 0.0);
    float spec = 0.0;
    // specular modified from https://learnopengl.com/Lighting/Basic-Lighting
    vec3 reflectDir = normalize(reflect(-lightDirection, normal));
    vec3 viewDir = normalize(viewPosition - vec3(fragPos));
    spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    return kSpecular * spec * specularColor;
}

void main() {
    

    vec3 normal = normalize(mat3(transpose(inverse(modelMatrix))) * interpolatedNormal);


    vec3 lightDirection = normalize(spherePosition - worldPosition);

    // HINT: Implement the following 3 functions
    vec3 out_Ambient = calculateAmbient();
    vec3 out_Diffuse = calculateDiffuse(normal, lightDirection);
    vec3 out_Specular = calculateSpecular(normal, lightDirection);

    // vec3 out_Color = vec3(1.0);
    vec3 out_Color = vec3(out_Ambient + out_Diffuse + out_Specular);

    gl_FragColor = vec4(clamp(out_Color, 0.0, 1.0), 1.0);
}
