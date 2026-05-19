import { createClip } from "./utils.js";

export function createWalkClip() {
  return createClip("walk", 1.15, ({ tracks, duration, pushRotationTrack, pushPositionTrack }) => {
    pushPositionTrack(tracks, "hips", duration, [
      { time: 0, x: 0, y: -0.82, z: -0.54 },
      { time: 0.25, x: 0, y: -0.78, z: -0.51 },
      { time: 0.5, x: 0, y: -0.81, z: -0.54 },
      { time: 0.75, x: 0, y: -0.78, z: -0.57 },
      { time: 1, x: 0, y: -0.82, z: -0.54 },
    ]);

    pushRotationTrack(tracks, "hips", duration, [
      { time: 0, x: 0.04, y: 0.03, z: 0.04 },
      { time: 0.25, x: -0.03, y: -0.02, z: -0.04 },
      { time: 0.5, x: 0.04, y: 0.03, z: 0.04 },
      { time: 0.75, x: -0.03, y: -0.02, z: -0.04 },
      { time: 1, x: 0.04, y: 0.03, z: 0.04 },
    ]);

    pushRotationTrack(tracks, "spine", duration, [
      { time: 0, x: -0.1, y: -0.04, z: 0 },
      { time: 0.5, x: 0.06, y: 0.04, z: 0 },
      { time: 1, x: -0.1, y: -0.04, z: 0 },
    ]);

    pushRotationTrack(tracks, "head", duration, [
      { time: 0, x: 0.02, y: 0.06, z: 0.02 },
      { time: 0.5, x: -0.03, y: -0.06, z: -0.02 },
      { time: 1, x: 0.02, y: 0.06, z: 0.02 },
    ]);

    pushRotationTrack(tracks, "tailBase", duration, [
      { time: 0, x: 0.25, y: 0.22, z: 0.12 },
      { time: 0.5, x: 0.18, y: -0.2, z: -0.12 },
      { time: 1, x: 0.25, y: 0.22, z: 0.12 },
    ]);

    pushRotationTrack(tracks, "tailTip", duration, [
      { time: 0, x: 0.32, y: 0.34, z: 0.14 },
      { time: 0.5, x: 0.24, y: -0.32, z: -0.14 },
      { time: 1, x: 0.32, y: 0.34, z: 0.14 },
    ]);

    const diagonalA = ["frontLeftUpper", "backRightUpper"];
    const diagonalB = ["frontRightUpper", "backLeftUpper"];

    for (const name of diagonalA) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.7, y: 0, z: 0.04 },
        { time: 0.5, x: -0.52, y: 0, z: -0.03 },
        { time: 1, x: 0.7, y: 0, z: 0.04 },
      ]);
    }

    for (const name of diagonalB) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.52, y: 0, z: -0.04 },
        { time: 0.5, x: 0.7, y: 0, z: 0.03 },
        { time: 1, x: -0.52, y: 0, z: -0.04 },
      ]);
    }

    for (const name of ["frontLeftLower", "backRightLower"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.48, y: 0, z: 0 },
        { time: 0.25, x: -0.1, y: 0, z: 0 },
        { time: 0.5, x: 0.52, y: 0, z: 0 },
        { time: 0.75, x: -0.08, y: 0, z: 0 },
        { time: 1, x: -0.48, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontRightLower", "backLeftLower"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.52, y: 0, z: 0 },
        { time: 0.25, x: -0.08, y: 0, z: 0 },
        { time: 0.5, x: -0.48, y: 0, z: 0 },
        { time: 0.75, x: -0.1, y: 0, z: 0 },
        { time: 1, x: 0.52, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontLeftPaw", "backRightPaw"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: 0.2, y: 0, z: 0 },
        { time: 0.5, x: -0.16, y: 0, z: 0 },
        { time: 1, x: 0.2, y: 0, z: 0 },
      ]);
    }

    for (const name of ["frontRightPaw", "backLeftPaw"]) {
      pushRotationTrack(tracks, name, duration, [
        { time: 0, x: -0.16, y: 0, z: 0 },
        { time: 0.5, x: 0.2, y: 0, z: 0 },
        { time: 1, x: -0.16, y: 0, z: 0 },
      ]);
    }
  });
}
