const fs = require("fs");
const path = require("path");

const glyphPath = path.join(__dirname, "../public/glyphs");
const outputPath = path.join(__dirname, "../src/app/glyphs.js");

const letters = fs.readdirSync(glyphPath);

const glyphs = {};

letters.forEach((letter) => {
  const folderPath = path.join(glyphPath, letter);

  // 폴더가 아니면 제외
  if (!fs.statSync(folderPath).isDirectory()) return;

  const files = fs.readdirSync(folderPath);

  glyphs[letter] = files
    .filter((file) => file.endsWith(".png"))
    .map((file) => `/glyphs/${letter}/${file}`);
});

const result = `export const glyphs = ${JSON.stringify(
  glyphs,
  null,
  2
)};
`;

fs.writeFileSync(outputPath, result, "utf-8");

console.log("✅ glyphs.js 생성 완료!");