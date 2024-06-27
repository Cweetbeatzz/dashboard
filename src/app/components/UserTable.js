"use client";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function UserTable({ users, onEdit, onDelete }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(userToDelete);
    setIsConfirmModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <p>Settings / Users & Roles Settings</p>

      <h3>Users & Roles</h3>
      <p>Manage all users in your business</p>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {/* <th className="py-2 px-4 border-b">ID</th> */}
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* <td className="py-2 px-4 border-b">{user.id}</td> */}
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.selectedRole}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(user)}
                  className="mr-2 text-blue-400 font-bold px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="text-gray-400 font-bold  px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Delete this User"
      />
    </>
  );
}
