import Loader from "@/components/loader";
import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import BrandListingPage from "@/pages/admin/brand/brand-listing-page";
import CategoriesPage from "@/pages/admin/category/categories-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import OrderDetailPage from "@/pages/admin/order/order-detail-page";
import OrdersPage from "@/pages/admin/order/orders-page";
import CreateProductPage from "@/pages/admin/product/create-product/create-product-page";
import ProductDetailPage from "@/pages/admin/product/product-detail-page";
import ProductsPage from "@/pages/admin/product/product-listing/products-page";
import UpdateProductPage from "@/pages/admin/product/update-product-page";
import CreateUserPage from "@/pages/admin/user/create-user-page";
import UpdateUserPage from "@/pages/admin/user/update-user-page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersPage from "@/pages/admin/user/user-listing/users-page";
import useAuthStore from "@/stores/use-auth-store";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const MainContainter = () => {
  const authStore = useAuthStore();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      authStore.fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    if (authStore.user != null && authStore.user?.role != "Admin") {
      navigate("/unauthorize");
      return;
    }
    if (!token || authStore.error) {
      navigate("/log-in");
      return;
    }
  }, [authStore.user, token, authStore.error]);

  if (authStore.loading) {
    return <Loader />;
  }
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/edit-user/:userId" element={<UpdateUserPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route
          path="/edit-product/:productId"
          element={<UpdateProductPage />}
        />
        <Route path="/order" element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<OrderDetailPage />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/brand" element={<BrandListingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default MainContainter;
