import TransactionTable from "../components/TransactionTable";

const AdminPages = () => {
  return (
    <div className="min-h-screen pb-20 items-center">
      <div className="w-xl self-center justify-between p-5 rounded-lg shadow-md">
        <ul>
          
        </ul>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <TransactionTable />
      </div>
    </div>
  );
};

export default AdminPages;
