import { BaseLayout } from "@/layouts/base-layout";
import { CreateRule } from "@/pages/create-rule/page";
import { Customers } from "@/pages/customers/page";
import { DataManagment } from "@/pages/data-management/page";
import { Login } from "@/pages/login/page";
import { Modules } from "@/pages/modules/page";
import { Overview } from "@/pages/overview/page";
import { Rules } from "@/pages/rules/page";
import { UpdateRule } from "@/pages/update-rule/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./guard/protected-route";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/rules/create" element={<CreateRule />} />
            <Route path="/rules/:id" element={<UpdateRule />} />
            <Route path="/data-management" element={<DataManagment />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
