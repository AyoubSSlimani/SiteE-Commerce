import DeleteUser from "./DeleteUser";
import Logout from "./Logout";

export default function Settings() {
  return (
    <div id="settings" className="h-full w-screen flex flex-col  items-start">
      <div className="w-full p-2 border-b-2 border-gray-100">
        <DeleteUser />
      </div>
      <div className="w-full p-2 border-b-2 border-gray-100">
        <Logout />
      </div>
    </div>
  );
}
