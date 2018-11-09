module.exports = {
  presets: [
    '@vue/app'
  ],
  /* 按需加载iview */
  "plugins": [["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }],[
    /* 按需加载ElementUI */
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ],["@babel/plugin-syntax-dynamic-import"]]
}
