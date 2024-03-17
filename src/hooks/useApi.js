import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';

export const useApi = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const apiFetch = async (
    notification, method, route, formData, next, headersContent = 'application/json') => {
    try {
      setIsLoading(true)
      const headers = {}
      let formDataToSend = formData

      if (formData !== null) {
        if (headersContent === 'application/json') {
          headers['Content-Type'] = headersContent;
          formDataToSend = JSON.stringify(formData);
        } else {
          formDataToSend = new FormData(formData);
        }
      }

      if (localStorage.getItem('token') !== null) {
        headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      }

      const requestOptions = {
        method: method,
        headers: headers,
        body: formDataToSend
      };

      const response = await fetch(`https://sotodealcolea-back.onrender.com/${route}`, requestOptions);
      const data = await response.json();

      setIsLoading(false)

      if (!response.ok) {
        Swal.fire({
          title: "Lo sentimos!",
          text: data.error,
          icon: "error",
          confirmButtonColor: "#293a3b",
          width: 250,
          color: "#293a3b",
        });
        return;
      }

      if (response.ok) {
        if (next !== null) {
          navigate(next);
        }

        if (notification) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            confirmButtonColor: "#293a3b",
            width: 250,
            color: "#293a3b",
          });
        }
        return data;
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Lo sentimos!",
        text: "Hubo un error al realizar la solicitud.",
        icon: "error",
        confirmButtonColor: "#293a3b",
        width: 250,
        color: "#293a3b",
      });
    }
  };

  return { apiFetch, isLoading };
};