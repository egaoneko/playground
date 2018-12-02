import {
  setupPlaneMesh,
  setupSphereMesh
} from "./utils/webgl/mesh-utils";

let gl = null;
let canvas = null;
let container = null;
let glProgram = null;
let fragmentShader = null;
let vertexShader = null;

let vertexPositionAttribute = null;
let vertexNormalAttribute = null;
let vertexColorAttribute = null;
let trianglesVerticeBuffers = [];
let trianglesNormalBuffers = [];
let trianglesColorBuffers = [];
let vertexIndexBuffers = [];

let pMatrix = mat4.create();
let mvMatrix = mat4.create();
let normalMatrix = mat3.create();

let angle = 0.0;

let paused = false;

const SHADER = {
  flat: {
    vertexShader: flatVertexShaderSource(),
    fragmentShader: flatFragmentShaderSource()
  },
  phong: {
    vertexShader: phongVertexShaderSource(),
    fragmentShader: phongFragmentShaderSource()
  },
  gouraud_phong: {
    vertexShader: gouraudPhongVertexShaderSource(),
    fragmentShader: gouraudPhongFragmentShaderSource()
  },
  phong_phong: {
    vertexShader: phongPhongVertexShaderSource(),
    fragmentShader: phongPhongFragmentShaderSource()
  },
  attenuation: {
    vertexShader: attenuationVertexShaderSource(),
    fragmentShader: attenuationFragmentShaderSource()
  },
  spotlight: {
    vertexShader: spotlightVertexShaderSource(),
    fragmentShader: spotlightFragmentShaderSource()
  },
  fog: {
    vertexShader: fogVertexShaderSource(),
    fragmentShader: fogFragmentShaderSource()
  },
  fog_spotlight: {
    vertexShader: fogSpotlightVertexShaderSource(),
    fragmentShader: fogSpotlightFragmentShaderSource()
  },
  cartoon: {
    vertexShader: cartoonVertexShaderSource(),
    fragmentShader: cartoonFragmentShaderSource()
  },
  gooch_vs: {
    vertexShader: goochVsVertexShaderSource(),
    fragmentShader: goochVsFragmentShaderSource()
  },
  gooch_fs: {
    vertexShader: goochFsVertexShaderSource(),
    fragmentShader: goochFsFragmentShaderSource()
  },
};

const radios = document.querySelectorAll('input[type=radio][name="light"]');

window.addEventListener('load', initWebGL);
document.addEventListener('keyup', (evt) => {
  switch (evt.keyCode) {
    case 80: // 'p'
      paused = !paused;
      break;
    default:
      break;
  }
});

function changeHandler() {
  gl.deleteProgram(glProgram);
  createProgram(this.value);
}

Array.prototype.forEach.call(radios, function (radio) {
  radio.addEventListener('change', changeHandler);
});

function initWebGL() {
  canvas = document.querySelector('#canvas');
  container = document.querySelector('#container');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (e) {
    console.error(e);
  }

  if (gl) {
    initShaders();
    setupMeshes();

    (function animLoop() {

      if (!paused) {
        setupWebGL();
        drawScene();
      }

      requestAnimationFrame(animLoop);
    })();
  }
}

function setupWebGL() {
  // set the clear color to a shade of green
  gl.clearColor(0.7, 0.7, 0.7, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);
  mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
}

function initShaders() {
  createProgram('flat');
}

function createProgram(type) {
  // create program
  glProgram = gl.createProgram();
  attachShader(glProgram, type);
  // use program
  gl.useProgram(glProgram);
  getMatrixUniforms();
}

function attachShader(glProgram, type) {
  // get shader source
  const vsSource = SHADER[type].vertexShader;
  const fsSource = SHADER[type].fragmentShader;

  // compile shaders
  vertexShader = makeShader(vsSource, gl.VERTEX_SHADER);
  fragmentShader = makeShader(fsSource, gl.FRAGMENT_SHADER);

  // attach and link shaders to the program
  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);
  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program.');
  }
}

