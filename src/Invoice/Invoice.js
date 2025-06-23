import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";

const Invoice = () => {
  const invoiceRef = useRef();
  const [language, setLanguage] = useState("en"); // 'en' or 'ja'

  // Translations
  const translations = {
    en: {
      billNo: "Bill No",
      status: "Status",
      customerName: "Customer Name",
      phone: "Phone",
      date: "Date",
      product: "Product",
      quantity: "Qty",
      price: "Price",
      subtotal: "Subtotal",
      discount: "Discount",
      vat: "VAT",
      adjustment: "Adjustment",
      shipping: "Shipping",
      grandTotal: "Grand Total",
      addProduct: "+ Add Product",
      downloadPDF: "📄 Download PDF",
      paid: "Paid",
      due: "Due",
      percent: "%",
      manual: "¥",
      action: "Action",
      companyName: "BLUE SPACE LLC",
      companyAddress: "Green Heights 102, 1-4-18 Yukou, Chuo-ku",
      city: "Chiba City, Chiba 260-0007",
      contact: "Phone: 043-375-7572 | Email: contact@bluespacejp.com",
    },
    ja: {
      billNo: "請求書番号",
      status: "ステータス",
      customerName: "顧客名",
      phone: "電話番号",
      date: "日付",
      product: "商品名",
      quantity: "数量",
      price: "単価",
      subtotal: "小計",
      discount: "割引",
      vat: "消費税",
      adjustment: "調整額",
      shipping: "配送料",
      grandTotal: "合計金額",
      addProduct: "+ 商品を追加",
      downloadPDF: "📄 PDFをダウンロード",
      paid: "支払済み",
      due: "未払い",
      percent: "%",
      manual: "¥",
      action: "操作",
      companyName: "ブルースペース合同会社",
      companyAddress: "千葉県千葉市中央区有効1-4-18",
      city: "グリーンハイツ102 〒260-0007",
      contact: "電話: 043-375-7572 | メール: contact@bluespacejp.com",
    },
  };

  const t = (key) => translations[language][key] || key;

  // State management (same as before)
  const [billNo, setBillNo] = useState("BS-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("Paid");
  const [discountMode, setDiscountMode] = useState("percent");
  const [discountValue, setDiscountValue] = useState(0);
  const [vat, setVat] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [products, setProducts] = useState([
    { sku: "SKU123", name: "Product A", quantity: 1, price: 100 },
  ]);

  // Helper functions (same as before)
  const updateProduct = (i, field, value) => {
    const updated = [...products];
    updated[i][field] =
      field === "name" || field === "sku" ? value : parseFloat(value) || 0;
    setProducts(updated);
  };

  const addProduct = () =>
    setProducts([...products, { sku: "", name: "", quantity: 1, price: 0 }]);
  const removeProduct = (i) =>
    setProducts(products.filter((_, idx) => idx !== i));

  // Calculations (same as before)
  const subtotal = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  const discount =
    discountMode === "percent"
      ? (subtotal * discountValue) / 100
      : discountValue;
  const vatAmount = ((subtotal - discount) * vat) / 100;
  const grandTotal =
    subtotal - discount + vatAmount + Number(adjustment) + Number(shipping);

  // PDF generation (same as before)
  const downloadPDF = () => {
    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${billNo}.pdf`);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.languageSelector}>
        <button
          onClick={() => setLanguage("en")}
          style={language === "en" ? styles.activeLangBtn : styles.langBtn}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("ja")}
          style={language === "ja" ? styles.activeLangBtn : styles.langBtn}
        >
          日本語
        </button>
      </div>

      <div ref={invoiceRef} style={styles.invoice}>
        <div style={styles.header}>
          <div style={styles.companyInfo}>
            <h2 style={styles.companyName}>{t("companyName")}</h2>
            <p>{t("companyAddress")}</p>
            <p>{t("city")}</p>
            <p>{t("contact")}</p>
          </div>

          <div style={styles.invoiceMeta}>
            <div style={styles.metaRow}>
              <span>
                <b>{t("billNo")}:</b>
              </span>
              <input
                value={billNo}
                onChange={(e) => setBillNo(e.target.value)}
                style={styles.inputSmall}
              />
            </div>
            <Barcode value={billNo} height={40} width={1.5} />
            <div style={styles.metaRow}>
              <span>
                <b>{t("status")}:</b>
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={styles.select}
              >
                <option value="Paid">{t("paid")}</option>
                <option value="Due">{t("due")}</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.customerSection}>
          <div style={styles.customerField}>
            <label>
              <b>{t("customerName")}</b>
            </label>
            <input
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.customerField}>
            <label>
              <b>{t("phone")}</b>
            </label>
            <input
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.customerField}>
            <label>
              <b>{t("date")}</b>
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>#</th>
              <th style={styles.tableHeader}>SKU</th>
              <th style={styles.tableHeader}>{t("product")}</th>
              <th style={styles.tableHeader}>{t("quantity")}</th>
              <th style={styles.tableHeader}>{t("price")}</th>
              <th style={styles.tableHeader}>{t("subtotal")}</th>
              <th style={styles.tableHeader}>{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr
                key={idx}
                style={idx % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td style={styles.tableCell}>{idx + 1}</td>
                <td style={styles.tableCell}>
                  <input
                    value={item.sku}
                    onChange={(e) => updateProduct(idx, "sku", e.target.value)}
                    style={styles.tableInput}
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    value={item.name}
                    type="text"
                    onChange={(e) => updateProduct(idx, "name", e.target.value)}
                    style={styles.tableInput}
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateProduct(idx, "quantity", e.target.value)
                    }
                    style={styles.tableInput}
                    min="1"
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateProduct(idx, "price", e.target.value)
                    }
                    style={styles.tableInput}
                    min="0"
                  />
                </td>
                <td style={styles.tableCell}>
                  ¥{(item.quantity * item.price).toFixed(2)}
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => removeProduct(idx)}
                    style={styles.deleteBtn}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addProduct} style={styles.addProductBtn}>
          {t("addProduct")}
        </button>

        <div style={styles.summaryBox}>
          <div style={styles.summaryLabels}>
            <p>{t("subtotal")}</p>
            <p>
              {t("discount")} (
              {discountMode === "percent" ? t("percent") : t("manual")})
            </p>
            <p>{t("vat")} (%)</p>
            <p>{t("adjustment")}</p>
            <p>{t("shipping")}</p>
            <h4 style={styles.grandTotalLabel}>{t("grandTotal")}</h4>
          </div>
          <div style={styles.summaryValues}>
            <p>¥{subtotal.toFixed(2)}</p>
            <div style={styles.discountControl}>
              <select
                value={discountMode}
                onChange={(e) => setDiscountMode(e.target.value)}
                style={styles.selectSmall}
              >
                <option value="percent">{t("percent")}</option>
                <option value="manual">{t("manual")}</option>
              </select>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                style={styles.inputSmall}
              />
            </div>
            <p>
              <input
                type="number"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                style={styles.inputSmall}
              />
            </p>
            <p>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                style={styles.inputSmall}
              />
            </p>
            <p>
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                style={styles.inputSmall}
              />
            </p>
            <h4 style={styles.grandTotal}>
              ¥{isNaN(grandTotal) ? "0.00" : grandTotal.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>

      <button onClick={downloadPDF} style={styles.downloadBtn}>
        {t("downloadPDF")}
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f5f7fa",
    padding: "30px 0",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  languageSelector: {
    maxWidth: 900,
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  langBtn: {
    padding: "6px 15px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  activeLangBtn: {
    padding: "6px 15px",
    backgroundColor: "#4a6cf7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  invoice: {
    maxWidth: 900,
    margin: "0 auto",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },
  companyInfo: {
    flex: 1,
    minWidth: "250px",
  },
  companyName: {
    color: "#2d3748",
    marginBottom: "10px",
    fontSize: "24px",
  },
  invoiceMeta: {
    textAlign: "right",
    minWidth: "200px",
  },
  metaRow: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "8px",
  },
  customerSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "8px",
  },
  customerField: {
    flex: "1 1 200px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    color: "#4a5568",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "14px",
    transition: "border 0.2s",
  },
  inputSmall: {
    padding: "8px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "14px",
    width: "120px",

    textAlign: "right",
  },
  select: {
    padding: "8px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "14px",
  },
  selectSmall: {
    padding: "6px 8px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "14px",
    marginRight: "5px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "25px",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#4a6cf7",
    color: "white",
    padding: "14px 12px",
    textAlign: "left",
    fontWeight: "500",
  },
  tableCell: {
    padding: "12px",
    borderBottom: "1px solid #edf2f7",
  },
  evenRow: {
    backgroundColor: "#f8fafc",
  },
  oddRow: {
    backgroundColor: "white",
  },
  tableInput: {
    width: "100%",

    padding: "8px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "14px",
  },
  addProductBtn: {
    backgroundColor: "#4a6cf7",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "25px",
    transition: "background 0.2s",
  },
  summaryBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "8px",
  },
  summaryLabels: {
    textAlign: "right",
    paddingRight: "15px",
    lineHeight: "2",
  },
  summaryValues: {
    textAlign: "right",
    minWidth: "180px",
  },
  discountControl: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "5px",
  },
  grandTotalLabel: {
    color: "#2d3748",
    marginTop: "10px",
  },
  grandTotal: {
    color: "#4a6cf7",
    fontSize: "18px",
    marginTop: "10px",
  },
  deleteBtn: {
    backgroundColor: "#f56565",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  downloadBtn: {
    margin: "30px auto",
    display: "block",
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#4a6cf7",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 6px rgba(74, 108, 247, 0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};

export default Invoice;
