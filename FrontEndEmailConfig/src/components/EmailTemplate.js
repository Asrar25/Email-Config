import { useState, useEffect } from "react";
import React from "react";
import axiosInstance from "./axiosConfig";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';

const EmailTemplate = ({ id, closeModal, onAddTemplateSuccess }) => {

  const [formData, setFormData] = useState({
    email: '',
    templateId: '',
    subject: '',
    body: '',
  });

  const [newErrors, setNewErrors] = useState({});

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
      toast.error('Failed to fetch data. Please try again.');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }
    setNewErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    if (validate()) {
      toast(<div className="flex items-center text-blue-500">
        <FaSpinner className="animate-spin mr-2 text-blue-500 " />
        Sending mail...
      </div>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      }); // Notify user that email sending is in progress
      try {
        const response = await axiosInstance.post(`/sendmail`, formData);
        toast(<div className="flex items-center text-gray-400">
          <FaCheckCircle className="mr-2 text-green-500" />
          Email Sent Successfully!
        </div>, {
          autoClose: 400, hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
        });
        console.log('Mail Send Successful:', response.data);
      } catch (error) {
        console.error('Failed to send email:', error);
        toast.error('Failed to send email.Please try again!!', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } else {
      console.log(newErrors);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white px-2 rounded-lg shadow-lg h-[350px] w-[650px]">
        <div className="mt-2 flex justify-between">
          <h3 className="text-xl font-semibold">Send Test Email</h3>
          <button
            type="button"
            onClick={closeModal}
            className="text-black-500 px-2 text-lg"
          >
            X
          </button>
        </div>
        <div className="py-20 px-[100px] mt-2">
          <label className="text-md font-medium text-gray-700">Enter Mail:
            <input
              type="email"
              className="mt-3 mx-4 border-2 h-10 w-[300px] focus:border-blue-500 focus:outline-none border-gray-200 rounded-md sm:text-sm"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          {newErrors.email && <p className="text-red-500 mx-[100px] text-sm italic">{newErrors.email}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSend}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailTemplate;
