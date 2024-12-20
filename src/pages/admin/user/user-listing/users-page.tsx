import Header from "@/components/header";
import users from "@/data/users.json";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { User } from "@/types/user";
import ToolsPanel from "./tools-panel";
const UsersListingPage = () => {
  const data = users as User[];
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UsersListingPage;