function makeShader(source, type) {
  // compile the shader
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

function setupMeshes() {
  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    0,
    {
      translation: [-1.0, -0.75, 0.0],
      color: [1.0, 0.0, 0.0, 1.0],
      division: 20,
      smoothShading: false
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    1,
    {
      translation: [0.0, 0.0, 1.0],
      color: [0.0, 1.0, 0.0, 1.0],
      division: 10,
      smoothShading: false
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    2,
    {
      translation: [1.0, 0.25, -1.0],
      color: [1.0, 1.0, 0.0, 1.0],
      division: 5,
      smoothShading: false
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    3,
    {
      translation: [-1.0, 1.0, -1.0],
      color: [1.0, 0.0, 1.0, 1.0],
    }
  );

  setupSphereMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    4,
    {
      translation: [-0.0, 1.75, -0.0],
      color: [0.0, 1.0, 1.0, 1.0],
    }
  );


  setupPlaneMesh(
    gl,
    {
      trianglesNormalBuffers,
      trianglesColorBuffers,
      trianglesVerticeBuffers,
      vertexIndexBuffers,
    },
    5,
    {
      translation: [0.0, -1.0, 0.0],
    }
  );

  vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
  vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
  vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexColorAttribute);
  gl.enableVertexAttribArray(vertexNormalAttribute);
}

function drawScene() {
  // sphere
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.4, -6.5]);
  mat4.rotate(mvMatrix, mvMatrix, -0.3, [-0.3, 0.0, 0.2]);
  mat4.rotate(mvMatrix, mvMatrix, angle, [0.0, 1.0, 0.0]);

  const invertedMatrix = mat3.create();
  mat3.fromMat4(invertedMatrix, mvMatrix);
  mat3.invert(normalMatrix, invertedMatrix);
  mat3.transpose(normalMatrix, normalMatrix);
  angle += 0.005;
  setMatrixUniforms();

  for (let i = 0; i < vertexIndexBuffers.length; ++i) {
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[i]);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[i]);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[i]);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    if (i === 4) {
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.blendEquation(gl.FUNC_ADD);
    } else {
      gl.disable(gl.BLEND);
      gl.enable(gl.DEPTH_TEST);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[i]);
    if (i > 2) {
      gl.drawElements(gl.TRIANGLES, vertexIndexBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, trianglesVerticeBuffers[i].numItems);
    }
  }
}

function getMatrixUniforms() {
  glProgram.pMatrixUniform = gl.getUniformLocation(glProgram, 'uPMatrix');
  glProgram.mvMatrixUniform = gl.getUniformLocation(glProgram, 'uMVMatrix');
  glProgram.normalMatrixUniform = gl.getUniformLocation(glProgram, "uNormalMatrix");
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(glProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(glProgram.mvMatrixUniform, false, mvMatrix);
  gl.uniformMatrix3fv(glProgram.normalMatrixUniform, false, normalMatrix);
}

function flatVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform mat4 uPMatrix;    
    uniform mat4 uMVMatrix;
    uniform mat3 uNormalMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 L;
    varying highp vec3 N;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);
      vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - aVertexPosition.xyz));
      vec3 ambientColor = vec3(0.1, 0.1, 0.1);
      
      L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      N = uNormalMatrix * aVertexNormal;
      
      vColor = aVertexColor;
    }
  `;
}

function flatFragmentShaderSource() {
  return `
    varying highp vec3 vColor;
    varying highp vec3 N;
    varying highp vec3 L;
    
    void main(void) {
      highp float lambert = max(dot(normalize(N), normalize(L)), 0.0);
      gl_FragColor = vec4(vColor * lambert, 1.0);
    }
  `;
}

function phongVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;
    }
  `;
}

