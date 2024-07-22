import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("Fetching...");
  useEffect(() => {
    async function request() {
      const response = await fetch("http://localhost:8080/");
      console.log(response);
      const resData = await response.json();
      console.log(resData.message);
      setData(resData.message);
    }
    request();
  }, []);
  return (
    <>
      <p>{data}</p>
    </>
  );
}

export default App;
