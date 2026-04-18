import UserSidebar from "../../components/UserSidebar";
import "../../styles/admin.css";

const UserLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <UserSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
};

export default UserLayout;
