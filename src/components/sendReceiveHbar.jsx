import { useState } from "react";
import { Leaf, Send, Copy, CheckCircle } from "lucide-react";

export default function SendReceiveHbar() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Replace this with your actual account ID
  const myAccountId = "0.0.6520369";

  const handleSend = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/send-hbar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, amount }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Transaction successful! ID: ${data.transactionId}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("⚠️ Failed to connect to backend.");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(myAccountId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border border-green-100">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <Leaf className="text-green-600 w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold text-green-700">Agritrust Wallet</h2>
        </div>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Send and receive HBAR securely on Hedera 🌱
        </p>

        {/* Send Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Send HBAR</h3>
          <input
            type="text"
            placeholder="Recipient Account ID (e.g., 0.0.xxxx)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 border border-green-200 rounded-xl mb-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Amount (HBAR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-green-200 rounded-xl mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            <Send className="w-5 h-5 mr-2" />
            Send HBAR
          </button>
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes("✅") ? "text-green-700" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Receive Section */}
        <div className="border-t border-green-100 pt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Receive HBAR</h3>
          <div className="flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-200">
            <span className="font-mono text-green-800 text-sm">{myAccountId}</span>
            <button
              onClick={handleCopy}
              className="text-green-700 hover:text-green-900 flex items-center text-sm font-medium"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" /> Copy

const myAccountId = "0.0.6520369";
</>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Share your account ID to receive HBAR.
          </p>
        </div>
      </div>
    </div>
  );
}