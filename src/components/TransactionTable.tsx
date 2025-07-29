import AxiosInstance from "../lib/AxiosInstance";
import useSWR from "swr";
import { HiCheck, HiArrowPathRoundedSquare } from "react-icons/hi2";
type Transaction = {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  service?: {
    serviceName: string;
  };
  pageQuantity: number;
  type: string;
  color: string;
  file: string | null;
  totalPrice: number;
  status: string;
  paymentStatus: string;
};

const TransactionTable = () => {
  const fetchTransactions = async () => {
    const response = await AxiosInstance.get("/transaction");
    return response.data;
  };

  const { data: transactions, mutate } = useSWR(
    "transaction",
    fetchTransactions,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
      revalidateOnFocus: true, // Revalidate when the window is focused
    }
  );

  if (!transactions) {
    return <div>Loading...</div>;
  }

  const setTransactionStatus = async (id: string, status: string) => {
    try {
      await AxiosInstance.patch(`/transaction/${id}`, { status });

      // Trigger revalidation untuk update data di UI
      mutate();

      console.log(`Transaction ${id} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating transaction status:", error);
      alert("Failed to update transaction status");
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const res = await AxiosInstance.get(`/transaction/${id}/download`);
      const signedUrl = res.data.url;

      // Dapatkan nama file dari URL (key di database)
      const filename = signedUrl.split("?")[0].split("/").pop() || "file";

      // Fetch file sebagai blob
      const fileRes = await fetch(signedUrl);
      const blob = await fileRes.blob();

      // Buat link download manual
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename; // Gunakan nama asli file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Bersihkan blob URL setelah selesai
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("❌ Download error:", err);
      alert("Gagal mengunduh file");
    }
  };

  return (
    <div className="w-full p-5 border-3 bg-white border-emerald-400 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Transaction History
      </h2>
      <p className="text-center text-gray-600 mb-6">
        View and manage all print transactions
      </p>

      <div className="overflow-auto rounded-lg">
        <table className="min-w-full divide-y ">
          <thead className="bg-emerald-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Pages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                File
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Payment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction: Transaction, index: number) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.service?.serviceName || "Unknown Service"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.pageQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {transaction.type.replace("-", " ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {transaction.color.replace("-", " ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleDownload(transaction.id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition-colors text-xs"
                  >
                    Download
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  Rp.{transaction.totalPrice?.toLocaleString() || 0},00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>

                    {/* Button untuk mengubah status */}
                    {transaction.status === "pending" && (
                      <button
                        onClick={() =>
                          setTransactionStatus(transaction.id, "processing")
                        }
                        className="text-yellow-500 hover:text-yellow-700 text-sm"
                        title="Mark as Processing"
                      >
                        <HiArrowPathRoundedSquare className="inline-block" />
                      </button>
                    )}

                    {transaction.status === "processing" && (
                      <button
                        onClick={() =>
                          setTransactionStatus(transaction.id, "completed")
                        }
                        className="text-green-500 hover:text-green-700 text-sm"
                        title="Mark as Completed"
                      >
                        <HiCheck className="inline-block" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : transaction.paymentStatus === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
