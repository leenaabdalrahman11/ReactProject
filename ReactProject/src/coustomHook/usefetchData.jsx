import axios from "axios";
import { useEffect, useState } from "react";

export default function usefetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
  console.log(data);
  const fetchData = async () => {
    setLoading(true); 
     try {
      const response = await axios.get(url);
      setData(response.data); 
      setError(null); 
    } catch (error) {
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false); }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
}
