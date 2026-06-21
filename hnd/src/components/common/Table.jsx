import React from "react";

const Table = ({
  columns = [],
  data = [],
  className = "",
  onRowClick,
  ...props
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full" {...props}>
        <thead className="bg-gray-50 dark:bg-dark-100 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.className || ""}`}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 text-sm text-gray-900 dark:text-white ${col.cellClassName || ""}`}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
};

export default Table;
