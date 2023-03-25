import React, { useMemo } from "react";
import { useTable } from "react-table";

const SettingsPanel = () => {
  const items = JSON.parse(localStorage.getItem("alarmLog"));

  const data = useMemo(() => {
    if (items == null) {
      return [];
    }
    return items;
  }, [items]);
  const columns = useMemo(
    () => [
      {
        Header: "Fault No.",
        accessor: "id",
      },
      {
        Header: "Location tripped",
        accessor: "location",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className=" flex  container items-center mx-auto w-full max-h-[450px] ">
      <table className=" text-white block  text-lg w-full ">
        <thead className=" top-0 flex  flex-col sticky w-full">
          {headerGroups.map((headerGroup) => (
            <tr
              className=" bg-gray-500 flex flex-row items-center justify-start"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className=" px-8 py-4 border-b-1 shadow-b w-[250px] border-white font-semibold tracking-wide text-left"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className="flex max-h-[200px]  lg:max-h-[400px] scrollbar bg-black/40  flex-col overflow-auto w-full"
          {...getTableBodyProps()}
        >
          {data.length <= 0 && (
            <div className=" w-full h-full text-2xl font-medium  gap-2 text-white/40 flex flex-col items-center  justify-center">
              <svg
                className="w-12 h-12 text-white/30 "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              No Alarm Data Available
            </div>
          )}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="odd:bg-black/40 hover:bg-black/5 flex flex-row items-center justify-start even:bg-black/20 "
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className="px-8 py-[10px] w-[250px] font-medium"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsPanel;
