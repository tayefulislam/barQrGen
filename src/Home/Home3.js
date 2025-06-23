import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Home3.module.css"; // Ensure you have the correct path to your CSS file
const Home3 = () => {
  const [codes, setCodes] = useState(Array(48).fill(""));

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
    window.print();
  };

  return (
    <div>
      <h1>QR Code Label Generator (A4 - 48 Labels)</h1>
      <button onClick={fillWithGeneratedCodes}>⚙️ Auto Generate Codes</button>
      <button onClick={printLabels}>🖨️ Print</button>

      <div className="label-sheet">
        {Array.from({ length: 48 }).map((_, index) => (
          <div className="label" key={index}>
            {codes[index] ? (
              <>
                <QRCodeSVG
                  value={codes[index]}
                  size={64}
                  level="H"
                  includeMargin={true}
                />
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "4px",
                    textAlign: "center",
                  }}
                >
                  {codes[index]}
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
        ))}
      </div>
    </div>
  );
};

export default Home3;
