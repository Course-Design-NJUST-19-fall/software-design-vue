module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'

  ],
  plugins: [
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "html"],//语言
      "plugins": ["line-numbers"],//行号插件（可以不用，还有其他插件网上查询）
      "theme": "tomorrow",  //主题coy|twillight|tomorrow|solarizedlight|okaidia|funky|dark
      "css": true
    }
    ]
  ]

}
