import React, { useState, useEffect } from "react";

// Define the interface for the response data
interface FeeDetailsData {
  amount: number;
  t_id: string;
}

const FeeBoard = () => {
  const [feeDetails, setFeeDetails] = useState<FeeDetailsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/feedetails?id=student",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjVjYjVhMTY4LTY4ZmUtNDZmNi1hYjRjLWQyOWViODQyMmQyZSIsImV4cCI6MTcwOTM4MjQwMSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA4NjQwMX0.xU1cDi6qkCjxOgXZw-I2qQ8Izh3B64HSkeo785JXOEE",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setFeeDetails([responseData.data]); // Store data in array for rendering as table row
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-3">
      <h2 className="text-xl text-gray-900 font-semibold">FeeBoard</h2>
      {error && <div>Error: {error}</div>}
      {feeDetails.length > 0 && (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
              <th className="border border-gray-400 px-4 py-2">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody>
            {feeDetails.map((transaction, index) => (
              <tr key={index} className="border border-gray-400">
                <td className="border border-gray-400 px-4 py-2">
                  {transaction.amount}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {transaction.t_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeeBoard;
