"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState<{ name: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/restaurant")
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
        setMessage(message);
      });
  }, []);
  return (
    <main>
      <h1>
        {message.map((element) => (
          <h1>{element.name}</h1>
        ))}
      </h1>
    </main>
  );
}
