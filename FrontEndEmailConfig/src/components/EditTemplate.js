import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from './axiosConfig';


const EditTemplate = ({ id, closeModal, onAddTemplateSuccess }) => {
  const [formData, setFormData] = useState({
    templateId: '',
    subject: '',
    body: '',
  });


  useEffect(() => {
    fetchAllData();
  }, []); // Fetch initial data on component mount

  const fetchAllData = async () => {
    try {
      const response = await axiosInstance.get(`/getEmail/${id}`);
      console.log('Fetch successful:', response.data);
      const { templateId, subject, body } = response.data;
      setFormData({ templateId, subject, body });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBodyChange = (value) => {
    setFormData({
      ...formData,
      body: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.templateId.trim()) {
      newErrors.templateId = 'RPT ID is required';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.body.trim() || formData.body === '<p><br></p>') {
      newErrors.body = 'Body is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axiosInstance.put(`/updateEmail/${id}`, formData);
        console.log(errors);
        console.log('Update successful:', response.data);
        onAddTemplateSuccess();
        closeModal();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data.errors);
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white px-2 rounded-lg shadow-lg h-[650px] w-[850px]">
        <div className="mt-2 flex"><h2 className="text-lg font-semibold">Add Email Config</h2></div>

        <div className=" p-2 mt-2">
          <label htmlFor="templateId" className="block text-sm font-medium text-gray-700">
            Template ID *
          </label>
          <input
            type="text"
            id="templateId"
            name="templateId"
            value={formData.templateId}
            onChange={handleChange}
            required
            className="mt-3 border-2 h-10 w-full focus:border-blue-500 focus:outline-none border-gray-200 rounded-md sm:text-sm"
          />
          {errors.templateId && (<p className="text-red-600 h-1 text-xs">{errors.templateId}</p>)}
        </div>
        <div className="  p-2 mt-2">
          <label htmlFor="subject" className="block text-sm mt-2 font-medium text-gray-700">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-3 border-2 h-10 w-full focus:border-blue-500 focus:outline-none border-gray-200 rounded-md sm:text-sm"
          />
          {errors.subject && (<p className="text-red-600 h-1 text-xs ">{errors.subject}</p>)}
        </div>
        <div className="p-2 mt-2 ">
          <label htmlFor="body" className="block text-sm mt-2 font-medium text-gray-700">
            Body
          </label>
          <ReactQuill
            theme="snow"
            name="body"
            value={formData.body}
            onChange={handleBodyChange}
            className="h-[200px] my-4 border-gray-200"
          />
          {errors.body && (<p className="text-red-600 h-1 mt-11 text-xs">{errors.body}</p>)}
        </div>

        <div className=" mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white border-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default EditTemplate;
