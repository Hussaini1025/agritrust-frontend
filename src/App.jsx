import React, { useState } from "react";

function App() {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://hedera-vercel-demo.vercel.app/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId,
          amount: parseInt(amount) * 100000000, // convert HBAR → tinybars
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
          🌾 Agritrust HBAR Transfer
        </h1>

        <form onSubmit={handleTransfer} className="space-y-4">
          <input
            type="text"
            placeholder="Receiver Account ID (e.g. 0.0.5678)"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />

          <input
            type="number"
            placeholder="Amount (HBAR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Transferring..." : "Transfer HBAR"}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            {result.success ? (
              <div>
                <p className="text-green-600 font-semibold mb-2">
                  ✅ Transfer Successful!
                </p>
                <p>
                  <strong>Transaction ID:</strong> {result.txId}
                </p>
                <p>
                  <strong>Status:</strong> {result.status}
                </p>
                <a
                  href={result.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View on HashScan →
                </a>
              </div>
            ) : (
              <p className="text-red-600">
                ❌ Error: {result.error || "Transaction failed"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;