function phongFragmentShaderSource() {
  return `
    uniform highp mat4 uPMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    
    void main(void) {
      highp vec3 n = uNormalMatrix * N;
      
      highp vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);
      highp vec3 pointLightDirection = normalize(vec3(pointLightPosition.xyz - vPosition.xyz));
      
      highp vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      
      highp float lambert = max(dot(normalize(n), normalize(L)), 0.0);
      gl_FragColor = vec4(vColor * lambert, 1.0);
    }
  `;
}

function gouraudPhongVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;
    
    varying highp vec3 vColor;
    varying highp float diffuseLambert;
    varying highp float specular;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      vColor = aVertexColor;
      
      vec3 pointLightPosition = vec3(1.0, 2.0, -1.0);
      vec3 pointLightDirection = vec3(pointLightPosition.xyz - aVertexPosition.xyz);
      
      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      vec3 N = normalize(uNormalMatrix * aVertexNormal);
      vec3 V = -vec3(uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0));
      
      L = normalize(L);
      V = normalize(V); 
      
      vec3 R = reflect(-L, N);
      float shininess = 128.0;
      
      specular = pow(max(0.0, dot(R, V)), shininess);
      diffuseLambert = dot(L, N);
    }
  `;
}

function gouraudPhongFragmentShaderSource() {
  return ` 
    varying highp vec3 vColor;
    varying highp float diffuseLambert;
    varying highp float specular;
    
    void main(void) {
      highp float AmbientIntensity = 0.3;
      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
      highp float SpecularIntensity = 0.5;
      
      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1);
      highp vec3 DiffuseMaterialColour = vColor;
      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0);
      
      gl_FragColor = vec4(AmbientColour * AmbientIntensity +
        diffuseLambert * DiffuseMaterialColour * DiffuseLightIntensity +
        SpecularColour * specular * SpecularIntensity, 1.0);
    }
  `;
}

function phongPhongVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;
    }
  `;
}

function phongPhongFragmentShaderSource() {
  return ` 
    uniform highp mat4 uPMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;

    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;

    void main(void) {
      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);

      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);
      
      highp mat4 mvp = uPMatrix * uMVMatrix;

      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));
      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));

      highp vec3 l = normalize(L);
      highp vec3 n = normalize(uNormalMatrix * N);
      highp vec3 v = normalize(V);
      
      highp vec3 R = reflect(l, n);

      highp float diffuseLambert = dot(l,n);
      highp float Roughness = 1.0;
      highp float AmbientIntensity = 0.3;
      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
      highp float SpecularIntensity = 0.5;
      highp float shininess = 128.0;

      highp float specular = pow( max(0.0,dot(R,v)), shininess);

      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1);
      highp vec3 DiffuseMaterialColour = vColor.xyz;
      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0);
    
      gl_FragColor = vec4(AmbientColour*AmbientIntensity + 
        diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +
        SpecularColour * specular*SpecularIntensity, 1.0);
    }
  `;
}

function attenuationVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;
    }
  `;
}

function attenuationFragmentShaderSource() {
  return ` 
    uniform highp mat4 uPMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;

    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;

    void main(void) {
      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);

      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);
      highp float d = length(pointLightDirection);
      highp float attenuation = 1.0/(.01 + .01*d+.02*d*d);
      
      highp mat4 mvp = uPMatrix * uMVMatrix;

      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));
      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));

      highp vec3 l = normalize(L);
      highp vec3 n = normalize(uNormalMatrix * N);
      highp vec3 v = normalize(V);
      
      highp vec3 R = reflect(l, n);

      highp float diffuseLambert = dot(l,n);
      highp float Roughness = 1.0;
      highp float AmbientIntensity = 0.3;
      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
      highp float SpecularIntensity = 0.5;
      highp float shininess = 128.0;

      highp float specular = pow(max(0.0,dot(R,v)), shininess);

      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;
      highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;
      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;
    
      gl_FragColor = vec4(AmbientColour*AmbientIntensity + 
        diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +
        SpecularColour * specular*SpecularIntensity, 1.0);
    }
  `;
}

function spotlightVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;
    }
  `;
}

