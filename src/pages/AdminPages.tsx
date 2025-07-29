import TransactionTable from "../components/TransactionTable";

const AdminPages = () => {
  return (
    <div className="min-h-screen pb-20 items-center">
      <h1 className="text-4xl font-bold text-center mt-10">Admin Page</h1>
      <div className="mt-10 flex flex-col items-center">
        <TransactionTable />
      </div>
    </div>
  );
};

export default AdminPages;
