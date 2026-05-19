import { createClip } from "./utils.js";

export function createIdleClip() {
  return createClip("idle", 2.6, ({ tracks, duration, pushRotationTrack, pushPositionTrack }) => {
    pushPositionTrack(tracks, "hips", duration, [
      { time: 0, x: 0, y: -0.82, z: -0.54 },
      { time: 0.5, x: 0, y: -0.79, z: -0.535 },
      { time: 1, x: 0, y: -0.82, z: -0.54 },
    ]);

    pushRotationTrack(tracks, "spine", duration, [
      { time: 0, x: -0.04, y: 0.02, z: 0 },
      { time: 0.5, x: 0.01, y: -0.01, z: 0.01 },
      { time: 1, x: -0.04, y: 0.02, z: 0 },
    ]);

    pushRotationTrack(tracks, "chest", duration, [
      { time: 0, x: 0.03, y: -0.01, z: 0 },
      { time: 0.5, x: -0.02, y: 0.01, z: 0.01 },
      { time: 1, x: 0.03, y: -0.01, z: 0 },
    ]);

    pushRotationTrack(tracks, "neck", duration, [
      { time: 0, x: 0.02, y: -0.03, z: 0 },
      { time: 0.5, x: -0.01, y: 0.04, z: 0.01 },
      { time: 1, x: 0.02, y: -0.03, z: 0 },
    ]);

    pushRotationTrack(tracks, "head", duration, [
      { time: 0, x: -0.01, y: -0.03, z: 0.02 },
      { time: 0.25, x: 0.02, y: 0.01, z: -0.01 },
      { time: 0.5, x: -0.01, y: 0.05, z: -0.02 },
      { time: 0.75, x: -0.02, y: 0.01, z: 0.01 },
      { time: 1, x: -0.01, y: -0.03, z: 0.02 },
    ]);

    pushRotationTrack(tracks, "tailBase", duration, [
      { time: 0, x: 0.1, y: 0.26, z: 0.1 },
      { time: 0.5, x: 0.18, y: -0.18, z: -0.06 },
      { time: 1, x: 0.1, y: 0.26, z: 0.1 },
    ]);

    pushRotationTrack(tracks, "tailTip", duration, [
      { time: 0, x: 0.2, y: 0.34, z: 0.1 },
      { time: 0.5, x: 0.28, y: -0.28, z: -0.1 },
      { time: 1, x: 0.2, y: 0.34, z: 0.1 },
    ]);

    for (const name of [
      "frontLeftUpper",
      "frontRightUpper",
      "backLeftUpper",
      "backRightUpper",
    ]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.04, y: 0, z: 0 },
        { time: 0.5, x: -0.02, y: 0, z: 0 },
        { time: 1, x: 0.04, y: 0, z: 0 },
      ]);
    }

    for (const name of [
      "frontLeftLower",
      "frontRightLower",
      "backLeftLower",
      "backRightLower",
    ]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.06, y: 0, z: 0 },
        { time: 0.5, x: 0.02, y: 0, z: 0 },
        { time: 1, x: -0.06, y: 0, z: 0 },
      ]);
    }
  });
}
