import Header from "@/components/header";
import users from "@/data/users.json";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { User } from "@/types/user";
const UsersListingPage = () => {
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

export default UsersListingPage;