function spotlightFragmentShaderSource() {
  return ` 
    uniform highp mat4 uPMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;

    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;

    void main(void) {
      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);

      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);
      highp float d = length(pointLightDirection);
      highp float attenuation = 1.0/(.01 + .01*d + .02*d*d);
      
      highp mat4 mvp = uPMatrix * uMVMatrix;

      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));
      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));

      highp vec3 l = normalize(L);
      highp vec3 n = normalize(uNormalMatrix * N);
      highp vec3 v = normalize(V);
      
      highp vec3 R = reflect(l, n);

      highp float diffuseLambert = dot(l,n);
      
      // spotlight
      highp float spotCosCutoff = 0.6;
      highp float spotExponent = 2.0;
      highp vec3 spotDirection = vec3(0.5, 0.5, 0.5);
      highp float spotEffect = dot(normalize(spotDirection), l);
      
      if (diffuseLambert > 0.0) {
        if(spotEffect > spotCosCutoff) {
          highp float Roughness = 1.0;
          highp float AmbientIntensity = 0.3;
          highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
          highp float SpecularIntensity = 0.5;
          highp float shininess = 32.0;

          highp float specular = pow(max(0.0,dot(R,v)), shininess);

          highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;
          highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;
          highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;
    
          gl_FragColor = vec4(AmbientColour*AmbientIntensity + 
            diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +
            SpecularColour * specular*SpecularIntensity, 1.0);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    } 
  `;
}

function fogVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    varying highp float fogZ;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;
      fogZ = length(gl_Position.xyz);
    }
  `;
}

function fogFragmentShaderSource() {
  return ` 
    uniform highp mat4 uPMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;

    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    varying highp float fogZ;

    void main(void) {
      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);

      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);
      highp float d = length(pointLightDirection);
      highp float attenuation = 68.0/(.31 + .01*d+.22*d*d);
      
      highp mat4 mvp = uPMatrix * uMVMatrix;

      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));
      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));

      highp vec3 l = normalize(L);
      highp vec3 n = normalize(uNormalMatrix * N);
      highp vec3 v = normalize(V);
      
      highp vec3 R = reflect(l, n);

      highp float diffuseLambert = dot(l,n);
      highp float Roughness = 1.0;
      highp float AmbientIntensity = 0.75;
      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
      highp float SpecularIntensity = 0.8;
      highp float shininess = 128.0;

      highp float specular = pow(max(0.0,dot(R,v)), shininess);

      highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;
      highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;
      highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;
      
      // calculate fog
      highp float fogDensity = 0.25;
      highp vec4 fogColor = vec4(0.1, 0.2, 0.1, 0.6);
      
      highp float fogFactor = exp(-fogDensity * fogDensity * fogZ * fogZ);
      fogFactor = clamp(fogFactor, 0.0, 1.0);
    
      highp vec4 materialColor = vec4(AmbientColour*AmbientIntensity + 
        diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +
        SpecularColour * specular*SpecularIntensity, 1.0);
      
      gl_FragColor = mix(fogColor, materialColor, fogFactor);
    }
  `;
}

function fogSpotlightVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform highp mat4 uPMatrix;    
    uniform highp mat4 uMVMatrix;
    
    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    varying highp float fogZ;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;
      fogZ = length(gl_Position.xyz);
    }
  `;
}

