// export default function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const handleCreateUser = () => {
//     setCurrentUser(null);
//     setIsModalOpen(true);
//   };

//   const handleEditUser = (user) => {
//     setCurrentUser(user);
//     setIsModalOpen(true);
//   };

//   const handleDeleteUser = (userId) => {
//     setUsers(users.filter((user) => user.id !== userId));
//   };

//   const handleSaveUser = (user) => {
//     if (user.id) {
//       setUsers(users.map((u) => (u.id === user.id ? user : u)));
//     } else {
//       setUsers([...users, { ...user, id: Date.now() }]);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
//           <div className="container mx-auto px-6 py-8">
//             <button
//               onClick={handleCreateUser}
//               className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Create User
//             </button>
//             <UserTable
//               users={users}
//               onEdit={handleEditUser}
//               onDelete={handleDeleteUser}
//             />
//           </div>
//         </main>
//       </div>
//       {isModalOpen && (
//         <UserModal
//           user={currentUser}
//           onSave={handleSaveUser}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

const API_URL = "https://caf1743a0f1f7ea7ef88.free.beeceptor.com/api/users/";

export default function Dashboard() {
  const [roles, setRoles] = useState([
    { id: "Admin", name: "Admin" },
    { id: "Manager", name: "Manager" },
    { id: "Editor", name: "Editor" },
    { id: "Viewer", name: "Viewer" },
    { id: "Guest", name: "Guest" },
  ]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user. Please try again later.");
      console.error("Error deleting user:", err);
    }
  };

  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        // Update existing user
        const response = await axios.put(`${API_URL}/${user.id}`, user);
        setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
      } else {
        // Create new user
        const response = await axios.post(API_URL, user);
        setUsers([...users, response.data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to save user. Please try again later.");
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <p class="text-gray-500 text-sm mb-6">
              Settings / Users & Roles Settings
            </p>

            <h3 class="text-black font-bold">Users & Roles</h3>
            <p class="text-gray-500 text-sm mb-7">
              Manage all users in your business
            </p>

            <button
              onClick={handleCreateUser}
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded float-right"
            >
              New User
            </button>
            {isLoading ? (
              <p>Loading users...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <UserTable
                users={users}
                roles={roles}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            )}
          </div>
        </main>
      </div>
      {isModalOpen && (
        <UserModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
