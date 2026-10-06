import { MeshStandardMaterial } from 'three';

/**
 * Hair material: MeshStandardMaterial + procedural coil grooves (bump + groove shading) computed from the
 * blob's local position, so every instanced blob reads as a tight curl instead of a smooth ball.
 * No textures; the light version skips the bump for cheaper fragments.
 */
export function makeHairMaterial(withBump: boolean): MeshStandardMaterial {
  const m = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.58, metalness: 0, envMapIntensity: 0.35 });
  m.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vCurlPos;\nvarying float vCurlSeed;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vCurlPos = position;
        #ifdef USE_INSTANCING
          vCurlSeed = fract(dot(instanceMatrix[3].xyz, vec3(12.9898, 78.233, 37.719)));
        #else
          vCurlSeed = 0.37;
        #endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vCurlPos;
        varying float vCurlSeed;
        float curlHeight(vec3 p, float s) {
          vec3 q = normalize(p);
          float th = atan(q.z, q.x);
          float a = sin(th * 3.0 + q.y * 9.0 + s * 31.0);
          float b = sin(th * 5.0 - q.y * 6.5 + s * 17.0);
          return a * 0.65 + b * 0.35;
        }
        vec3 curlPerturb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDir) {
          vec3 sx = normalize(dFdx(surf_pos)), sy = normalize(dFdy(surf_pos));
          vec3 r1 = cross(sy, surf_norm), r2 = cross(surf_norm, sx);
          float det = dot(sx, r1) * faceDir;
          vec3 grad = sign(det) * (dHdxy.x * r1 + dHdxy.y * r2);
          return normalize(abs(det) * surf_norm - grad);
        }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        float curlH = curlHeight(vCurlPos, vCurlSeed);
        diffuseColor.rgb *= 0.62 + 0.38 * smoothstep(-0.7, 0.8, curlH);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        ${withBump ? 'normal = curlPerturb(-vViewPosition, normal, vec2(dFdx(curlH), dFdy(curlH)) * 0.55, faceDirection);' : ''}`);
  };
  m.customProgramCacheKey = () => `afro-curl-${withBump ? 1 : 0}`;
  return m;
}
