import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddTemplate = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        templateName: '',
        subject: '',
        body: '',
    });
    const [value,setvalue]=useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the submission of the form data
        console.log('Form Data:', formData);
        // Close the modal after submission
        closeModal();
    };

    return (
        <div className="fixed top-0 left-0  h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg h-[590px] w-[800px]">
                <h2 className="text-lg font-semibold mb-4">Add Email Config</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">
                            Template ID *
                        </label>
                        <input
                            type="text"
                            id="templateName"
                            name="templateName"
                            value={formData.templateName}
                            onChange={handleChange}
                            required
                            className="mt-3 border-2 h-10 w-full border-gray-200 rounded focus:border-blue-400 sm:text-sm"
                        />
                         <label htmlFor="templateName" className="block text-sm mt-2 font-medium text-gray-700">
                            Subject *
                        </label>
                        <input
                            type="text"
                            id="templateName"
                            name="templateName"
                            value={formData.templateName}
                            onChange={handleChange}
                            required
                            className="mt-3 h-10 w-full border-2 border-gray-200 rounded focus:border-blue-400 sm:text-sm"
                        />
                    
    
                    
                        <label htmlFor="body" className="block text-sm mt-2 font-medium text-gray-700">
                            Body
                        </label>
                       <ReactQuill theme="snow" value={value} onChange={setvalue} className="h-[200px] my-4 border-gray-200"/>
                    
                    </div>
                    <div className="mt-14 flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className=" text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white border-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTemplate;