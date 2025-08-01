import axiosInstance from "../../lib/AxiosInstance";

interface DeleteTransactionParams {
  transactionId: string;
}

interface DeleteTransactionResponse {
  success: boolean;
  message: string;
}

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionParams): Promise<DeleteTransactionResponse> => {
  try {
    const response = await axiosInstance.delete(
      `/transaction/${transactionId}`
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.msg || "Transaction deleted successfully",
      };
    } else {
      return {
        success: false,
        message: response.data.msg || "Failed to delete transaction",
      };
    }
  } catch (error: unknown) {
    console.error("Delete transaction error:", error);

    // Handle different error types
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response: { data?: { msg?: string }; status: number };
      };
      return {
        success: false,
        message:
          axiosError.response.data?.msg ||
          `Server error: ${axiosError.response.status}`,
      };
    } else if (error && typeof error === "object" && "request" in error) {
      // Network error
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    } else {
      // Other errors
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
};
