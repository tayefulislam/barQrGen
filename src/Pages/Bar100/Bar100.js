import React, { useState } from "react";
import Barcode from "react-barcode";
import "./Bar100.css"; // Assuming you have a CSS file for styling

const Bar100 = () => {
  const LABEL_COUNT = 100;
  const [barcodes, setBarcodes] = useState(Array(LABEL_COUNT).fill(""));

  function generateSKU() {
    const randomLetter1 = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const randomLetter2 = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const randomNumbers1 = Math.floor(100 + Math.random() * 900);
    const randomNumbers2 = Math.floor(1000 + Math.random() * 9000);
    return `${randomLetter1}${randomNumbers1}${randomLetter2}${randomNumbers2}`;
  }

  const handleInputChange = (index, value) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = value;
    setBarcodes(newBarcodes);
  };

  const fillWithGeneratedSKUs = () => {
    const generated = Array.from({ length: LABEL_COUNT }, () => generateSKU());
    setBarcodes(generated);
  };

  const printLabels = () => {
    window.print();
  };

  return (
    <div>
      <h1>Barcode Label Generator (100 per page)</h1>
      <button onClick={fillWithGeneratedSKUs}>⚙️ Auto Generate SKUs</button>
      <button onClick={printLabels}>🖨️ Print</button>

      <div className="label-sheet-100">
        {Array.from({ length: LABEL_COUNT }).map((_, index) => (
          <div className="label-100" key={index}>
            {barcodes[index] ? (
              <Barcode
                value={barcodes[index]}
                height={20}
                width={0.8}
                fontSize={8}
              />
            ) : (
              <input
                placeholder="Enter Code"
                value={barcodes[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bar100;
