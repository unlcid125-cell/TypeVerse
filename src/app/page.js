"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { glyphs } from "./glyphs";

const FONT_OPTIONS = [
  { label: "서현", value: "seohyeon" },
  { label: "준희", value: "junhee" },
  { label: "MIX", value: "mix" },
];

export default function Home() {
  const [typedLetters, setTypedLetters] = useState([]);
  const [fontMode, setFontMode] = useState("mix");
  const [fontSize, setFontSize] = useState(120);

  const buttonStyle = {
    padding: "10px 24px",
    borderRadius: "30px",
    border: "1px solid #aaa",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
    fontSize: "14px",
  };
  
  const selectImage = (images) => {
    if (!images || images.length === 0) return null;

    if (fontMode === "mix") {
      return images[Math.floor(Math.random() * images.length)];
    }

    const name =
      fontMode === "seohyeon"
        ? "서현"
        : "준희";

    return (
      images.find((img) =>
        img.includes(name)
      ) || images[0]
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (e.key === "Backspace") {
        setTypedLetters((prev) =>
          prev.slice(0, -1)
        );
        return;
      }

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

      if (e.key === "Enter") {
        e.preventDefault();

        setTypedLetters((prev) => [
          ...prev,
          {
            letter: "ENTER",
            newline: true,
          },
        ]);
        return;
      }

      if (!glyphs[key]) return;

      const image = selectImage(glyphs[key]);

      setTypedLetters((prev) => [
        ...prev,
        {
          letter: key,
          image,
          owner: image?.includes("서현")
            ? "서현"
            : "준희",
        },
      ]);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [fontMode]);


  const saveImage = async () => {
    const area =
      document.getElementById(
        "capture-area"
      );

    if (!area) return;

    const oldBorder =
      area.style.borderBottom;

    area.style.borderBottom = "none";

    const dataUrl = await toPng(area, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "#fff",
    });

    area.style.borderBottom = oldBorder;

    const link =
      document.createElement("a");

    link.download = "my-font.png";
    link.href = dataUrl;
    link.click();
  };


  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "60px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <style>
        {`
          @keyframes blink {
            50% {
              opacity:0;
            }
          }
        `}
      </style>


      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <p
          style={{
            fontSize:12,
            letterSpacing:"2px",
          }}
        >
          CURRENT FONT
        </p>

        <p
          style={{
            fontSize:24,
            margin:8,
          }}
        >
          {
            fontMode === "seohyeon"
              ? "서현"
              : fontMode === "junhee"
              ? "준희"
              : "MIX"
          }
        </p>
      </div>


      <div
        style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          marginBottom:30,
        }}
      >
        <span>SIZE</span>

        <input
          type="range"
          min="40"
          max="200"
          value={fontSize}
          onChange={(e)=>
            setFontSize(
              Number(e.target.value)
            )
          }
          style={{
            width:200,
            accentColor:"#888",
          }}
        />

        <span>{fontSize}px</span>
      </div>


      <div
        style={{
          display:"flex",
          gap:12,
          flexWrap:"wrap",
          justifyContent:"center",
          marginBottom:40,
        }}
      >

       {FONT_OPTIONS.map((item) => (
  <button
    key={item.value}
    onClick={() =>
      setFontMode(item.value)
    }
    style={{
      ...buttonStyle,
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
    }}
  >
    {item.label}
  </button>
))}


<button
  onClick={() =>
    setTypedLetters([])
  }
  style={buttonStyle}
>
  RESET
</button>





<button
  onClick={saveImage}
  style={{
    ...buttonStyle,
    background:"#000",
    color:"#fff",
    border:"1px solid #000",
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
          minHeight:300,
          display:"flex",
          flexWrap:"wrap",
          gap:8,
          rowGap:20,
          alignContent:"flex-start",
          borderRadius:20,
          borderBottom:
            "1px solid #a8a8a8",
          padding:40,
          background:"#fff",
          boxSizing:"border-box",
        }}
      >

        {typedLetters.map((item,index)=>{

          if(item.newline){
            return (
              <div
                key={index}
                style={{
                  flexBasis:"100%",
                  height:0,
                }}
              />
            );
          }


          if(item.image){
            return(
              <img
                key={index}
                src={item.image}
                alt={item.letter}
                crossOrigin="anonymous"
                style={{
                  height:`${fontSize}px`,
                  width:"auto",
                }}
              />
            );
          }


          return(
            <div
              key={index}
              style={{
                width:40,
                height:fontSize,
              }}
            />
          );
        })}


        <span
          style={{
            width:2,
            height:fontSize,
            background:"#000",
            animation:
              "blink 1s infinite",
          }}
        />

      </div>


      <div
        style={{
          marginTop:40,
        }}
      >
        {
          typedLetters.map((item,index)=>(
            <div key={index}>
              {item.letter}
              {item.owner &&
                ` - ${item.owner}`}
            </div>
          ))
        }
      </div>


    </main>
  );
}