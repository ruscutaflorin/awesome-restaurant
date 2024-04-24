import AdminDashboard from "../ui/adminPage/overview/dashboard";

const AdminPage = () => {
  return (
    <div className="w-full">
      <main className="flex w-full flex-col h-screen bg-slate-600">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminPage;
