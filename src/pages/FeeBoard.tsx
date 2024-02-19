import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getFeeDetails } from "../api/fee-details.api";

// Define the interface for the response data
interface FeeDetailsData {
  ht_no: string;
  amount: number;
  transaction_id: string;
  is_paid: boolean;
  payment_date: string;
}

const FeeBoard = () => {
  const [feeDetails, setFeeDetails] = useState<FeeDetailsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const userData = useSelector((state: any) => state.user.userData);
  const isTeacher = userData.role === "teacher";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth) return;
        const data = isTeacher
          ? await getFeeDetails(auth.accesstoken)
          : await getFeeDetails(auth.accesstoken, userData.ht_no);
        setFeeDetails(data.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [auth, isTeacher, userData.ht_no]);

  return (
    <div className="m-3">
      <h2 className="text-xl text-gray-900 font-semibold">FeeBoard</h2>
      {error && <div>Error: {error}</div>}
      {feeDetails.length > 0 ? (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">HT No</th>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
              <th className="border border-gray-400 px-4 py-2">
                Transaction ID
              </th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {feeDetails.map((transaction, index) => (
              <tr key={index} className="border border-gray-400">
                <td className="border border-gray-400 px-4 py-2">
                  {transaction.ht_no}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {transaction.amount}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {transaction.transaction_id}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    transaction.is_paid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.is_paid ? "Paid" : "Not Paid"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {transaction.payment_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No fee details available.</div>
      )}
    </div>
  );
};

export default FeeBoard;