function fogSpotlightFragmentShaderSource() {
  return ` 
    uniform highp mat4 uPMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat3 uNormalMatrix;

    varying highp vec3 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    varying highp float fogZ;

    void main(void) {
      highp vec3 pointLightPosition = vec3(5.0, 1.0, 5.0);

      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);
      highp float d = length(pointLightDirection);
      highp float attenuation = 1.0/(.01 + .01*d + .02*d*d);
      
      highp mat4 mvp = uPMatrix * uMVMatrix;

      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));
      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));

      highp vec3 l = normalize(L);
      highp vec3 n = normalize(uNormalMatrix * N);
      highp vec3 v = normalize(V);
      
      highp vec3 R = reflect(l, n);

      highp float diffuseLambert = dot(l,n);
      
      // spotlight
      highp float spotCosCutoff = 0.6;
      highp float spotExponent = 2.0;
      highp vec3 spotDirection = vec3(0.5, 0.5, 0.5);
      highp float spotEffect = dot(normalize(spotDirection), l);
      
      // calculate fog
      highp float fogDensity = 0.075;
      highp vec4 fogColor = vec4(0.1, 0.2, 0.1, 0.6);
      
      highp float fogFactor = exp(-fogDensity * fogDensity * fogZ * fogZ);
      fogFactor = clamp(fogFactor, 0.0, 1.0);
      
      highp vec4 materialColor = vec4(0.0, 0.0, 0.0, 1.0);
      
      if (diffuseLambert > 0.0) {
        if(spotEffect > spotCosCutoff) {
          highp float Roughness = 1.0;
          highp float AmbientIntensity = 0.3;
          highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
          highp float SpecularIntensity = 0.5;
          highp float shininess = 32.0;

          highp float specular = pow( max(0.0,dot(R,v)), shininess);

          highp vec3 AmbientColour = vec3(0.1, 0.1, 0.1) * attenuation;
          highp vec3 DiffuseMaterialColour = vColor.xyz * attenuation;
          highp vec3 SpecularColour = vec3(1.0, 1.0, 1.0) * attenuation;
    
          materialColor = vec4(AmbientColour*AmbientIntensity + 
            diffuseLambert * DiffuseMaterialColour*DiffuseLightIntensity +
            SpecularColour * specular*SpecularIntensity, 1.0);
        } 
      }
      
      gl_FragColor = mix(fogColor, materialColor, fogFactor); 
    } 
  `;
}

function cartoonVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform mat3 uNormalMatrix;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    varying vec3 vColor;
    varying float diffuseLambert;
    varying float specular;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      vColor = aVertexColor;

      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);
      vec3 pointLightDirection = vec3(pointLightPosition.xyz - aVertexPosition.xyz);
        
      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      vec3 N = normalize(uNormalMatrix * aVertexNormal);         
      vec3 V = -vec3(uPMatrix * uMVMatrix * vec4(aVertexPosition,1.0));

      L = normalize(L);
      V = normalize(V);
        
      vec3 R = reflect(-L, N);
      float shininess = 128.0;
        
      specular = pow(max(0.0,dot(R, V)), shininess);
      diffuseLambert = dot(L, N);
    }
  `;
}

function cartoonFragmentShaderSource() {
  return ` 
    varying highp vec3 vColor;
    varying highp float diffuseLambert;
    
    void main(void) {
      highp vec4 color = vec4( vColor * .1, 1.0);
      
      if (diffuseLambert > 0.9) {
        color = vec4(vColor * .8, 1.0);
      } else if (diffuseLambert > 0.6) {
        color = vec4(vColor * .5, 1.0);
      } else if (diffuseLambert > 0.3){
        color = vec4(vColor * .3, 1.0);
      }
      
      gl_FragColor = color;
      // gl_FragColor = vec4(vColor * floor(diffuseLambert*10.0)*.1, 1.0);         
    }
  `;
}

function goochVsVertexShaderSource() {
  return `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;
    attribute vec3 aVertexNormal;
    
    uniform mat3 uNormalMatrix;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    varying vec3 vColor;
    varying float diffuseLambert;
    varying float specular;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      vColor = aVertexColor;
      
      vec3 pointLightPosition = vec3(1.0,2.0,-1.0);
      vec3 pointLightDirection = vec3(pointLightPosition.xyz - aVertexPosition.xyz);
      
      vec3 L = vec3(uPMatrix * uMVMatrix * vec4(pointLightDirection, 1.0));
      vec3 N = normalize(uNormalMatrix * aVertexNormal);         
      vec3 V = -vec3(uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0));
      
      L = normalize(L);
      V = normalize(V);
      
      vec3 R = reflect(-L, N);
      float shininess = 128.0;
      
      specular = pow(max(0.0,dot(R, V)), shininess);
      diffuseLambert = dot(L, N);
    }
  `;
}

function goochVsFragmentShaderSource() {
  return ` 
    varying highp vec3 vColor;
    varying highp float diffuseLambert;
    varying highp float specular;
    
    void main(void) {
      //below is modified from http://3dshaders.com/shaders/CH15-Gooch.frag.txt
      highp vec3  SurfaceColor = vec3(0.75, 0.75, 0.75);
      highp vec3  WarmColor = vec3(0.6, 0.6, 0.0);
      highp vec3  CoolColor = vec3(0.0, 0.0, 0.6);
      highp float DiffuseWarm = 0.45;
      highp float DiffuseCool = 0.45;
      
      highp vec3 kcool = min(CoolColor + DiffuseCool * SurfaceColor, 1.0);
      highp vec3 kwarm = min(WarmColor + DiffuseWarm * SurfaceColor, 1.0); 
      highp vec3 kfinal = mix(kcool, kwarm, diffuseLambert);
      
      gl_FragColor = vec4(min(kfinal + specular, 1.0), 1.0);
    }
  `;
}

function goochFsVertexShaderSource() {
  return `
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec3 aVertexNormal;
    
    varying highp vec4 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;

    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      
      vColor = aVertexColor;
      vPosition = aVertexPosition;
      N = aVertexNormal;         
    }
  `;
}

function goochFsFragmentShaderSource() {
  return ` 
    uniform highp mat3 uNormalMatrix;
    uniform highp mat4 uMVMatrix;
    uniform highp mat4 uPMatrix;
    
    varying highp vec4 vColor;
    varying highp vec3 vPosition;
    varying highp vec3 N;
    
    void main(void) {        
      highp vec3 pointLightPosition = vec3(1.0,2.0,1.0);
      
      highp vec3 pointLightDirection = vec3(pointLightPosition.xyz - vPosition.xyz);
      
      highp mat4 mvp = uPMatrix * uMVMatrix;
      
      highp vec3 L = vec3(mvp * vec4(pointLightDirection, 1.0));
      highp vec3 V = -vec3(mvp * vec4(vPosition,1.0));
      
      highp vec3 l = normalize(L);
      highp vec3 n = normalize(uNormalMatrix * N);
      highp vec3 v = normalize(V);
      
      highp vec3 R = reflect(l, n);
      
      highp float diffuseLambert = dot(l,n);
      highp float Roughness = 1.0;
      highp vec3 DiffuseLightIntensity = vec3(0.9, 0.9, 0.9);
      highp float SpecularIntensity = 0.5;
      highp float shininess = 128.0;
      
      highp float specular = pow( max(0.0,dot(R,v)), shininess);
    
      //below is modified from http://3dshaders.com/shaders/CH15-Gooch.frag.txt
      highp vec3  SurfaceColor = vec3(0.75, 0.75, 0.75);
      highp vec3  WarmColor = vec3(0.6, 0.6, 0.0);
      highp vec3  CoolColor = vec3(0.0, 0.0, 0.6);
      highp float DiffuseWarm = 0.45;
      highp float DiffuseCool = 0.45;
      
      highp vec3 kcool = min(CoolColor + DiffuseCool * SurfaceColor, 1.0);
      highp vec3 kwarm = min(WarmColor + DiffuseWarm * SurfaceColor, 1.0); 
      highp vec3 kfinal = mix(kcool, kwarm, diffuseLambert);
      
      gl_FragColor = vec4(min(kfinal + specular, 1.0), 1.0);
    }
  `;
}

