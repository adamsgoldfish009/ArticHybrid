import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <AppRouter />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </div>
  );
}

export default App;
