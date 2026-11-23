/* ==========================================================================
   ARSALAN.GITHUB — GPU RAYMARCHED LIQUID MERCURY PHYSICS ENGINE (V2 ULTRA)
   - Dynamic Velocity-Based Fluid Stretching
   - Interactive Click Shockwaves & Surface Ripples
   - Chromatic Aberration & Platinum Specular Optics
   - Real-Time Ferrofluid Magnetic Tendrils
   ========================================================================== */

(function() {
  const container = document.getElementById('webgl-glass-container');
  const canvas = document.getElementById('webgl-glass-canvas');
  if (!container || !canvas) return;

  const gl = canvas.getContext('webgl', { antialias: true, alpha: true, powerPreference: 'high-performance' }) ||
             canvas.getContext('experimental-webgl');

  if (!gl) return;

  // Vertex Shader (Screen Quad)
  const vsSource = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // Fragment Shader: High-Fidelity Molten Chrome with Velocity & Shockwaves
  const fsSource = `
    precision highp float;
    varying vec2 vUv;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform vec2 u_velocity;
    uniform float u_mouse_active;
    uniform float u_time;
    uniform vec2 u_shock_pos;
    uniform float u_shock_time;

    // Polynomial smooth minimum for organic liquid metaball blending
    float smin(float a, float b, float k) {
      float h = max(k - abs(a - b), 0.0) / k;
      return min(a, b) - h * h * h * k * (1.0 / 6.0);
    }

    // Sphere Signed Distance Field
    float sdSphere(vec3 p, float r) {
      return length(p) - r;
    }

    // Scene Distance Field
    float map(vec3 p) {
      float t = u_time * 0.95;

      // Click Shockwave Ring Ripple
      float shockDist = length(p.xy - u_shock_pos);
      float shockWave = 0.0;
      if (u_shock_time > 0.0 && u_shock_time < 2.0) {
        float waveRadius = u_shock_time * 1.8;
        float waveDist = abs(shockDist - waveRadius);
        shockWave = sin(waveDist * 18.0) * exp(-waveDist * 4.0) * exp(-u_shock_time * 2.0) * 0.12;
      }

      // Harmonic fluid ripple based on cursor velocity
      float velMag = length(u_velocity);
      float liquidRipple = sin(p.x * 5.0 + t * 1.5) * cos(p.y * 5.0 + t * 1.2) * (0.025 + velMag * 0.06);

      // Central liquid core with fluid deformation
      vec3 corePos = vec3(0.0, sin(t * 0.7) * 0.09, 0.0);
      corePos.xy += u_velocity * 0.15; // Viscous lag in direction of movement
      float d = sdSphere(p - corePos, 0.68 + liquidRipple + shockWave);

      // Magnetic attractor target from mouse
      vec3 target = vec3(u_mouse.x * 1.65, u_mouse.y * 1.25, 0.25);

      // 7 Satellite Molten Droplets forming organic ferrofluid tendrils
      for (int i = 0; i < 7; i++) {
        float fi = float(i);
        float angle = fi * 0.897 + t * 0.6; // 2*PI / 7
        
        // Base orbit with harmonic expansion
        float r = 0.58 + sin(t * 1.4 + fi * 1.8) * 0.22;
        vec3 baseOrbit = vec3(cos(angle) * r, sin(angle) * r, sin(angle * 2.5) * 0.25);
        
        // Magnetic stretch toward target with velocity skew
        vec3 dropTarget = target + vec3(u_velocity.x * sin(fi), u_velocity.y * cos(fi), 0.0) * 0.4;
        vec3 dropPos = mix(baseOrbit, dropTarget + baseOrbit * 0.28, u_mouse_active * 0.82);
        
        float dropRadius = 0.18 + sin(fi * 2.3 + t * 1.2) * 0.06;
        float dropDist = sdSphere(p - dropPos, dropRadius);

        d = smin(d, dropDist, 0.35); // Viscous surface tension blend
      }

      return d;
    }

    // Normal calculation
    vec3 calcNormal(vec3 p) {
      const vec2 e = vec2(0.002, 0.0);
      return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
      ));
    }

    // Procedural Studio HDRI Environment Reflection with Platinum Highlights
    vec3 studioEnvironment(vec3 rayDir) {
      float topSoftbox = smoothstep(0.15, 0.95, rayDir.y);
      float keyLight = pow(max(dot(rayDir, normalize(vec3(0.55, 0.75, 0.5))), 0.0), 24.0);
      float rimLight = pow(max(dot(rayDir, normalize(vec3(-0.75, -0.2, -0.65))), 0.0), 12.0);
      float fillLight = pow(max(dot(rayDir, normalize(vec3(0.1, -0.8, -0.4))), 0.0), 6.0) * 0.2;

      vec3 col = vec3(0.025, 0.028, 0.038); // Deep obsidian void
      col += vec3(0.9, 0.94, 1.0) * topSoftbox * 0.85;
      col += vec3(1.0, 1.0, 1.0) * keyLight * 2.8;
      col += vec3(0.7, 0.75, 0.88) * rimLight * 1.5;
      col += vec3(0.3, 0.35, 0.45) * fillLight;
      return col;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

      // Camera setup
      vec3 ro = vec3(0.0, 0.0, 2.5);
      vec3 rd = normalize(vec3(uv, -1.35));

      // Raymarching
      float t = 0.0;
      float d = 0.0;
      vec3 p = ro;
      bool hit = false;

      for (int i = 0; i < 54; i++) {
        p = ro + rd * t;
        d = map(p);
        if (d < 0.001) {
          hit = true;
          break;
        }
        if (t > 4.5) break;
        t += d * 0.82;
      }

      if (hit) {
        vec3 n = calcNormal(p);
        vec3 refl = reflect(rd, n);

        // Chromatic dispersion at grazing angles (Platinum/Titanium edge sheen)
        vec3 reflR = reflect(rd, normalize(n + vec3(0.015, 0.0, 0.0)));
        vec3 reflG = refl;
        vec3 reflB = reflect(rd, normalize(n - vec3(0.015, 0.0, 0.0)));

        float rCol = studioEnvironment(reflR).r;
        float gCol = studioEnvironment(reflG).g;
        float bCol = studioEnvironment(reflB).b;
        vec3 envColor = vec3(rCol, gCol, bCol);

        // Liquid Mercury Fresnel (increases sharply at grazing angles)
        float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);
        
        vec3 liquidBase = vec3(0.94, 0.96, 1.0);
        vec3 finalColor = mix(liquidBase * envColor, vec3(1.0), fresnel * 0.9);

        // Specular glint
        vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
        float spec = pow(max(dot(refl, lightDir), 0.0), 36.0);
        finalColor += vec3(spec * 1.5);

        gl_FragColor = vec4(finalColor, 1.0);
      } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      }
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0,
  ]), gl.STATIC_DRAW);

  // Uniform locations
  const positionLocation = gl.getAttribLocation(program, 'position');
  const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
  const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
  const velocityLoc = gl.getUniformLocation(program, 'u_velocity');
  const mouseActiveLoc = gl.getUniformLocation(program, 'u_mouse_active');
  const timeLoc = gl.getUniformLocation(program, 'u_time');
  const shockPosLoc = gl.getUniformLocation(program, 'u_shock_pos');
  const shockTimeLoc = gl.getUniformLocation(program, 'u_shock_time');

  function handleResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * Math.min(window.devicePixelRatio, 1.5);
    canvas.height = h * Math.min(window.devicePixelRatio, 1.5);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // Interactive Physics State
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let prevTargetX = 0, prevTargetY = 0;
  let velX = 0, velY = 0;
  let targetVelX = 0, targetVelY = 0;
  let mouseActive = 0, targetMouseActive = 0;

  // Shockwave state
  let shockTime = -1.0;
  let shockPosX = 0, shockPosY = 0;

  function updatePointer(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    prevTargetX = targetMouseX;
    prevTargetY = targetMouseY;

    targetMouseX = (x / rect.width) * 2.0 - 1.0;
    targetMouseY = -((y / rect.height) * 2.0 - 1.0);

    targetVelX = (targetMouseX - prevTargetX) * 2.5;
    targetVelY = (targetMouseY - prevTargetY) * 2.5;

    targetMouseActive = 1.0;
  }

  function triggerShockwave(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    shockPosX = (x / rect.width) * 2.0 - 1.0;
    shockPosY = -((y / rect.height) * 2.0 - 1.0);
    shockTime = 0.0;
  }

  container.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
  container.addEventListener('mouseleave', () => { 
    targetMouseActive = 0.0; 
    targetVelX = 0; 
    targetVelY = 0; 
  });
  container.addEventListener('click', (e) => triggerShockwave(e.clientX, e.clientY));

  container.addEventListener('touchstart', (e) => {
    if (e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      triggerShockwave(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  container.addEventListener('touchend', () => { 
    targetMouseActive = 0.0; 
    targetVelX = 0; 
    targetVelY = 0; 
  });

  // Render Loop
  let lastTime = performance.now();
  let startTime = lastTime;

  function render() {
    requestAnimationFrame(render);

    const now = performance.now();
    const dt = (now - lastTime) * 0.001;
    lastTime = now;
    const currentTime = (now - startTime) * 0.001;

    // Advance shockwave
    if (shockTime >= 0.0) {
      shockTime += dt * 1.6;
      if (shockTime > 2.5) shockTime = -1.0;
    }

    // Spring physics integration
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
    velX += (targetVelX - velX) * 0.12;
    velY += (targetVelY - velY) * 0.12;
    targetVelX *= 0.85; // Viscous decay
    targetVelY *= 0.85;
    mouseActive += (targetMouseActive - mouseActive) * 0.07;

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
    gl.uniform2f(mouseLoc, mouseX, mouseY);
    gl.uniform2f(velocityLoc, velX, velY);
    gl.uniform1f(mouseActiveLoc, mouseActive);
    gl.uniform1f(timeLoc, currentTime);
    gl.uniform2f(shockPosLoc, shockPosX, shockPosY);
    gl.uniform1f(shockTimeLoc, shockTime);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  render();
})();
