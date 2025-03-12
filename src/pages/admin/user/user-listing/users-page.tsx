import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ToolsPanel from "./tools-panel";
import useAccountStore from "@/stores/use-account-store";
import { useEffect } from "react";
import Loader from "@/components/loader";
const UsersListingPage = () => {
  const accountStore = useAccountStore();
  useEffect(() => {
    accountStore.fetchAccounts();
  }, []);

  if (accountStore.loading) return <Loader />;
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={accountStore.accounts} />
      </div>
    </div>
  );
};

export default UsersListingPage;
