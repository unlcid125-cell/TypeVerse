"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { glyphs } from "./glyphs";

export default function Home() {
  const [typedLetters, setTypedLetters] = useState([]);
  const [fontMode, setFontMode] = useState("mix");
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const handleKeyDown = (e) => {
  const key = e.key.toLowerCase();

  console.log("입력:", e.key);
      if (e.key === " ") {
  e.preventDefault();

  setTypedLetters((prev) => [
    ...prev,
    {
      letter: "space",
      image: null,
    },
  ]);

  return;
}

      if (glyphs[key]) {
        const images = glyphs[key];

let selectedImage;

if (fontMode === "mix") {
  selectedImage =
    images[Math.floor(Math.random() * images.length)];
} else if (fontMode === "seohyeon") {
  selectedImage = images.find((img) =>
    img.includes("서현")
  );
} else if (fontMode === "junhee") {
  selectedImage = images.find((img) =>
    img.includes("준희")
  );
}

console.log("현재 모드:", fontMode);
console.log("이미지 목록:", images);
console.log("선택된 이미지:", selectedImage);

        setTypedLetters((prev) => [
  ...prev,
  {
    letter: key,
    image: selectedImage,
    owner: selectedImage.includes("서현")
      ? "서현"
      : "준희",
  },
]);
      }

      if (e.key === "Backspace") {
        setTypedLetters((prev) => prev.slice(0, -1));
      }
      if (e.key === " ") {
  setTypedLetters((prev) => [
    ...prev,
    {
      letter: "space",
      image: null,
    },
  ]);
}
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
 }, [fontMode]);
const cursorStyle = `
@keyframes blink {
  50% {
    opacity: 0;
  }
}
`;
const saveImage = async () => {
  const area = document.getElementById("capture-area");

  if (!area) return;

  const images = area.querySelectorAll("img");

  await Promise.all(
    [...images].map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((resolve) => {
        img.onload = resolve;
      });
    })
  );

  const originalBorder = area.style.borderBottom;

  area.style.borderBottom = "none";

  const dataUrl = await toPng(area, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  });

  area.style.borderBottom = originalBorder;

  const link = document.createElement("a");
  link.download = "my-font.png";
  link.href = dataUrl;
  link.click();
};
return (
  <main
    style={{
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
  }}
>
  <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <p
    style={{
      fontSize: "12px",
      margin: 0,
      letterSpacing: "2px",
    }}
  >
    CURRENT FONT
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
  }}
>
  <span
    style={{
      fontSize: "12px",
      letterSpacing: "2px",
    }}
  >
    SIZE
  </span>

  <input
    type="range"
    min="40"
    max="200"
    value={fontSize}
    onChange={(e) =>
      setFontSize(Number(e.target.value))
    }
    style={{
      width: "200px",
      accentColor: "#888",
    }}
  />

  <span
    style={{
      fontSize: "14px",
    }}
  >
    {fontSize}px
  </span>
</div>
  </p>

  <p
    style={{
      fontSize: "24px",
      margin: "8px 0",
    }}
  >
    {fontMode === "seohyeon"
      ? "서현"
      : fontMode === "junhee"
      ? "준희"
      : "MIX"}
  </p>
</div>
<div
  style={{
    display: "flex",
    gap: "12px",
    marginBottom: "40px",
  }}
>
  {[
    { label: "서현", value: "seohyeon" },
    { label: "준희", value: "junhee" },
    { label: "MIX", value: "mix" },
  ].map((item) => (
    <button
      key={item.value}
      onClick={() => setFontMode(item.value)}
      style={{
        padding: "10px 24px",
        borderRadius: "30px",
        border:
          fontMode === item.value
            ? "2px solid #000"
            : "1px solid #aaa",
        background:
          fontMode === item.value
            ? "#000"
            : "#fff",
        color:
          fontMode === item.value
            ? "#fff"
            : "#000",
        cursor: "pointer",
      }}
    >
      {item.label}
    </button>
  ))}
  <button
  onClick={() => setTypedLetters([])}
  style={{
    padding: "10px 24px",
    borderRadius: "30px",
    border: "1px solid #aaa",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
  }}
>
  RESET
</button>

<button
  onClick={saveImage}
  style={{
    padding: "10px 24px",
    borderRadius: "30px",
    border: "1px solid #aaa",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  }}
>
  SAVE IMAGE
</button>
</div>
    <div
    id="capture-area"
    style={{
    width: "80%",
    maxWidth: "900px",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    alignContent: "center",
    textAlign: "center",
    gap: "8px",
    rowGap: "20px",
    borderRadius: "20px",
    borderBottom: "1px solid #a8a8a8",
    background: "#ffffff",
    padding: "40px",
    boxSizing: "border-box",
  }}
>
     {typedLetters.map((item, index) =>
  item.image ? (
    <img
      key={index}
      src={item.image}
      alt={item.letter}
      className="glyph"
      crossOrigin="anonymous"
      style={{
        height: `${fontSize}px`,
        width: "auto",
      }}
    />
  ) : (
    <div
      key={index}
      style={{
        width: "40px",
        height: "120px",
      }}
    />
  )
)}
<span
  style={{
    display: "inline-block",
    width: "2px",
    height: "120px",
    background: "#000",
    marginLeft: "5px",
    animation: "blink 1s infinite",
  }}
/>   
    </div>
    <div
  style={{
    marginTop: "40px",
    fontSize: "14px",
    textAlign: "center",
  }}
>
  {typedLetters.map((item, index) => (
    <div key={index}>
      {item.letter} - {item.owner}
    </div>
  ))}
</div>
  </main>
);
}