import { useEffect, useRef, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { deleteTransaction } from "../features/transaction";
import { useNavigate } from "react-router";

interface TransactionData {
  transaction: {
    id: string;
    name: string;
    phone: string;
    service?: {
      serviceName: string;
    };
    pageQuantity: number;
    type: string;
    color: string;
    totalPrice: number;
  };
  snapToken: string;
  redirectUrl: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: TransactionData | null;
}

declare global {
  interface Window {
    snap: {
      embed: (
        token: string,
        options: {
          embedId: string;
          onSuccess: (result: unknown) => void;
          onPending: (result: unknown) => void;
          onError: (result: unknown) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

const PaymentModal = ({
  isOpen,
  onClose,
  transactionData,
}: PaymentModalProps) => {
  const isSnapEmbedded = useRef(false);
  const snapTokenRef = useRef<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  // Handle cancel order confirmation
  const handleCancelOrder = () => {
    setShowConfirmation(true);
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!transactionData?.transaction.id || isDeleting) return;

    setIsDeleting(true);

    try {
      const result = await deleteTransaction({
        transactionId: transactionData.transaction.id,
      });

      if (result.success) {
        setShowConfirmation(false);
        onClose();
        // Show success message;
        // Redirect to home page
        navigate("/");
      } else {
        alert(result.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("An unexpected error occurred while cancelling the order");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle close confirmation modal
  const handleCloseConfirmation = () => {
    if (!isDeleting) {
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    if (isOpen && transactionData?.snapToken) {
      // Show loading overlay
      const loadingOverlay = document.getElementById("loading-overlay");
      if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
      }

      // Check if Snap is loaded
      if (!window.snap) {
        console.error("Snap not loaded");
        if (loadingOverlay) {
          loadingOverlay.innerHTML = `
            <div class="text-center">
              <p class="text-red-500">Payment gateway not loaded</p>
              <p class="text-sm text-gray-500 mb-4">Please refresh the page and try again</p>
              <button onclick="window.location.reload()" class="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">Refresh Page</button>
            </div>
          `;
        }
        return;
      }

      // Prevent multiple embeds for the same token
      if (
        isSnapEmbedded.current &&
        snapTokenRef.current === transactionData.snapToken
      ) {
        if (loadingOverlay) {
          loadingOverlay.style.display = "none";
        }
        return;
      }

      // Clear previous content and reset state
      const container = document.getElementById("snap-container-modal");
      if (container) {
        container.innerHTML = "";
      }

      isSnapEmbedded.current = false;
      snapTokenRef.current = transactionData.snapToken;

      // Delay sedikit untuk memastikan modal sudah ter-render
      setTimeout(() => {
        try {
          console.log("Loading Snap with token:", transactionData.snapToken);

          window.snap.embed(transactionData.snapToken, {
            embedId: "snap-container-modal",
            onSuccess: (result) => {
              console.log("✅ Payment Success:", result);
              isSnapEmbedded.current = false;
              snapTokenRef.current = null;
              onClose();
            },
            onPending: (result) => {
              console.log("⏳ Payment Pending:", result);
              alert("Pembayaran sedang diproses");
            },
            onError: (result) => {
              console.error("❌ Payment Error:", result);
              isSnapEmbedded.current = false;
              snapTokenRef.current = null;
              alert("Pembayaran gagal!");
            },
            onClose: () => {
              console.log("🛑 Payment popup closed");
              isSnapEmbedded.current = false;
              snapTokenRef.current = null;
            },
          });

          isSnapEmbedded.current = true;

          // Hide loading overlay after snap loads
          setTimeout(() => {
            if (loadingOverlay) {
              loadingOverlay.style.display = "none";
            }

            // Ensure snap iframe takes full width
            const snapFrame = document.querySelector(
              "#snap-container-modal iframe"
            ) as HTMLIFrameElement;
            if (snapFrame) {
              snapFrame.style.width = "100%";
              snapFrame.style.minWidth = "100%";
            }
          }, 1000);
        } catch (error) {
          console.error("Error loading Snap:", error);
          isSnapEmbedded.current = false;
          snapTokenRef.current = null;
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          if (loadingOverlay) {
            loadingOverlay.innerHTML = `
              <div class="text-center">
                <p class="text-red-500">Error loading payment gateway</p>
                <p class="text-sm text-gray-500 mb-4">${errorMessage}</p>
                <button onclick="window.location.reload()" class="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">Retry</button>
              </div>
            `;
          }
        }
      }, 500);
    }
  }, [isOpen, transactionData, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      isSnapEmbedded.current = false;
      snapTokenRef.current = null;

      // Clear container when modal closes
      const container = document.getElementById("snap-container-modal");
      if (container) {
        container.innerHTML = "";
      }
    }
  }, [isOpen]);

  if (!isOpen || !transactionData) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b bg-emerald-500 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Complete Your Payment</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-emerald-100 mt-1">
            Review your order and complete the payment
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">
                    Transaction ID:
                  </span>
                  <span className="text-gray-800 font-mono text-sm">
                    {transactionData.transaction.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Nama:</span>
                  <span className="text-gray-800">
                    {transactionData.transaction.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Telepon:</span>
                  <span className="text-gray-800">
                    {transactionData.transaction.phone}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">
                Print Details
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Kertas:</span>
                  <span className="text-gray-800">
                    {transactionData.transaction.service?.serviceName ||
                      "Loading service..."}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Pages:</span>
                  <span className="text-gray-800">
                    {transactionData.transaction.pageQuantity} pages
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Tipe Print:</span>
                  <span className="text-gray-800 capitalize">
                    {transactionData.transaction.type.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Warna:</span>
                  <span className="text-gray-800 capitalize">
                    {transactionData.transaction.color.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-lg">
                <span className="text-xl font-semibold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-emerald-600">
                  Rp.{transactionData.transaction.totalPrice.toLocaleString()}
                  ,00
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">
                Payment Instructions:
              </h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Choose your preferred payment method</li>
                <li>• Complete the payment process</li>
                <li>• Your order will be processed immediately</li>
                <li>• You will receive a confirmation email</li>
              </ul>
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Payment Gateway
            </h3>
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden relative">
              <div
                id="snap-container-modal"
                key={transactionData?.snapToken}
                className="min-h-[600px] w-full bg-white"
                style={{ minWidth: "100%" }}
              >
                {/* Loading akan di-replace oleh Snap */}
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center bg-white"
                id="loading-overlay"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading payment options...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <p>💡 Need help? Contact our support team</p>
            </div>
            <button
              onClick={handleCancelOrder}
              disabled={isDeleting}
              className="px-6 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        title="Cancel Order"
        message={`Are you sure you want to cancel this order? This action will permanently delete the transaction (ID: ${transactionData?.transaction.id}) and all associated files from our system. This action cannot be undone.`}
        confirmText={isDeleting ? "Cancelling..." : "Yes, Cancel Order"}
        cancelText="Keep Order"
        isLoading={isDeleting}
        type="danger"
      />
    </div>
  );
};

export default PaymentModal;
