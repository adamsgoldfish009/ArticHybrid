import { BrowserRouter, useRoutes } from "react-router-dom";
import { routers } from "@/router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

function AppRoutes() {
  const routes = useRoutes(routers);
  return routes;
}

function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </div>
  );
}

export default App;
