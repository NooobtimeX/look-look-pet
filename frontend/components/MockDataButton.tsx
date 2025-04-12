"use client";

import { useState } from "react";

export default function MockDataButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleCreateMockData = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/mock-data", { method: "POST" });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      console.log("Mock data created:", data);
      setStatus("✅ Mock data created successfully!");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setStatus(`❌ Failed to create mock data: ${err.message}`);
      } else {
        setStatus("❌ Failed to create mock data: An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleCreateMockData}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Mock Data"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
