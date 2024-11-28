import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      alert("Please enter a query");
      return;
    }

    try {
      console.log("Sending request with body:", { query });
      const response = await axios.post(
        "https://dataset-searcher.onrender.com/search",
        {
          query,
        }
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data", error);
      console.error("Response data:", error.response.data);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-[100vw] h-[100vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1684503830683-108f3e0fd03f?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="w-[50%] h-[100%] flex items-center justify-center">
        <div className="card bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-6">
            Dataset Search Application
          </h1>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter Your Query"
              className="p-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="Out w-[50%] h-[100%] bg-transparent p-8 overflow-y-auto flex h-[100vh] items-center justify-center">
        {results.length > 0 && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Top Results:</h2>
            <table className="card bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20">
              <thead>
                <tr className="bg-white/20 text-white">
                  <th className="py-2 px-4 text-left">Dataset Category</th>
                  <th className="py-2 px-4 text-left">Vendor</th>
                  <th className="py-2 px-4 text-left">Dataset Name</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Therapeutic Coverage</th>
                  <th className="py-2 px-4 text-left">Geographic Coverage</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-white/20">
                    <td className="py-2 px-4 text-white">
                      {result["Dataset Category"]}
                    </td>
                    <td className="py-2 px-4 text-white">{result["Vendor"]}</td>
                    <td className="py-2 px-4 text-white">
                      {result["Dataset Name"]}
                    </td>
                    <td className="py-2 px-4 text-white">
                      {result["Description"]}
                    </td>
                    <td className="py-2 px-4 text-white">
                      {result["Therapeutic coverage"]}
                    </td>
                    <td className="py-2 px-4 text-white">
                      {result["Geographic coverage"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
