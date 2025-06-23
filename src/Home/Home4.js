import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Home4.module.css";

const Home4 = () => {
  const [codes, setCodes] = useState(Array(48).fill(""));
  const [qrColor, setQrColor] = useState("#000000"); // Default QR color
  const [theme, setTheme] = useState("light"); // Default theme

  function generateHashCode(length = 10) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  const handleInputChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const fillWithGeneratedCodes = () => {
    const generated = Array.from({ length: 48 }, () => generateHashCode());
    setCodes(generated);
  };

  const printLabels = () => {
    if (codes.length === 0 || codes.every((code) => code === "")) {
      alert("Please fill in at least one code before printing.");
      return;
    }
    window.print();
  };

  return (
    <div className={`home3-container ${theme}`}>
      <h1>QR Code Label Generator (A4 - 48 Labels)</h1>

      <div className="controls">
        <button type="button" onClick={fillWithGeneratedCodes}>
          ⚙️ Auto Generate Codes
        </button>
        <button onClick={printLabels}>🖨️ Print</button>

        <label>
          🎨 QR Color:
          <input
            type="color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value)}
          />
        </label>
        {/* 
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          🌗 Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button> */}
      </div>

      <div className="label-sheet">
        {Array.from({ length: 48 }).map((_, index) => (
          <div className="label" key={index}>
            {codes[index] ? (
              <>
                <QRCodeSVG
                  value={codes[index]}
                  size={64}
                  level="H"
                  includeMargin={false}
                  fgColor={qrColor}
                />
                <div className="code-text">{codes[index]}</div>
              </>
            ) : (
              <input
                placeholder="Enter Code"
                value={codes[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home4;
