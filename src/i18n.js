const messages = {
  en: {
    documentTitle: "Shiba Animation Demo",
    htmlLang: "en",
    title: "Shiba Animation",
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
    title: "柴犬动画",
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
