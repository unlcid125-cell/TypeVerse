"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const boardStyle = {
  backgroundImage: "url('/pegboard.png')",
  backgroundSize: "3000px 1140px",
  backgroundRepeat: "repeat",
  padding: "40px",
  display: "grid",
  gridTemplateColumns: "repeat(6, 180px)",
  gap: "30px",
  width: "max-content",
};

const cardBoxStyle = {
  width: "240px",
  height: "240px",
};

const seohyeonCards = Array.from({ length: 26 }, (_, i) => ({
  id: `seohyeon-${i + 1}`,
  image: `/cards/카드1배경-${String(i + 1).padStart(2, "0")}.png`,
  rotate: Math.random() * 6 - 3,
  swing: Math.random() * 4 + 2,
}));

const junheeCards = Array.from({ length: 26 }, (_, i) => ({
  id: `junhee-${i + 1}`,
  image: `/cards/카드2-${String(i + 1).padStart(2, "0")}.png`,
  rotate: Math.random() * 6 - 3,
  swing: Math.random() * 4 + 2,
}));

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <main
  style={{
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "#eee",
    display: "flex",
  }}
>
<div
onScroll={() => {
  setIsScrolling(true);

  clearTimeout(window.scrollTimer);

  window.scrollTimer = setTimeout(() => {
    setIsScrolling(false);
  }, 150);
}}
  style={{
    width: "100vw",
    height: "100vh",
    overflowX: "auto",
    overflowY: "auto",
    padding: "40px 80px",
    boxSizing: "border-box",
  }}
>
        <div
  style={{
    display: "flex",
    gap: "0px",
    width: "max-content",
    alignItems: "flex-start",
  }}
>
          

<div
  style={boardStyle}
>
  {seohyeonCards.map((card) => (
    <motion.div
      key={card.id}
      layoutId={card.id}
      onClick={() => setSelectedCard(card)}
      whileHover={{
        rotate: [
          card.rotate - 3,
          card.rotate + 3,
          card.rotate,
        ],
      }}
      animate={
  isScrolling
    ? {
        rotate: [
          card.rotate - card.swing,
          card.rotate + card.swing,
          card.rotate - card.swing,
        ],
      }
    : {
        rotate: card.rotate,
      }
}
transition={
  isScrolling
    ? {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }
    : {
        duration: 0.3,
      }
}
      style={{
  ...cardBoxStyle,
}}

    >
      <img
        src={card.image}
        alt={card.id}
        style={{
          width: "160px",
          height: "160px",
          objectFit: "contain",
          filter:
            "drop-shadow(0 15px 15px rgba(0,0,0,0.25))",
        }}
      />
    </motion.div>
  ))}
</div>




<div
  style={boardStyle}
>
  {junheeCards.map((card) => (
    <motion.div
  key={card.id}
  layoutId={card.id}
  onClick={() => setSelectedCard(card)}
  whileHover={{
    rotate: [
      card.rotate - 3,
      card.rotate + 3,
      card.rotate,
    ],
  }}
  animate={
    isScrolling
      ? {
          rotate: [
            card.rotate - card.swing,
            card.rotate + card.swing,
            card.rotate - card.swing,
          ],
        }
      : {
          rotate: card.rotate,
        }
  }
  transition={
  isScrolling
    ? {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }
    : {
        duration: 0.3,
      }
}
  style={{
    ...cardBoxStyle,
    transform: `rotate(${card.rotate}deg)`,
  }}
>
      <img
        src={card.image}
        alt={card.id}
        style={{
          width: "160px",
          height: "160px",
          objectFit: "contain",
          filter:
            "drop-shadow(0 15px 15px rgba(0,0,0,0.25))",
        }}
      />
    </motion.div>
  ))}
</div>
        </div>
      </div>
      {
  selectedCard && (
    <div
      onClick={() => setSelectedCard(null)}
      style={{
        position:"fixed",
        inset:0,
        background:"rgba(0,0,0,0.6)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:100,
      }}
    >

      <img
        src={selectedCard.image}
        alt={selectedCard.id}
        onClick={(e)=>e.stopPropagation()}
        style={{
          width:"500px",
          height:"500px",
          objectFit:"contain",
          background:"#fff",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.3)",
        }}
      />

    </div>
  )
}
    </main>
  );
}