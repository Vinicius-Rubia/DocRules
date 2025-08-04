import { useFlowStore } from "@/stores/flow-store";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const accessKey = useFlowStore((state) => state.accessKey);
  if (accessKey) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}
