import Header from "@/components/header";
import { DataTable } from "./data-table";
import users from "@/data/users.json";
import { User } from "@/types/user";
import { columns } from "./columns";
const UsersPage = () => {
  const data = users as User[];
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Danh sách tài khoản" />
      <div className="p-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UsersPage;
