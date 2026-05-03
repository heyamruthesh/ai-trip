"use client";

import { useState } from "react";

export default function Home() {
  const [people, setPeople] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState("");
  const [tripType, setTripType] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
  setResult("Generating trip plan...");

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      people,
      from,
      to,
      days,
      tripType,
    }),
  });

  const data = await res.json();
  if (data.error) {
  setResult("Error: " + data.error);
} else {
  setResult(data.result);
}

};


  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Trip Planner</h1>

      <input
        placeholder="Number of People"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Current Location"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Destination"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Number of Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Type of Trip (Leisure / Budget / Adventure)"
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Generate Trip</button>

      <pre style={{ marginTop: "20px" }}>{result}</pre>
    </main>
  );
}
