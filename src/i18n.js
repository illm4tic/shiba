const messages = {
  en: {
    documentTitle: "Shiba Animation Demo",
    htmlLang: "en",
    eyebrow: "Three.js / Procedural Animation",
    title: "Shiba Animation Console",
    description:
      'Load <code>shiba.glb</code> and drive idle, walk, run, and jump with a procedural rig because the source model does not include bones or animation clips.',
    languageLabel: "Language",
    statusLabel: "Current Motion",
    actions: {
      idle: "Idle",
      walk: "Walk",
      run: "Run",
      jump: "Jump",
    },
  },
  zh: {
    documentTitle: "柴犬动画演示",
    htmlLang: "zh-CN",
    eyebrow: "Three.js / 程序化动画",
    title: "柴犬骨骼动画控制台",
    description:
      '载入 <code>shiba.glb</code>，由于原始模型不带骨骼也不带动画，所以通过程序化绑定尽量实现 idle、walk、run、jump 四种动作。',
    languageLabel: "语言",
    statusLabel: "当前动作",
    actions: {
      idle: "待机",
      walk: "行走",
      run: "奔跑",
      jump: "跳跃",
    },
  },
};

export function isSupportedLocale(locale) {
  return locale === "en" || locale === "zh";
}

export function getMessages(locale) {
  return messages[locale] ?? messages.en;
}

export function getInitialLocale() {
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
}
