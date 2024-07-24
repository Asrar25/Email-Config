import React from 'react';
import axiosInstance from './axiosConfig';


const DeleteTemplate = ({ id, closeModal, onAddTemplateSuccess }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.delete(`/deleteEmail/${id}`);
            console.log('Delete successful:', response.data);
            onAddTemplateSuccess();
            closeModal();
        } catch (error) {
            console.error('Failed to save content:', error);
        }
    };


    return (
        <div className="fixed top-0 left-0  h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-gray-100 p-8 rounded shadow-lg h-[390px] w-[500px]">
                <div><h1 className="mx-[150px] text-3xl w-[120px] h-[120px] font-bold text-8xl text-yellow-400 shadow-2xl text-center  bg-white rounded-full ">!</h1></div>
                <h1 className="mx-[30px] my-6 text-2xl text-center">Are You Sure,You Want to Delete this User ?</h1>
                <h2 className="mx-[90px] my-6 text-red-500 text-lg">You won't be able to revert this!</h2>
                <div className='flex gap-4 justify-center'>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className=" text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white border-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className=" text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white border-2 border-white-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTemplate;