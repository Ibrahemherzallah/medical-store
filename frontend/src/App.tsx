import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PurchasePage from "./components/PurchasePage";
import PrivacyPage from "./components/PrivacyPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ArticlesPage from "./components/ArticlesPage";
import AdminPanel from "./components/AdminPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/protect.tsx";
import ArticleDetailPage from "./components/ArticleDetailPage";
import ScrollToTop from "./ScrollToTop";
import ProductPage from "./components/ProductPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected: only logged-in users */}
            <Route
                path="/articles"
                element={
                    <ProtectedRoute>
                        <ArticlesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/articles/:id"
                element={
                    <ProtectedRoute>
                        <ArticleDetailPage />
                    </ProtectedRoute>
                }
            />


          {/* Admin only */}
          <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
