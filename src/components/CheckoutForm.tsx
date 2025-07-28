import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
// import { HiMiniWallet } from "react-icons/hi2";

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

const CheckoutForm = () => {
  
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ basePrice, setBasePrice ] = useState(0);
  const { serviceId } = useParams<{ serviceId: string }>();

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    const submitData = {
      ...values,
      serviceId: serviceId,
      totalPrice: totalPrice,
      paymentStatus: "pending", // Assuming you want to set a default payment status
    };
    console.log("Submitting data:", submitData);
  });

  const PRICE_MAP = {
    "one-side": {
      "black-and-white": 500,
      color: 750,
    },
    "two-sides": {
      "black-and-white": 650,
      color: 1000,
    },
  } as const;

  const calcTotalPrice = (value: CheckoutSchema) => {
    const { pageQuantity, type, color } = value;
    const basePrice = PRICE_MAP[type]?.[color];

    if (!basePrice || !pageQuantity) {
      setTotalPrice(0);
      setBasePrice(0);
      return;
    }

    // Hitung jumlah lembar yang dibutuhkan
    const actualSheets =
      type === "two-sides"
        ? Math.ceil(pageQuantity / 2) // Pembulatan ke atas
        : pageQuantity;

    const totalPrice = basePrice * actualSheets;

    if (!isNaN(totalPrice)) {
      setBasePrice(basePrice); // Harga per lembar
      setTotalPrice(totalPrice); // Total harga
    }
  };
  form.watch((value) => {
    calcTotalPrice(value as CheckoutSchema);
  });
  
  return (
    <div className="w-full lg:w-1/2 p-5 border-3 bg-white border-emerald-400 rounded-lg shadow-md">
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
        <input
          id="upload-file"
          type="file"
          className="border border-gray-300 focus:ring-emerald-400 focus:border-emerald-400 rounded-md p-2 w-full mt-2"
          {...form.register("file", { required: true })}
        />

        {form.formState.errors.file && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.file &&
            typeof form.formState.errors.file.message === "string"
              ? form.formState.errors.file.message
              : null}
          </p>
        )}

        <div className="mt-2 w-full flex md:flex-row flex-col gap-10">
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
          <h3 className="font-semibold">Harga Perlembar</h3>
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
          Pay Now!
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
