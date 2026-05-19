import * as THREE from "three";

function q(x = 0, y = 0, z = 0) {
  return new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, "XYZ"));
}

function pushRotationTrack(tracks, boneName, duration, keys) {
  const times = keys.map((key) => key.time * duration);
  const values = [];

  for (const key of keys) {
    const quat = q(key.x, key.y, key.z);
    values.push(quat.x, quat.y, quat.z, quat.w);
  }

  tracks.push(
    new THREE.QuaternionKeyframeTrack(
      `${boneName}.quaternion`,
      times,
      values,
    ),
  );
}

function pushPositionTrack(tracks, boneName, duration, keys) {
  const times = keys.map((key) => key.time * duration);
  const values = [];

  for (const key of keys) {
    values.push(key.x, key.y, key.z);
  }

  tracks.push(
    new THREE.VectorKeyframeTrack(`${boneName}.position`, times, values),
  );
}

export function createClip(name, duration, builder) {
  const tracks = [];
  builder({ tracks, duration, pushRotationTrack, pushPositionTrack });
  return new THREE.AnimationClip(name, duration, tracks);
}
