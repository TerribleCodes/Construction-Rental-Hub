import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState({});
  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      });
  });
  return (
    <div>
      {typeof backendData.users == "undefined"
        ? "Loading..."
        : backendData.users.map((user, index) => <p key={index}>{user}</p>)}
    </div>
  );
}

export default App;
