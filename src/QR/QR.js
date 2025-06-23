import React, { useState } from "react";
import { QRCode } from "qrcode.react";
import "../QR/QR1.css"; // Ensure you have the correct path to your CSS file

const QR2 = () => {
  const [codes, setCodes] = useState(Array(95).fill(""));

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
    const generated = Array.from({ length: 44 }, () => generateHashCode());
    setCodes(generated);
  };

  const printLabels = () => {
    window.print();
  };

  return (
    <div>
      <h1>QR Code Label Generator (A4 - 44 Labels)</h1>
      <button onClick={fillWithGeneratedCodes}>⚙️ Auto Generate Codes</button>
      <button onClick={printLabels}>🖨️ Print</button>

      <div className="label-sheet">
        {Array.from({ length: 44 }).map((_, index) => (
          <div className="label" key={index}>
            {codes[index] ? (
              <QRCode
                value={codes[index]}
                size={64}
                level="H"
                includeMargin={false}
              />
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

export default QR2;
