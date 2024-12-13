import Header from "@/components/header";
import Overview from "./overview";

const DashboardPage = () => {
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Dashboard" />
      <div className="grid grid-cols-12 gap-5 p-5">
        <Overview />
      </div>
    </div>
  );
};

export default DashboardPage;
