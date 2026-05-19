import * as THREE from "three";

const tempVector = new THREE.Vector3();
const tempColor = new THREE.Color();

function createBone(name, x, y, z) {
  const bone = new THREE.Bone();
  bone.name = name;
  bone.position.set(x, y, z);
  return bone;
}

function applySoftSkinning(geometry, boneIndices, weightSets) {
  const skinIndex = new Uint16Array(boneIndices.length * 4);
  const skinWeight = new Float32Array(weightSets.length * 4);

  for (let i = 0; i < boneIndices.length; i += 1) {
    const base = i * 4;
    const indices = boneIndices[i];
    const weights = weightSets[i];

    for (let j = 0; j < 4; j += 1) {
      skinIndex[base + j] = indices[j];
      skinWeight[base + j] = weights[j];
    }
  }

  geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndex, 4));
  geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeight, 4));
}

function normalizeWeights(entries) {
  const total = entries.reduce((sum, item) => sum + item.weight, 0) || 1;
  const sorted = entries
    .map((item) => ({ index: item.index, weight: item.weight / total }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);

  while (sorted.length < 4) {
    sorted.push({ index: 0, weight: 0 });
  }

  const normalizedTotal = sorted.reduce((sum, item) => sum + item.weight, 0) || 1;
  return {
    indices: sorted.map((item) => item.index),
    weights: sorted.map((item) => item.weight / normalizedTotal),
  };
}

function smoothstep(min, max, value) {
  const x = THREE.MathUtils.clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
}

function createShadedMaterial(material) {
  const shaded = new THREE.MeshStandardMaterial({
    color: tempColor
      .copy(material.color ?? new THREE.Color("#ffffff"))
      .offsetHSL(0, 0.02, 0.02)
      .clone(),
    map: material.map ?? null,
    side: THREE.DoubleSide,
    roughness: 0.92,
    metalness: 0.03,
    transparent: material.transparent ?? false,
    opacity: material.opacity ?? 1,
  });

  shaded.name = `${material.name || "shiba"}_shaded`;
  return shaded;
}

export function createRiggedShiba(sourceScene) {
  sourceScene.updateMatrixWorld(true);

  const sourceMeshes = [
    sourceScene.getObjectByName("Box002_default_0"),
    sourceScene.getObjectByName("Group18985_default_0"),
    sourceScene.getObjectByName("Object001_default_0"),
  ].filter((mesh) => mesh?.isMesh);

  const originalMesh = sourceScene.getObjectByName("Box002_default_0");
  if (!originalMesh?.isMesh || sourceMeshes.length === 0) {
    throw new Error("无法在 shiba.glb 中找到柴犬主体网格 Box002_default_0。");
  }

  const root = createBone("root", 0, 0, 0);
  const hips = createBone("hips", 0, -0.82, -0.54);
  const spine = createBone("spine", 0, 0.32, 0.14);
  const chest = createBone("chest", 0, 0.26, 0.26);
  const neck = createBone("neck", 0, 0.18, 0.46);
  const head = createBone("head", 0, 0.02, 0.32);
  const tailBase = createBone("tailBase", 0, 0.18, -0.2);
  const tailTip = createBone("tailTip", 0, 0.08, -0.18);

  const frontLeftUpper = createBone("frontLeftUpper", 0.2, 0.02, 0.32);
  const frontLeftLower = createBone("frontLeftLower", 0, -0.44, 0.03);
  const frontLeftPaw = createBone("frontLeftPaw", 0, -0.36, 0);

  const frontRightUpper = createBone("frontRightUpper", -0.2, 0.02, 0.32);
  const frontRightLower = createBone("frontRightLower", 0, -0.44, 0.03);
  const frontRightPaw = createBone("frontRightPaw", 0, -0.36, 0);

  const backLeftUpper = createBone("backLeftUpper", 0.19, -0.02, -0.18);
  const backLeftLower = createBone("backLeftLower", 0, -0.38, -0.03);
  const backLeftPaw = createBone("backLeftPaw", 0, -0.3, 0.04);

  const backRightUpper = createBone("backRightUpper", -0.19, -0.02, -0.18);
  const backRightLower = createBone("backRightLower", 0, -0.38, -0.03);
  const backRightPaw = createBone("backRightPaw", 0, -0.3, 0.04);

  root.add(hips);
  hips.add(spine);
  spine.add(chest);
  chest.add(neck);
  neck.add(head);
  hips.add(tailBase);
  tailBase.add(tailTip);

  chest.add(frontLeftUpper);
  frontLeftUpper.add(frontLeftLower);
  frontLeftLower.add(frontLeftPaw);

  chest.add(frontRightUpper);
  frontRightUpper.add(frontRightLower);
  frontRightLower.add(frontRightPaw);

  hips.add(backLeftUpper);
  backLeftUpper.add(backLeftLower);
  backLeftLower.add(backLeftPaw);

  hips.add(backRightUpper);
  backRightUpper.add(backRightLower);
  backRightLower.add(backRightPaw);

  const bones = [
    root,
    hips,
    spine,
    chest,
    neck,
    head,
    tailBase,
    tailTip,
    frontLeftUpper,
    frontLeftLower,
    frontLeftPaw,
    frontRightUpper,
    frontRightLower,
    frontRightPaw,
    backLeftUpper,
    backLeftLower,
    backLeftPaw,
    backRightUpper,
    backRightLower,
    backRightPaw,
  ];

  const skeleton = new THREE.Skeleton(bones);
  const wrapper = new THREE.Group();
  wrapper.add(root);
  root.updateMatrixWorld(true);

  const skinnedMeshes = [];

  for (const sourceMesh of sourceMeshes) {
    const geometry = sourceMesh.geometry.clone();
    geometry.applyMatrix4(sourceMesh.matrixWorld);
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    const positions = geometry.attributes.position;
    const skinIndices = [];
    const skinWeights = [];

    for (let i = 0; i < positions.count; i += 1) {
      tempVector.fromBufferAttribute(positions, i);

      const side = tempVector.x >= 0 ? 1 : -1;
      const absX = Math.abs(tempVector.x);
      const forward = smoothstep(-0.05, 0.36, tempVector.z);
      const rear = smoothstep(-0.55, -0.12, -tempVector.z);
      const headness = smoothstep(0.18, 0.38, tempVector.z);
      const tailness = smoothstep(-0.6, -0.22, -tempVector.z);
      const low = smoothstep(-0.94, -0.36, -tempVector.y);
      const paw = smoothstep(-0.95, -0.72, -tempVector.y);
      const upperBody = smoothstep(-0.35, 0.18, tempVector.y);
      const legness = smoothstep(0.08, 0.17, absX);

      let entries;

      if (tempVector.z > 0.2 && tempVector.y > -0.24) {
        entries = [
          { index: 5, weight: 0.58 + headness * 0.2 },
          { index: 4, weight: 0.22 + upperBody * 0.14 },
          { index: 3, weight: 0.12 },
          { index: 2, weight: 0.08 },
        ];
      } else if (tempVector.z < -0.36 && tempVector.y > -0.18) {
        entries = [
          { index: 6, weight: 0.56 + tailness * 0.18 },
          { index: 7, weight: 0.22 + tailness * 0.12 },
          { index: 1, weight: 0.14 },
          { index: 2, weight: 0.08 },
        ];
      } else if (tempVector.y < -0.26 && tempVector.z > 0.02 && legness > 0.16) {
        const upper = side > 0 ? 8 : 11;
        const lower = side > 0 ? 9 : 12;
        const pawBone = side > 0 ? 10 : 13;
        entries = [
          { index: upper, weight: 0.42 + forward * 0.1 },
          { index: lower, weight: 0.28 + low * 0.2 },
          { index: pawBone, weight: 0.1 + paw * 0.2 },
          { index: 3, weight: 0.12 },
        ];
      } else if (tempVector.y < -0.28 && tempVector.z <= 0.02 && legness > 0.15) {
        const upper = side > 0 ? 14 : 17;
        const lower = side > 0 ? 15 : 18;
        const pawBone = side > 0 ? 16 : 19;
        entries = [
          { index: upper, weight: 0.42 + rear * 0.1 },
          { index: lower, weight: 0.28 + low * 0.22 },
          { index: pawBone, weight: 0.1 + paw * 0.18 },
          { index: 1, weight: 0.12 },
        ];
      } else if (tempVector.z > 0.02) {
        entries = [
          { index: 3, weight: 0.42 + forward * 0.16 },
          { index: 4, weight: 0.2 + upperBody * 0.12 },
          { index: 2, weight: 0.18 },
          { index: 1, weight: 0.08 },
        ];
      } else {
        entries = [
          { index: 1, weight: 0.42 + rear * 0.18 },
          { index: 2, weight: 0.22 },
          { index: 3, weight: 0.12 },
          { index: 6, weight: 0.08 + tailness * 0.1 },
        ];
      }

      const normalized = normalizeWeights(entries);
      skinIndices.push(normalized.indices);
      skinWeights.push(normalized.weights);
    }

    applySoftSkinning(geometry, skinIndices, skinWeights);

    const skinnedMesh = new THREE.SkinnedMesh(
      geometry,
      createShadedMaterial(sourceMesh.material),
    );
    skinnedMesh.bind(skeleton);
    skinnedMesh.frustumCulled = false;
    skinnedMesh.castShadow = true;
    skinnedMesh.receiveShadow = true;
    wrapper.add(skinnedMesh);
    skinnedMeshes.push(skinnedMesh);
  }

  wrapper.traverse((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  wrapper.updateMatrixWorld(true);

  return {
    root: wrapper,
    mesh: wrapper,
    animationRoot: root,
    skeleton,
    skinnedMeshes,
  };
}
