const path = require("path");
const fs = require("fs");

function getEntryFiles(dir) {
  const entries = { index: "./index.ts" };
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 如果是目录，递归调用
      Object.assign(entries, getEntryFiles(fullPath));
    } else if (file.endsWith(".ts")) {
      // 如果是 .ts 文件，添加到入口
      const entryKey = path
        .relative(path.resolve(__dirname, "src"), fullPath)
        .replace(/\.ts$/, ""); // 生成相对路径
      entries[entryKey] = fullPath;
    }
  });

  return entries;
}

const entryFiles = getEntryFiles(path.resolve(__dirname, "src"));
console.log("entry", entryFiles);

module.exports = {
  entry: './index.ts',
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
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  target: "node",
};
