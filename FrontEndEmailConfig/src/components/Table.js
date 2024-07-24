import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { PencilIcon, TrashIcon, ShareIcon } from '@heroicons/react/16/solid';
import AddTemplate from './AddTemplate';
import EditTemplate from './EditTemplate';
import DeleteTemplate from './DeleteTemplate';
import EmailTemplate from './EmailTemplate';
import { COLUMNS } from './columns'; // Assuming you have COLUMNS defined
import axiosInstance from './axiosConfig';

const Table = () => {
    const [allData, setAllData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [selectEditRow, setSelectEditRow] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectDeleteRow, setSelectDeleteRow] = useState(null);
    const [selectEmailRow, setSelectEmailRow] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []); // Fetch initial data on component mount

    const fetchAllData = async () => {
        try {
            const response = await axiosInstance.get('/listdata');
            setAllData(response.data);
            setTotalRecords(response.data.length);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const columns = useMemo(
        () => [
            ...COLUMNS, // Use your existing columns from COLUMNS array
            {
                Header: 'Actions',
                accessor: 'id', // Assuming 'id' is a unique identifier for rows
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(row.original.id)}
                            className="text-blue-900 py-1 px-3 rounded-full text-sm"
                        >
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-500 py-1 px-3 rounded-full text-sm"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                        <a
                            onClick={() => handleEmail(row.original.id)} className="text-blue-900 py-1 px-3 rounded-full text-sm"
                        ><ShareIcon className="h-5 w-5" />
                        </a>
                    </div>
                ),
            },
        ],
        []
    );

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
    } = useTable({ columns, data: allData, initialState: { pageSize } }, usePagination);

    const { pageIndex } = state;

    useEffect(() => {
        setTotalRecords(allData.length); // Update total records when data changes
    }, [allData]);

    const handlePageSizeChange = (event) => {
        const newPageSize = Number(event.target.value);
        setPageSize(newPageSize);
        setPageSizeFromHook(newPageSize); // Update page size in the table hook
    };

    const handleEdit = (id) => {
        setSelectEditRow(id);
        setEditModal(true);

        // Implement your edit logic here
    };

    const handleDelete = (id) => {
        setSelectDeleteRow(id);
        setDeleteModal(true);

        // Implement your delete logic here
    };


    const handleEmail = (id) => {
        setSelectEmailRow(id);
        setEmailModal(true);

        // Implement your delete logic here
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleAddTemplateSuccess = async () => {
        setIsModalOpen(false); // Close the modal
        await fetchAllData(); // Fetch updated data
    };

    const getRowRange = () => {
        const start = pageIndex * pageSize + 1;
        const end = start + page.length - 1;
        return { start, end };
    };
    const { start, end } = getRowRange();

    return (
        <div className="p-4">
            <div className="flex items-center">
                <h5 className="flex-grow text-xl dark:text-white">All Email Templates</h5>
                <button
                    onClick={openModal}
                    className="ml-auto bg-[#133c81] text-white py-2 px-4 rounded-lg"
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
                                        className={`px-4 py-2 ${column.id === 'id'
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
                                            className={`dark:text-white px-4 py-2 ${cell.column.id === 'id'
                                                ? 'w-1/4'
                                                : cell.column.id === 'subject'
                                                    ? 'w-1/4'
                                                    : cell.column.id === 'body'
                                                        ? 'w-3/5'
                                                        : 'w-1/5'
                                                }`}
                                        >
                                            {cell.column.id === 'body' ? (
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: cell.value }}
                                                />
                                            ) : (
                                                cell.render('Cell')
                                            )}
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
                            Showing{' '}{start} to {end} of {totalRecords}{' '}records
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
                                className={`hover:text-white hover:bg-blue-500 py-2 px-3 rounded-full text-sm ${pageIndex === pageNumber
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
            {isModalOpen && <AddTemplate closeModal={() => setIsModalOpen(false)} onAddTemplateSuccess={handleAddTemplateSuccess} />}
            {editModal && <EditTemplate id={selectEditRow} closeModal={() => setEditModal(false)} onAddTemplateSuccess={handleAddTemplateSuccess} />}
            {deleteModal && <DeleteTemplate id={selectDeleteRow} closeModal={() => setDeleteModal(false)} onAddTemplateSuccess={handleAddTemplateSuccess} />}
            {emailModal && <EmailTemplate id={selectEmailRow} closeModal={() => setEmailModal(false)} onAddTemplateSuccess={handleAddTemplateSuccess} />}
        </div>
    );
};

export default Table;
