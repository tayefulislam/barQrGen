import React, { useState } from "react";
import Barcode from "react-barcode";
import "./Home.module.css"; // Assuming you have a CSS file for styling

const Home = () => {
  const [barcodes, setBarcodes] = useState(Array(95).fill(""));

  // Function to generate a random SKU
  function generateHashSKU(length = 10) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 57 characters
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  const handleInputChange = (index, value) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = value;
    setBarcodes(newBarcodes);
  };

  const fillWithGeneratedSKUs = () => {
    const generated = Array.from({ length: 44 }, () => generateHashSKU());
    setBarcodes(generated);
  };

  const printLabels = () => {
    window.print();
  };
  return (
    <div>
      <h1>Barcode Label Generator (A4 - 44 Labels)</h1>
      <button onClick={fillWithGeneratedSKUs}>⚙️ Auto Generate SKUs</button>
      <button onClick={printLabels}>🖨️ Print</button>

      <div className="label-sheet">
        {Array.from({ length: 44 }).map((_, index) => (
          <div className="label" key={index}>
            {barcodes[index] ? (
              <Barcode
                value={barcodes[index]}
                height={30}
                width={1}
                fontSize={10}
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

export default Home;
