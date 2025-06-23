import React, { useState } from "react";

const Appi = () => {
  // Initial invoice data
  const initialInvoiceData = {
    invoiceNumber: "BSJ002462",
    invoiceDate: "2025/05/14",
    dueDate: "2025/05/15",
    terms: "Custom",
    customerName: "Sandi Maulana",
    customerAddress:
      "501-3944 Gifu Ken, Seki-shi, Sekishi yamada 1028-1, Ruminasu nij igaoka 101",
    companyName: "BLUE SPACE",
    companyAddress: "CHABA KEN, CHIBA SHI. CHUO KU, KUYO 1-4-102",
    companyPhone: "043-375-7572",
    companyLocation: "Tokyo Chiba 260-0007 Japan",
    items: [
      {
        id: 1,
        description: "DELL SLIM i7 8 TH GEN 16 GB RAM 512 GB SSD COLOUR: BLACK",
        quantity: 1.0,
        rate: 34500,
        discount: 370,
        amount: 34130,
      },
    ],
    shippingCharge: 1370,
    thankYouMessage: "Thank you for the payment.",
    trackingId: "711082112064 (JAPAN POST)",
    warrantyNote: "Warranty: 1-month warranty from the due date of receipt.",
    taxNote:
      "Tax: 10% Consumption Tax(Electronic) is already included in the sale price.",
  };

  const [invoice, setInvoice] = useState(initialInvoiceData);
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1.0,
    rate: 0,
    discount: 0,
  });

  const handleItemChange = (id, field, value) => {
    const updatedItems = invoice.items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
            amount: calculateAmount(
              value,
              item.quantity,
              item.rate,
              item.discount
            ),
          }
        : item
    );
    setInvoice({ ...invoice, items: updatedItems });
  };

  const calculateAmount = (description, quantity, rate, discount) => {
    return Math.max(0, quantity * rate - discount);
  };

  const addItem = () => {
    if (
      !newItem.description ||
      newItem.quantity <= 0 ||
      newItem.rate < 0 ||
      newItem.discount < 0
    )
      return;
    const nextId =
      invoice.items.length > 0
        ? Math.max(...invoice.items.map((i) => i.id)) + 1
        : 1;
    const amount = calculateAmount(
      newItem.description,
      newItem.quantity,
      newItem.rate,
      newItem.discount
    );
    const newItemWithId = { ...newItem, id: nextId, amount };
    setInvoice({ ...invoice, items: [...invoice.items, newItemWithId] });
    setNewItem({ description: "", quantity: 1.0, rate: 0, discount: 0 });
  };

  const removeItem = (id) => {
    setInvoice({ ...invoice, items: invoice.items.filter((i) => i.id !== id) });
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + invoice.shippingCharge;
  const balanceDue = total;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-sm text-gray-600">#{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{invoice.companyName}</p>
            <p className="text-xs text-gray-600">{invoice.companyAddress}</p>
            <p className="text-xs text-gray-600">
              Phone: {invoice.companyPhone}
            </p>
            <p className="text-xs text-gray-600">{invoice.companyLocation}</p>
          </div>
        </div>

        {/* Customer and Invoice Info */}
        <div className="px-6 py-4 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Bill To:
            </h2>
            <p className="text-gray-800">{invoice.customerName}</p>
            <p className="text-sm text-gray-600">{invoice.customerAddress}</p>
          </div>
          <div className="text-right">
            <p>
              <span className="font-semibold">Invoice Date:</span>{" "}
              {invoice.invoiceDate}
            </p>
            <p>
              <span className="font-semibold">Due Date:</span> {invoice.dueDate}
            </p>
            <p>
              <span className="font-semibold">Terms:</span> {invoice.terms}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="px-6 py-4">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Qty</th>
                <th className="py-2 px-4">Rate</th>
                <th className="py-2 px-4">Discount</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-right"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-right"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "rate",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-right"
                      value={item.discount}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "discount",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-4 text-right">
                    ¥{item.amount.toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Item Form */}
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-gray-700">Add New Item</h3>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Description"
                className="flex-grow border border-gray-300 rounded px-3 py-2"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
              <input
                type="number"
                step="0.01"
                placeholder="Qty"
                className="w-20 border border-gray-300 rounded px-3 py-2"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: parseFloat(e.target.value),
                  })
                }
              />
              <input
                type="number"
                placeholder="Rate"
                className="w-24 border border-gray-300 rounded px-3 py-2"
                value={newItem.rate}
                onChange={(e) =>
                  setNewItem({ ...newItem, rate: parseInt(e.target.value) })
                }
              />
              <input
                type="number"
                placeholder="Discount"
                className="w-24 border border-gray-300 rounded px-3 py-2"
                value={newItem.discount}
                onChange={(e) =>
                  setNewItem({ ...newItem, discount: parseInt(e.target.value) })
                }
              />
              <button
                onClick={addItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-t">
          <div className="flex justify-end space-x-4">
            <div className="text-right">
              <p>
                <span className="font-semibold">Sub Total:</span> ¥
                {subtotal.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Shipping Charge:</span> ¥
                {invoice.shippingCharge.toLocaleString()}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Total:</span> ¥
                {total.toLocaleString()}
              </p>
              <p className="text-xl font-bold mt-2">
                <span className="font-semibold">Balance Due:</span> ¥
                {balanceDue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="px-6 py-4 border-t">
          <p className="font-medium">{invoice.thankYouMessage}</p>
          <p className="mt-1 text-sm text-gray-600">
            Tracking ID: {invoice.trackingId}
          </p>
          <p className="mt-1 text-sm text-gray-600">{invoice.warrantyNote}</p>
          <p className="mt-1 text-sm text-gray-600">{invoice.taxNote}</p>
        </div>
      </div>
    </div>
  );
};

export default Appi;
