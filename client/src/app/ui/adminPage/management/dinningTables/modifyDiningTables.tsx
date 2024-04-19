"use client";
import { useState } from "react";
import { DiningTable } from "@/app/types/types";

interface ModifyDiningTablesProps {
  diningTables: DiningTable[];
}

const ModifyDiningTables: React.FC<ModifyDiningTablesProps> = ({
  diningTables,
}) => {
  const [newTableName, setNewTableName] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState(0);
  const [newTablePositionX, setNewTablePositionX] = useState(0);
  const [newTablePositionY, setNewTablePositionY] = useState(0);

  const handleSave = () => {
    console.log("Dining tables saved to database.");
    setNewTableName("");
    setNewTableCapacity(0);
    setNewTablePositionX(0);
    setNewTablePositionY(0);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleted dining table with id ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Editing dining table with id ${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Modify Dining Tables</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Existing Dining Tables</h3>
        <ul className="list-disc pl-5">
          {diningTables.map((table) => (
            <li key={table.id} className="flex items-center justify-between">
              <span>
                {table.name} - Status: {table.status} - Capacity:{" "}
                {table.capacity}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEdit(table.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(table.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Table Name:
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Capacity:
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={newTableCapacity}
            onChange={(e) => setNewTableCapacity(parseInt(e.target.value))}
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Position X:
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={newTablePositionX}
            onChange={(e) => setNewTablePositionX(parseInt(e.target.value))}
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Position Y:
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={newTablePositionY}
            onChange={(e) => setNewTablePositionY(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        Add Dining Table
      </button>
      <button
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        Save Dining Tables
      </button>
    </div>
  );
};

export default ModifyDiningTables;
