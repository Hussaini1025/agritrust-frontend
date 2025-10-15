import { useEffect, useState } from "react";

// 👇 Replace this with your actual backend link
const API_BASE_URL = "https://hedera-vercel-demo.vercel.app";

function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/info`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">🌿 Agritrust dApp</h1>
      {info ? (
        <p className="mt-4 text-gray-700">{info.message}</p>
      ) : (
        <p className="mt-4 text-gray-500">Loading backend data...</p>
      )}
    </div>
  );
}

export default App;