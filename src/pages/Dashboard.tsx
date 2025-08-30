import { useAuth } from "@/contexts/AuthContext";
import WorkerDashboard from "@/components/WorkerDashboard";
import EmployerDashboard from "@/components/EmployerDashboard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, userType } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {userType === 'worker' ? <WorkerDashboard /> : <EmployerDashboard />}
    </div>
  );
};

export default Dashboard;