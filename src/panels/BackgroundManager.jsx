import { useState } from "react";

const BackgroundManager = () => {
  const [customUrl, setCustomUrl] = useState("");

  // 20 distinct color presets organized into 4 logical design themes
  const colorThemes = {
    "Minimalist Classics": [
      { name: "Default Almond", value: "#F2EBDD" },
      { name: "Studio White", value: "#FAFAFA" },
      { name: "Cool Gray", value: "#E5E7EB" },
      { name: "Slate Dark", value: "#374151" },
      { name: "Ink Black", value: "#111827" }
    ],
    "Earthy & Organic": [
      { name: "Soft Sage", value: "#A3B19B" },
      { name: "Olive Moss", value: "#4D533C" },
      { name: "Terracotta", value: "#D97706" },
      { name: "Desert Sand", value: "#EEDC82" },
      { name: "Clay Brown", value: "#78350F" }
    ],
    "Vibrant Accents": [
      { name: "Cyber Orange", value: "#FF4500" },
      { name: "Teal Blueprint", value: "#0D9488" },
      { name: "Electric Purple", value: "#7C3AED" },
      { name: "Crimson Red", value: "#DC2626" },
      { name: "Neon Lime", value: "#84CC16" }
    ],
    "Pastels & Soft Tones": [
      { name: "Lavender Fog", value: "#E6E6FA" },
      { name: "Blush Pink", value: "#FCE7F3" },
      { name: "Mint Foam", value: "#ECFDF5" },
      { name: "Sky Blue", value: "#E0F2FE" },
      { name: "Pale Lemon", value: "#FEF08A" }
    ]
  };

  // Shared application utility to modify visual backgrounds and record layout state
  const applyBackground = (bgValue, isImage = false) => {
    const targetElement = document.getElementById("ws") || document.body;
    
    if (isImage) {
      targetElement.style.background = `url(${bgValue}) no-repeat center center / cover`;
    } else {
      targetElement.style.backgroundImage = "none";
      targetElement.style.backgroundColor = bgValue;
    }
    
    // Core Fix: Saves background preferences state natively to persist across layout cycles!
    localStorage.setItem("savedWebsiteBackground", JSON.stringify({ value: bgValue, isImg: isImage }));
  };

  return (
    <div style={{ padding: "12px", color: "var(--text)", maxHeight: "100%", overflowY: "auto" }}>
      <h3>Website Layout Backgrounds</h3>
      
      {/* 20 Presets Selector grouped by design aesthetic */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Choose Preset Color Theme:</h4>
        
        {Object.entries(colorThemes).map(([themeName, colors]) => (
          <div key={themeName} style={{ marginBottom: "14px" }}>
            <h5 style={{ margin: "4px 0 6px 0", color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{themeName}</h5>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {colors.map(p => (
                <button 
                  key={p.name} 
                  onClick={() => applyBackground(p.value, false)}
                  title={p.value}
                  style={{ 
                    padding: "6px 10px", 
                    backgroundColor: "#fff", 
                    border: "1px solid #ccc", 
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                  }}
                >
                  <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: p.value, border: "1px solid #999" }}></span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Image Creator with built-in storage persistence loops */}
      <div style={{ borderTop: "1px solid #eee", paddingTop: "12px" }}>
        <h4>Apply Custom Background Image Link:</h4>
        <div style={{ display: "flex", gap: "4px" }}>
          <input 
            type="text" 
            placeholder="Paste URL (ex: https://picsum.photos)" 
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            style={{ flex: 1, padding: "6px" }}
          />
          <button 
            onClick={() => { 
              if (customUrl) {
                applyBackground(customUrl, true);
                alert("Custom background image URL successfully saved to your workspace configurations!");
              }
            }}
            style={{ padding: "6px 12px", cursor: "pointer", fontWeight: "bold", backgroundColor: "#6f85e6", color: "#fff", border: "none", borderRadius: "4px" }}
          >
            Apply & Save Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundManager;