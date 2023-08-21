const path = require('path');

module.exports = {
  entry: "./app.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      "node_modules",
      // 添加你的声明文件所在的目录
      path.resolve(__dirname, "interface.d.ts"),
      path.resolve(__dirname, "global.d.ts"),
    ],
  },
  output: {
    filename: "tts-server.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
};
