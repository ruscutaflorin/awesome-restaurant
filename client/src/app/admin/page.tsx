import AdminDashboard from "../ui/adminPage/overview/dashboard";

const AdminPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-teal-900 to-teal-700">
      <main className="flex w-full flex-col h-full p-8 rounded-xl shadow-lg mx-auto max-w-8xl">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminPage;
