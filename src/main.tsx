import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <Sonner />
    <ToastContainer />
  </BrowserRouter>
);
