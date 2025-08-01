import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import AxiosInstance from "../lib/AxiosInstance";
import Loading from "./ui/Loading";

type Service = {
  id: string;
  serviceName: string;
  remainingStock: number;
  priceOneSide: number;
  priceColorOneSide: number;
  priceTwoSides: number;
  priceColorTwoSides: number;
};

type CheckoutFormProps = {
  onTransactionCreated: (transaction: {
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
  }, snapToken: string, redirectUrl: string) => void;
};

const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "image/png",
  "image/jpeg", // .jpg & .jpeg
];

const checkoutSchema = z.object({
  name: z.string().min(1, "Wajib mengisi nama."),
  phone: z.string().min(1, "Wajib mengisi nomor telepon."),
  file: z
    .any()
    .refine((files) => files?.length === 1, {
      message: "Wajib mengunggah tepat satu file.",
    })
    .refine((files) => ACCEPTED_MIME_TYPES.includes(files?.[0]?.type), {
      message:
        "Format file tidak valid. Hanya PDF, DOC, DOCX, PNG, JPG, atau JPEG.",
    }),
  pageQuantity: z.number().min(1, "Wajib mengisi jumlah halaman."),
  type: z.enum(["one-side", "two-sides"]),
  color: z.enum(["black-and-white", "color"]),
  note: z.string().optional(),
});

type CheckoutSchema = z.infer<typeof checkoutSchema>;

const getServiceById = async (id: string) => {
  const response = await AxiosInstance.get(`/services/${id}`);
  return response.data;
};

