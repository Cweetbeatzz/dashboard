"use client";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function UserTable({ users, roles, onEdit, onDelete }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(userToDelete);
    setIsConfirmModalOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const renderUsersTable = () => (
    <>
      <div className="flex mb-4 bg-white p-2 rounded">
        {/* Search Bar */}
        <div className="ml-2">
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="bg-gray-100 rounded py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => alert("Filter button clicked")}
            className="ml-2 px-4 py-2 bg-gray-100 text-black border border-gray-400 rounded"
          >
            Filter
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 border-b">Select</th>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Role</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <span className="text-green-700 bg-green-100 rounded px-2 py-1">
                  {user.selectedRole}
                </span>
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(user)}
                  className="mr-2 text-blue-400 font-bold px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="text-gray-400 font-bold px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderRolesTable = () => (
    <>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search roles"
          className="mr-2 px-3 py-2 border rounded"
        />
        <button
          onClick={() => alert("Filter button clicked")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2  border-b">Select</th>
            <th className="py-2  brder-b">Role Name</th>
            <th className="py-2  border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border-b">{role.name}</td>
              {/* <td className="py-2 px-4 border-b">{role.description}</td> */}
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(role)}
                  className="mr-2 text-blue-400 font-bold px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(role.id)}
                  className="text-gray-400 font-bold px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <div>
        <ul className="flex border-b">
          <li
            className={`cursor-pointer py-2 px-4 ${
              activeTab === "users"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
          <li
            className={`cursor-pointer py-2 px-4 ${
              activeTab === "roles"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("roles")}
          >
            Roles
          </li>
        </ul>
        <div className="mt-4">
          {activeTab === "users" ? renderUsersTable() : renderRolesTable()}
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Delete this User"
      />
    </>
  );
}
