import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import UserDetails from "./Components/UserDetails";
import RefreshButton from "./Components/RefreshButton";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorBoundary from "./Components/ErrorBoundary";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("userData"); // Clear the stored data
      const storedData = localStorage.getItem("userData");
  
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        const response = await axios.get("https://randomuser.me/api/");
        const { results } = response.data;
        setUserData(results[0]);
        localStorage.setItem("userData", JSON.stringify(results[0]));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const refreshData = async() => {
    setUserData(null);
    setError(null);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ErrorBoundary>
      <div>
        {loading && <LoadingSpinner />}
        {error && <p>Error: {error}</p>}
        {userData && (
          <div>
            <h1>User Information</h1>
            <UserDetails userData={userData} />
            <RefreshButton onClick={refreshData} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;