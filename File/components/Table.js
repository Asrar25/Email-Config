import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import AddTemplate from './AddTemplate'; // Adjust the import path as per your file structure

const Table = () => {
    const columns = useMemo(
        () => [
            ...COLUMNS,
            {
                Header: 'Actions', // Header for the action column
                accessor: 'id', // Accessor should be a unique identifier for the row
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(row.original)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded-full text-sm hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded-full text-sm hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const data = useMemo(() => MOCK_DATA, []);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize: setPageSizeFromHook,
        gotoPage,
        state,
        prepareRow,
    } = useTable({ columns, data, initialState: { pageSize } }, usePagination);

    const { pageIndex } = state;

    useEffect(() => {
        setTotalRecords(data.length);
    }, [data]);

    const handlePageSizeChange = (event) => {
        const newPageSize = Number(event.target.value);
        setPageSize(newPageSize);
        setPageSizeFromHook(newPageSize); // Update page size in the table hook
    };

    const getRowRange = () => {
        const start = pageIndex * pageSize + 1;
        const end = start + page.length - 1;
        return { start, end };
    };

    const { start, end } = getRowRange();

    const handleEdit = (row) => {
        console.log('Edit', row);
        // Implement your edit logic here
    };

    const handleDelete = (id) => {
        console.log('Delete', id);
        // Implement your delete logic here
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-4">
            <div className="flex items-center">
                <h5 className="flex-grow text-xl dark:text-white">All Email Templates</h5>
                <button
                    onClick={openModal}
                    className="ml-auto bg-[#133c81] text-white py-2 px-4 rounded"
                >
                    + Add Email Template
                </button>
            </div>
            <div className="mt-4 overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className={`px-4 py-2 ${
                                            column.id === 'id'
                                                ? 'w-1/4'
                                                : column.id === 'subject'
                                                ? 'w-1/4'
                                                : column.id === 'body'
                                                ? 'w-3/5'
                                                : 'w-1/5'
                                        } text-left text-black font-bold`}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className={`dark:text-white px-4 py-2 ${
                                                cell.column.id === 'id'
                                                    ? 'w-1/4'
                                                    : cell.column.id === 'subject'
                                                    ? 'w-1/4'
                                                    : cell.column.id === 'body'
                                                    ? 'w-3/5'
                                                    : 'w-1/5'
                                            }`}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex items-center mt-4">
                    <div className="flex-grow">
                        <span>
                            Showing{' '}
                            <strong>
                                {start} to {end} of {totalRecords}
                            </strong>{' '}
                            records
                            <select
                                className="appearance-none w-16 border-2 rounded text-center ml-2"
                                value={pageSize}
                                onChange={handlePageSizeChange}
                            >
                                {[10, 20, 30, 40, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => previousPage()}
                            className="text-gray-500 hover:text-white hover:bg-blue-500 bg-gray-200 py-2 px-3 rounded-full text-sm"
                            disabled={!canPreviousPage}
                        >
                            &lt;
                        </button>
                        {pageOptions.map((pageNumber, index) => (
                            <button
                                key={pageNumber}
                                onClick={() => gotoPage(pageNumber)}
                                className={`hover:text-white hover:bg-blue-500 py-2 px-3 rounded-full text-sm ${
                                    pageIndex === pageNumber
                                        ? 'bg-blue-500 text-white'
                                        : ' bg-gray-200 text-gray-500'
                                }`}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => nextPage()}
                            className="text-gray-500 hover:text-white hover:bg-blue-500 bg-gray-200 py-2 px-3 rounded-full text-sm"
                            disabled={!canNextPage}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal for adding new template */}
            {isModalOpen && <AddTemplate closeModal={closeModal} />}
        </div>
    );
};

export default Table;
