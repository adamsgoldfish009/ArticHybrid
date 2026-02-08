import { BrowserRouter, useRoutes } from "react-router-dom";
import { routers } from "@/router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

function AppRoutes() {
  const routes = useRoutes(routers);
  return routes;
}

function App() {
  return (
    <div className="dark">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
