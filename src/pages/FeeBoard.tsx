import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

// Define the interface for the response data
interface FeeDetailsData {
  amount: number;
  t_id: string;
}

const FeeBoard = () => {
  const [feeDetails, setFeeDetails] = useState<FeeDetailsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const userData = useSelector((state: any) => state.user.userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/feedetails?id=student",
          {
            headers: {
              Authorization: `Bearer ${auth?.accesstoken}`,
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
