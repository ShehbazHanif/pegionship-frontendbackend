import React, { useState } from "react";
import { Clock5, Edit2, Trash2, ArrowUp } from "lucide-react";
import { Checkbox } from "@mui/material";

const GenericTable = ({ columns, data, actions = true, onEdit, onDelete }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map((_, idx) => idx)));
      setSelectAll(true);
    } else {
      setSelectedRows(new Set());
      setSelectAll(false);
    }
  };

  const handleSelectRow = (rowIndex) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === data.length);
  };

  return (
    <div className="w-full overflow-x-auto bg-white border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-4 py-4 w-10">
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                sx={{
                  color: "#D1D5DB",
                  "&.Mui-checked": {
                    color: "#FBBF24",
                  },
                }}
              />
            </th>

            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-4 text-[#717386] font-['Open_Sans'] text-[16px] font-normal leading-[16px]">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  {col.header}
                  <div className="flex flex-col gap-0.5 opacity-60">
                    <ArrowUp size={20} strokeWidth={3} className="-mb-0.5" />
                  </div>
                </div>
              </th>
            ))}

            {actions && (
              <th className="px-6 py-4 text-sm font-medium text-gray-500 tracking-tight">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-4">
                <Checkbox
                  checked={selectedRows.has(rowIndex)}
                  onChange={() => handleSelectRow(rowIndex)}
                  sx={{
                    color: "#D1D5DB",
                    "&.Mui-checked": {
                      color: "#FBBF24",
                    },
                  }}
                />
              </td>

              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-[14px] text-gray-500 font-normal">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}

              {actions && (
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-gray-600 transition-colors">
                      <Clock5 size={18} />
                    </button>
                    <button
                      onClick={() => onEdit && onEdit(row)}
                      className="hover:text-blue-500 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(row)}
                      className="hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
