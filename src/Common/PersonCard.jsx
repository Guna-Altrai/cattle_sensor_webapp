import React, { useState } from "react";
import { FaEdit, FaTrash, FaTabletAlt } from "react-icons/fa";

const PersonCard = ({ id, name, devices, onEdit, onDelete, onCardClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSave = () => {
    onEdit(id, newName);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-48 relative hover:shadow-lg transition-shadow duration-300">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded p-1 w-full"
          />
          <button onClick={handleSave} className="ml-2 text-green-500">
            Save
          </button>
        </div>
      ) : (
        <h2 className="text-lg font-bold">{name}</h2>
      )}
      <ul className="mt-2">
        {devices.length > 0 ? (
          <li>
            {devices[0]}
            {devices.length > 1 && `, ...(${devices.length})`}
          </li>
        ) : (
          <li>No devices selected</li>
        )}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(id);
          }}
          className="text-blue-500"
        >
          <FaTabletAlt size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="text-blue-500"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-red-500"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
