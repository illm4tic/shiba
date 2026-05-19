# Shiba Animation Demo

[English](#english) | [中文](#中文)

## English

### Overview

An experimental Three.js demo for a Shiba Inu model:

- Online demo: [https://shiba.yeezus.cn](https://shiba.yeezus.cn)
- Source asset: `shiba.glb`
- Motions: `idle`, `walk`, `run`, `jump`
- UI languages: English and Simplified Chinese

This model does not ship with bones or animation clips.  
Because of that, the project builds a procedural rig in code and tries to approximate the four motions as naturally as possible.

### Features

- Vite-based project structure
- Three.js scene, lighting, camera, and orbit controls
- Runtime-generated skeleton and heuristic skin weighting
- Independent animation modules for `idle`, `walk`, `run`, and `jump`
- UI language toggle between English and Chinese

### Run Locally

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Project Notes

- The source Shiba model is static and does not contain a native skeleton.
- The current motion system is an approximation, not a production-grade character rig.
- The goal of this repo is to push the asset as far as possible and make the animation feel believable despite the source limitations.

## 中文

### 项目说明

这是一个基于 Three.js 的柴犬动画实验项目：

- 在线地址：[https://shiba.yeezus.cn](https://shiba.yeezus.cn)
- 模型资源：`shiba.glb`
- 动作类型：`idle`、`walk`、`run`、`jump`
- 界面语言：英文 / 简体中文

这个柴犬模型本身不带骨骼，也不带动画。  
因此项目是在代码里动态构建程序化骨骼，并尽量把这四种动作做得更自然。

### 功能特性

- 基于 Vite 的项目结构
- Three.js 场景、灯光、相机与轨道控制
- 运行时生成骨骼，并使用启发式权重进行绑定
- `idle`、`walk`、`run`、`jump` 四个动作拆分为独立模块
- 支持中英文界面切换

### 本地运行

```bash
npm install
npm run dev
```

### 构建预览

```bash
npm run build
npm run preview
```

### 备注

- 原始柴犬模型是静态模型，不包含原生骨骼。
- 当前动作系统属于近似实现，不是标准角色绑定流程产物。
- 这个仓库的目标是在资源受限的前提下，尽量把动画效果做得更可信。
