import MainLayout from "@/layouts/main-layout";
import CategoriesPage from "@/pages/admin/category/categories-page";
import CreateCategoryPage from "@/pages/admin/category/create-category-page";
import UpdateCategoryPage from "@/pages/admin/category/update-category-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import OrderDetailPage from "@/pages/admin/order/order-detail-page";
import OrdersPage from "@/pages/admin/order/orders-page";
import CreateProductPage from "@/pages/admin/product/create-product-page";
import ProductDetailPage from "@/pages/admin/product/product-detail-page";
import ProductsPage from "@/pages/admin/product/products-page";
import UpdateProductPage from "@/pages/admin/product/update-product-page";
import CreateUserPage from "@/pages/admin/user/create-user-page";
import UpdateUserPage from "@/pages/admin/user/update-user-page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersPage from "@/pages/admin/user/users-page";
import { Route, Routes } from "react-router-dom";

const MainContainter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/user/create" element={<CreateUserPage />} />
        <Route path="/user/update" element={<UpdateUserPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/product/create" element={<CreateProductPage />} />
        <Route path="/product/update" element={<UpdateProductPage />} />
        <Route path="/order" element={<OrdersPage />} />
        <Route path="/order/order:id" element={<OrderDetailPage />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/category/create" element={<CreateCategoryPage />} />
        <Route path="/category/update" element={<UpdateCategoryPage />} />
      </Routes>
    </MainLayout>
  );
};

export default MainContainter;
