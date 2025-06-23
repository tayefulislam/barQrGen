import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Home5.css";

const Home5 = () => {
  const [pages, setPages] = useState(1); // Set how many pages you want (each has 48 labels)
  const [codes, setCodes] = useState([]);
  const [qrColor, setQrColor] = useState("#000000");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setCodes(Array(pages * 48).fill(""));
  }, [pages]);

  const generateHashCode = (length = 10) => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const handleInputChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const fillWithGeneratedCodes = () => {
    const generated = Array.from({ length: pages * 48 }, () =>
      generateHashCode()
    );
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
    <div className={`home4-container ${theme}`}>
      <h1>QR Code Label Generator</h1>

      <div className="controls">
        <label>
          🧾 Pages:
          <input
            type="number"
            min="1"
            max="100"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
          />
        </label>

        <button onClick={fillWithGeneratedCodes}>⚙️ Auto Generate Codes</button>
        <button onClick={printLabels}>🖨️ Print</button>

        <label>
          🎨 QR Color:
          <input
            type="color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value)}
          />
        </label>

        {/* <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          🌗 Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button> */}
      </div>

      {/* Render each A4 sheet */}
      {Array.from({ length: pages }).map((_, pageIndex) => (
        <div className="label-sheet" key={pageIndex}>
          {Array.from({ length: 48 }).map((_, i) => {
            const index = pageIndex * 48 + i;
            return (
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
            );
          })}
          {/* <div className="page-footer">
            Page {pageIndex + 1} of {pages}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Home5;
