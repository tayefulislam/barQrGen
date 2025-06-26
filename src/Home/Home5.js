import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Home5.css";
import { Helmet } from "react-helmet";

const Home5 = () => {
  const [pages, setPages] = useState(1); // Set how many pages you want (each has 48 labels)
  const [codes, setCodes] = useState([]);
  const [qrColor, setQrColor] = useState("#000000");
  const [skuColor, setSKUColor] = useState("#000000");
  const [brandColor, setBrandColor] = useState("#000000");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setCodes(Array(pages * 44).fill(""));
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
    const generated = Array.from({ length: pages * 44 }, () =>
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
    <>
      {" "}
      <Helmet>
        <title>QR Code Label Generator - {generateHashCode(4)}</title>
      </Helmet>
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

          <button onClick={fillWithGeneratedCodes}>
            ⚙️ Auto Generate Codes
          </button>
          <button onClick={printLabels}>🖨️ Print</button>

          <div className="color-controls">
            {" "}
            <label>
              🎨 QR Color:
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
              />
            </label>
            <label>
              🎨SKU Color:
              <input
                type="color"
                value={skuColor}
                onChange={(e) => setSKUColor(e.target.value)}
              />
            </label>
            <label>
              🎨 Brand Color:
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
              />
            </label>
          </div>

          <div>
            <h6 class="note">Note : Adobe PDF - A4 Size - 100%</h6>
          </div>

          {/* <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          🌗 Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button> */}
        </div>

        {/* Render each A4 sheet */}
        {Array.from({ length: pages }).map((_, pageIndex) => (
          <div className="label-sheet" key={pageIndex}>
            {Array.from({ length: 44 }).map((_, i) => {
              const index = pageIndex * 44 + i;
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
                      <div className="code-text-box">
                        <div
                          style={{ color: skuColor }}
                          className="code-text-code"
                        >
                          {codes[index]}
                        </div>
                        <div>
                          <h2
                            style={{ color: brandColor }}
                            className="code-text1"
                          >
                            CHIBA PC MART <br />{" "}
                            <span className="code-text2">chibapcmart.com</span>
                          </h2>
                        </div>
                      </div>
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
    </>
  );
};

export default Home5;
