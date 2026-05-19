import { createClip } from "./utils.js";

export function createRunClip() {
  return createClip("run", 0.72, ({ tracks, duration, pushRotationTrack, pushPositionTrack }) => {
    pushPositionTrack(tracks, "hips", duration, [
      { time: 0, x: 0, y: -0.8, z: -0.52 },
      { time: 0.22, x: 0, y: -0.72, z: -0.46 },
      { time: 0.5, x: 0, y: -0.84, z: -0.56 },
      { time: 0.78, x: 0, y: -0.72, z: -0.6 },
      { time: 1, x: 0, y: -0.8, z: -0.52 },
    ]);

    pushRotationTrack(tracks, "hips", duration, [
      { time: 0, x: 0.18, y: 0.05, z: 0.08 },
      { time: 0.5, x: -0.16, y: -0.05, z: -0.08 },
      { time: 1, x: 0.18, y: 0.05, z: 0.08 },
    ]);

    pushRotationTrack(tracks, "spine", duration, [
      { time: 0, x: -0.18, y: -0.08, z: 0 },
      { time: 0.5, x: 0.1, y: 0.08, z: 0 },
      { time: 1, x: -0.18, y: -0.08, z: 0 },
    ]);

    pushRotationTrack(tracks, "chest", duration, [
      { time: 0, x: 0.14, y: 0.06, z: 0 },
      { time: 0.5, x: -0.08, y: -0.06, z: 0 },
      { time: 1, x: 0.14, y: 0.06, z: 0 },
    ]);

    pushRotationTrack(tracks, "head", duration, [
      { time: 0, x: 0.06, y: 0.08, z: 0.02 },
      { time: 0.5, x: -0.06, y: -0.08, z: -0.02 },
      { time: 1, x: 0.06, y: 0.08, z: 0.02 },
    ]);

    pushRotationTrack(tracks, "tailBase", duration, [
      { time: 0, x: 0.26, y: 0.35, z: 0.2 },
      { time: 0.5, x: 0.16, y: -0.34, z: -0.2 },
      { time: 1, x: 0.26, y: 0.35, z: 0.2 },
    ]);

    pushRotationTrack(tracks, "tailTip", duration, [
      { time: 0, x: 0.4, y: 0.48, z: 0.22 },
      { time: 0.5, x: 0.28, y: -0.44, z: -0.22 },
      { time: 1, x: 0.4, y: 0.48, z: 0.22 },
    ]);

    const phaseA = ["frontLeftUpper", "backRightUpper"];
    const phaseB = ["frontRightUpper", "backLeftUpper"];

    for (const name of phaseA) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 1.02, y: 0, z: 0.08 },
        { time: 0.2, x: 0.18, y: 0, z: 0.02 },
        { time: 0.5, x: -0.98, y: 0, z: -0.06 },
        { time: 0.78, x: -0.14, y: 0, z: -0.02 },
        { time: 1, x: 1.02, y: 0, z: 0.08 },
      ]);
    }

    for (const name of phaseB) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.98, y: 0, z: -0.08 },
        { time: 0.2, x: -0.14, y: 0, z: -0.02 },
        { time: 0.5, x: 1.02, y: 0, z: 0.06 },
        { time: 0.78, x: 0.18, y: 0, z: 0.02 },
        { time: 1, x: -0.98, y: 0, z: -0.08 },
      ]);
    }

    for (const name of ["frontLeftLower", "backRightLower"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.82, y: 0, z: 0 },
        { time: 0.3, x: 0.22, y: 0, z: 0 },
        { time: 0.5, x: 0.94, y: 0, z: 0 },
        { time: 0.8, x: -0.28, y: 0, z: 0 },
        { time: 1, x: -0.82, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontRightLower", "backLeftLower"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.94, y: 0, z: 0 },
        { time: 0.3, x: -0.28, y: 0, z: 0 },
        { time: 0.5, x: -0.82, y: 0, z: 0 },
        { time: 0.8, x: 0.22, y: 0, z: 0 },
        { time: 1, x: 0.94, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontLeftPaw", "backRightPaw"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.28, y: 0, z: 0 },
        { time: 0.5, x: -0.28, y: 0, z: 0 },
        { time: 1, x: 0.28, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontRightPaw", "backLeftPaw"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.28, y: 0, z: 0 },
        { time: 0.5, x: 0.28, y: 0, z: 0 },
        { time: 1, x: -0.28, y: 0, z: 0 },
      ]);
    }
  });
}
