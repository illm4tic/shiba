import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import shibaModelUrl from "../models/shiba.glb?url";

import { createIdleClip } from "./motions/idle.js";
import { createWalkClip } from "./motions/walk.js";
import { createRunClip } from "./motions/run.js";
import { createJumpClip } from "./motions/jump.js";
import { getInitialLocale, getMessages, isSupportedLocale } from "./i18n.js";
import { createRiggedShiba } from "./shibaRig.js";

const app = document.querySelector("#app");
const actionButtons = Array.from(document.querySelectorAll("[data-action]"));
const localeButtons = Array.from(document.querySelectorAll("[data-locale]"));
const heroEyebrow = document.querySelector("#hero-eyebrow");
const heroTitle = document.querySelector("#hero-title");
const heroDescription = document.querySelector("#hero-description");
const languageLabel = document.querySelector("#language-label");
const statusLabel = document.querySelector("#status-label");
const currentActionLabel = document.querySelector("#current-action");

let currentLocale = getInitialLocale();
let currentActionName = "idle";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#f6eddc");
scene.fog = new THREE.Fog("#f6eddc", 8, 18);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(3.4, 2.2, 4.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.55, -0.45);
controls.enablePan = false;
controls.minDistance = 3.2;
controls.maxDistance = 8.5;
controls.maxPolarAngle = Math.PI * 0.48;
controls.update();

const hemiLight = new THREE.HemisphereLight("#fff3d9", "#c98a57", 2.5);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight("#fff2dc", 2.8);
keyLight.position.set(3.4, 5.2, 3.8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.near = 0.5;
keyLight.shadow.camera.far = 18;
keyLight.shadow.camera.left = -5;
keyLight.shadow.camera.right = 5;
keyLight.shadow.camera.top = 5;
keyLight.shadow.camera.bottom = -5;
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight("#ffc487", 1.35);
rimLight.position.set(-4, 2, -4.8);
scene.add(rimLight);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(8, 64),
  new THREE.MeshStandardMaterial({
    color: "#ead4af",
    roughness: 0.96,
    metalness: 0.02,
  }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.015;
ground.receiveShadow = true;
scene.add(ground);

const shadowBlob = new THREE.Mesh(
  new THREE.CircleGeometry(1.45, 48),
  new THREE.MeshBasicMaterial({
    color: "#7a4c2d",
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  }),
);
shadowBlob.rotation.x = -Math.PI / 2;
shadowBlob.position.set(0, -1.005, -0.42);
scene.add(shadowBlob);

const group = new THREE.Group();
scene.add(group);

const loader = new GLTFLoader();
const gltf = await loader.loadAsync(shibaModelUrl);
const { root, skeleton, mesh, animationRoot } = createRiggedShiba(gltf.scene);
group.add(root);

mesh.traverse((child) => {
  if (child.isSkinnedMesh || child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

const helper = new THREE.SkeletonHelper(root);
helper.visible = false;
scene.add(helper);

const mixer = new THREE.AnimationMixer(animationRoot);
const clips = {
  idle: createIdleClip(skeleton),
  walk: createWalkClip(skeleton),
  run: createRunClip(skeleton),
  jump: createJumpClip(skeleton),
};

const actions = Object.fromEntries(
  Object.entries(clips).map(([name, clip]) => [name, mixer.clipAction(clip)]),
);

actions.idle.setLoop(THREE.LoopRepeat);
actions.walk.setLoop(THREE.LoopRepeat);
actions.run.setLoop(THREE.LoopRepeat);
actions.jump.setLoop(THREE.LoopOnce, 1);
actions.jump.clampWhenFinished = true;

actions.idle.play();
let currentAction = actions.idle;

function setActiveButton(name) {
  currentActionName = name;

  for (const button of actionButtons) {
    button.classList.toggle("is-active", button.dataset.action === name);
  }

  currentActionLabel.textContent = getMessages(currentLocale).actions[name];
}

function applyLocale(locale) {
  const copy = getMessages(locale);

  currentLocale = locale;
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.documentTitle;
  heroEyebrow.textContent = copy.eyebrow;
  heroTitle.textContent = copy.title;
  heroDescription.innerHTML = copy.description;
  languageLabel.textContent = copy.languageLabel;
  statusLabel.textContent = copy.statusLabel;

  for (const button of actionButtons) {
    button.textContent = copy.actions[button.dataset.action];
  }

  for (const button of localeButtons) {
    const isActive = button.dataset.locale === locale;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }

  currentActionLabel.textContent = copy.actions[currentActionName];
}

function setLocale(locale) {
  if (!isSupportedLocale(locale)) {
    return;
  }

  applyLocale(locale);
}

function playAction(name) {
  const nextAction = actions[name];
  if (!nextAction) {
    return;
  }

  if (nextAction === currentAction && name !== "jump") {
    return;
  }

  nextAction.reset();
  nextAction.enabled = true;
  nextAction.setEffectiveTimeScale(1);
  nextAction.setEffectiveWeight(1);
  nextAction.fadeIn(0.22);
  nextAction.play();

  currentAction.fadeOut(0.22);
  currentAction = nextAction;
  setActiveButton(name);
}

mixer.addEventListener("finished", (event) => {
  if (event.action === actions.jump && currentAction === actions.jump) {
    playAction("idle");
  }
});

for (const button of actionButtons) {
  button.addEventListener("click", () => {
    playAction(button.dataset.action);
  });
}

for (const button of localeButtons) {
  button.addEventListener("click", () => {
    setLocale(button.dataset.locale);
  });
}

applyLocale(currentLocale);
setActiveButton("idle");

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  mixer.update(delta);

  const t = clock.elapsedTime;
  keyLight.position.x = 3.4 + Math.sin(t * 0.12) * 0.35;
  shadowBlob.scale.x = 1 + Math.sin(t * 2) * 0.015;
  shadowBlob.scale.y = 1 + Math.sin(t * 2) * 0.025;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