const CheckoutForm = ({ onTransactionCreated }: CheckoutFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  // Fetch service once
  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!serviceId) return;
        const data = await getServiceById(serviceId);
        setService(data);
      } catch (err) {
        console.error("Failed to fetch service:", err);
      }
    };
    if (serviceId) fetchService();
  }, [serviceId]);

  // File upload handlers
  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    // Create a FileList-like object
    const dt = new DataTransfer();
    dt.items.add(file);
    form.setValue("file", dt.files);
    form.clearErrors("file");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (ACCEPTED_MIME_TYPES.includes(file.type)) {
        handleFileSelect(file);
      } else {
        form.setError("file", {
          message:
            "Format file tidak valid. Hanya PDF, DOC, DOCX, PNG, JPG, atau JPEG.",
        });
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Hitung harga setiap form berubah
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!service) return;

      const PRICE_MAP = {
        "one-side": {
          "black-and-white": service.priceOneSide,
          color: service.priceColorOneSide,
        },
        "two-sides": {
          "black-and-white": service.priceTwoSides,
          color: service.priceColorTwoSides,
        },
      } as const;

      const { pageQuantity, type, color } = value;
      if (!type || !color) return;

      const base = PRICE_MAP[type]?.[color];

      if (!base || !pageQuantity) {
        setBasePrice(0);
        setTotalPrice(0);
        return;
      }

      const sheets =
        type === "two-sides" ? Math.ceil(pageQuantity / 2) : pageQuantity;

      const total = base * sheets;

      setBasePrice(base);
      setTotalPrice(total);
    });

    return () => subscription.unsubscribe();
  }, [form, service]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!service) return;

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("file", values.file[0]); // file wajib [0]
    formData.append("pageQuantity", values.pageQuantity.toString());
    formData.append("type", values.type);
    formData.append("color", values.color);
    if (values.note) formData.append("note", values.note);
    formData.append("serviceId", service.id);
    formData.append("totalPrice", totalPrice.toString());
    formData.append("paymentStatus", "pending");

    setIsLoading(true);

    try {
      const res = await AxiosInstance.post("/transaction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const {transaction, snapToken, redirectUrl} = res.data;
      onTransactionCreated(transaction, snapToken, redirectUrl);

      form.reset();
      setUploadedFile(null);
      setTotalPrice(0);
      setBasePrice(0);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  });

  if (!service) return <p>Loading service...</p>;
  return (
    <div className="w-full lg:w-1/2 p-5 md:border-3 md:bg-white md:border-emerald-400 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Checkout Form</h2>
      <p className="text-center text-gray-600 mb-6">
        Please fill out the form below to complete your checkout.
      </p>
      <form onSubmit={onSubmit}>
        <label htmlFor="name" className="mt-4 block font-semibold">
          Name:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Masukkan nama Anda"
          className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 w-full mt-2"
          {...form.register("name", { required: true })}
        />

        {form.formState.errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.name.message}
          </p>
        )}

        <label htmlFor="phone" className="mt-4 block font-semibold">
          Phone:
        </label>
        <input
          id="phone"
          type="text"
          placeholder="Masukkan nomor telepon Anda"
          className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 w-full mt-2"
          {...form.register("phone", { required: true })}
        />

        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.phone.message}
          </p>
        )}

        <label htmlFor="upload-file" className="mt-4 block font-semibold">
          Upload File:
        </label>

        {/* Drag and Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 mt-2 cursor-pointer transition-all duration-200
            ${
              isDragOver
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
            }
            ${form.formState.errors.file ? "border-red-400 bg-red-50" : ""}
          `}
        >
          <div className="text-center">
            {uploadedFile ? (
              <div className="space-y-2">
                <div className="text-emerald-600">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <path d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20L28 8z" />
                    <path d="M28 8v12h12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                    const dt = new DataTransfer();
                    form.setValue("file", dt.files);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20L28 8z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="16,13 6,1 6,3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="30,13 40,1 40,3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="text-emerald-600">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, PNG, JPG or JPEG
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          id="upload-file"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={handleFileInputChange}
        />

        {form.formState.errors.file && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.file &&
            typeof form.formState.errors.file.message === "string"
              ? form.formState.errors.file.message
              : null}
          </p>
        )}

        <div className="w-full flex md:flex-row flex-col gap-10">
          <div className="">
            <label htmlFor="pageQuantity" className="mt-4 block font-semibold">
              Halaman:
            </label>
            <input
              id="pageQuantity"
              type="number"
              placeholder="Jumlah halaman"
              className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 mt-2 w-full"
              {...form.register("pageQuantity", { valueAsNumber: true })}
            />

            {form.formState.errors.pageQuantity && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.pageQuantity.message}
              </p>
            )}
          </div>
          <div className="flex flex-row gap-10">
            <div>
              <label htmlFor="type" className="mt-4 block font-semibold">
                Print Type:
              </label>
              <select
                id="type"
                className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 mt-2"
                {...form.register("type")}
              >
                <option value="one-side">Satu Sisi</option>
                <option value="two-sides">Dua Sisi</option>
              </select>
            </div>
            <div>
              <label htmlFor="color" className="mt-4 block font-semibold">
                Color Type:
              </label>
              <select
                id="color"
                className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 mt-2"
                {...form.register("color")}
              >
                <option value="black-and-white">Hitam Putih</option>
                <option value="color">Berwarna</option>
              </select>
            </div>
          </div>
        </div>

        <label htmlFor="note" className="mt-4 block font-semibold">
          Note:
        </label>
        <textarea
          id="note"
          placeholder="Masukkan catatan tambahan (opsional)"
          className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 w-full mt-2"
          rows={4}
          {...form.register("note")}
        />
        {form.formState.errors.note && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.note.message}
          </p>
        )}
        <div className="mt-4 w-full flex justify-between">
          <h3 className="font-semibold">Harga Perlembar :</h3>
          <p className="text-lg">
            {basePrice > 0 ? `Rp.${basePrice.toLocaleString()},00` : "Rp.0,00"}
          </p>
        </div>
        <div className="mt-2 w-full flex justify-between">
          <h3 className="font-semibold">Total :</h3>
          <p className="text-lg font-bold text-emerald-400">
            {totalPrice > 0
              ? `Rp.${totalPrice.toLocaleString()},00`
              : "Rp.0,00"}
          </p>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {isLoading ? <Loading /> : "Checkout"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
