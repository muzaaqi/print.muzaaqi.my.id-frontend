import { useState, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";
import PaymentModal from "../components/PaymentModal";

type TransactionData = {
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
};

const CheckoutPage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="snap.js"]');
    if (existingScript) {
      console.log("Snap script already loaded");
      return;
    }

    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    console.log("Midtrans Client Key:", clientKey);

    if (!clientKey) {
      console.error(
        "❌ VITE_MIDTRANS_CLIENT_KEY not found in environment variables"
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    script.onload = () => {
      console.log("✅ Snap script loaded successfully");
    };

    script.onerror = () => {
      console.error("❌ Failed to load Snap script");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleTransactionCreated = (
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
    },
    snapToken: string,
    redirectUrl: string
  ) => {
    const transactionData: TransactionData = {
      transaction,
      snapToken,
      redirectUrl,
    };
    setTransactionData(transactionData);
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setTransactionData(null);
  };
  return (
    <div className="min-h-screen md:px-15">
      <div className="mt-5 flex md:bg-emerald-200/50 rounded-lg md:shadow-emerald-400/50 shadow-lg">
        <CheckoutForm onTransactionCreated={handleTransactionCreated} />
        <div className="w-1/2 justify-center py-20 px-15 xl:px-30 hidden lg:flex">
          <div
            id="snap-container"
            className="w-full p-5 border-3 bg-white border-emerald-400 rounded-lg shadow-md"
          ></div>
        </div>
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleCloseModal}
          transactionData={transactionData}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
