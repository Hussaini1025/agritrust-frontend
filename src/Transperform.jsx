import { useState } from "react";

function TransferForm() {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Processing...");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transfer` , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toAccount, amount }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Success: ${data.status}");
      } else {
        setStatus("❌ Error: ${data.error}");
      }
    } catch (err) {
      setStatus("⚠️ Connection error: ${err.message}");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>💸 Send HBAR</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipient Account ID"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (HBAR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default TransferForm;