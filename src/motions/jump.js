import { createClip } from "./utils.js";

export function createJumpClip() {
  return createClip("jump", 1.45, ({ tracks, duration, pushRotationTrack, pushPositionTrack }) => {
    pushPositionTrack(tracks, "hips", duration, [
      { time: 0, x: 0, y: -0.82, z: -0.54 },
      { time: 0.16, x: 0, y: -0.94, z: -0.56 },
      { time: 0.36, x: 0, y: -0.54, z: -0.28 },
      { time: 0.58, x: 0, y: -0.5, z: -0.14 },
      { time: 0.78, x: 0, y: -0.84, z: -0.4 },
      { time: 1, x: 0, y: -0.82, z: -0.54 },
    ]);

    pushRotationTrack(tracks, "hips", duration, [
      { time: 0, x: 0, y: 0, z: 0 },
      { time: 0.16, x: 0.22, y: 0, z: 0 },
      { time: 0.36, x: -0.12, y: 0, z: 0 },
      { time: 0.58, x: -0.08, y: 0, z: 0 },
      { time: 0.78, x: 0.26, y: 0, z: 0 },
      { time: 1, x: 0, y: 0, z: 0 },
    ]);

    pushRotationTrack(tracks, "spine", duration, [
      { time: 0, x: -0.04, y: 0, z: 0 },
      { time: 0.16, x: -0.24, y: 0, z: 0 },
      { time: 0.36, x: 0.18, y: 0, z: 0 },
      { time: 0.58, x: 0.12, y: 0, z: 0 },
      { time: 0.78, x: -0.12, y: 0, z: 0 },
      { time: 1, x: -0.04, y: 0, z: 0 },
    ]);

    pushRotationTrack(tracks, "chest", duration, [
      { time: 0, x: 0.03, y: 0, z: 0 },
      { time: 0.16, x: 0.16, y: 0, z: 0 },
      { time: 0.36, x: -0.08, y: 0, z: 0 },
      { time: 0.78, x: 0.12, y: 0, z: 0 },
      { time: 1, x: 0.03, y: 0, z: 0 },
    ]);

    pushRotationTrack(tracks, "head", duration, [
      { time: 0, x: 0, y: -0.02, z: 0 },
      { time: 0.16, x: -0.18, y: 0.02, z: 0 },
      { time: 0.36, x: 0.12, y: 0, z: 0 },
      { time: 0.58, x: 0.08, y: 0.06, z: 0 },
      { time: 0.78, x: -0.1, y: 0, z: 0 },
      { time: 1, x: 0, y: -0.02, z: 0 },
    ]);

    pushRotationTrack(tracks, "tailBase", duration, [
      { time: 0, x: 0.14, y: 0.12, z: 0.06 },
      { time: 0.16, x: 0.28, y: 0.2, z: 0.08 },
      { time: 0.36, x: 0.44, y: -0.08, z: -0.06 },
      { time: 0.78, x: 0.18, y: -0.14, z: -0.08 },
      { time: 1, x: 0.14, y: 0.12, z: 0.06 },
    ]);

    pushRotationTrack(tracks, "tailTip", duration, [
      { time: 0, x: 0.22, y: 0.18, z: 0.08 },
      { time: 0.16, x: 0.36, y: 0.22, z: 0.1 },
      { time: 0.36, x: 0.56, y: -0.12, z: -0.1 },
      { time: 0.78, x: 0.22, y: -0.18, z: -0.12 },
      { time: 1, x: 0.22, y: 0.18, z: 0.08 },
    ]);

    for (const name of ["backLeftUpper", "backRightUpper"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.08, y: 0, z: 0 },
        { time: 0.16, x: -0.72, y: 0, z: 0 },
        { time: 0.36, x: 0.68, y: 0, z: 0 },
        { time: 0.58, x: 0.44, y: 0, z: 0 },
        { time: 0.78, x: -0.5, y: 0, z: 0 },
        { time: 1, x: -0.08, y: 0, z: 0 },
      ]);
    }

    for (const name of ["backLeftLower", "backRightLower"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.18, y: 0, z: 0 },
        { time: 0.16, x: 1, y: 0, z: 0 },
        { time: 0.36, x: -0.34, y: 0, z: 0 },
        { time: 0.58, x: -0.18, y: 0, z: 0 },
        { time: 0.78, x: 0.7, y: 0, z: 0 },
        { time: 1, x: 0.18, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontLeftUpper", "frontRightUpper"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.06, y: 0, z: 0 },
        { time: 0.16, x: 0.48, y: 0, z: 0 },
        { time: 0.36, x: -0.34, y: 0, z: 0 },
        { time: 0.58, x: -0.18, y: 0, z: 0 },
        { time: 0.78, x: 0.54, y: 0, z: 0 },
        { time: 1, x: 0.06, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontLeftLower", "frontRightLower"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.06, y: 0, z: 0 },
        { time: 0.16, x: -0.72, y: 0, z: 0 },
        { time: 0.36, x: 0.58, y: 0, z: 0 },
        { time: 0.58, x: 0.4, y: 0, z: 0 },
        { time: 0.78, x: -0.42, y: 0, z: 0 },
        { time: 1, x: -0.06, y: 0, z: 0 },
      ]);
    }

    for (const name of [
      "frontLeftPaw",
      "frontRightPaw",
      "backLeftPaw",
      "backRightPaw",
    ]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0, y: 0, z: 0 },
        { time: 0.36, x: 0.24, y: 0, z: 0 },
        { time: 0.78, x: -0.2, y: 0, z: 0 },
        { time: 1, x: 0, y: 0, z: 0 },
      ]);
    }
  });
}
