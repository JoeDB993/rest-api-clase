import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { FormData } from "../interfaces/FormData";
import type { UserApi } from "../interfaces/UserApi";

const API_URL = "https://api.escuelajs.co/api/v1/users";

/**
 * Hook personalizado para gestionar usuarios.
 *
 * Proporciona estado y funciones para obtener, crear y editar usuarios
 * desde la API de Escuela JS, junto con alertas de éxito y error.
 *

 *
 * @example
 * const { users, loading, formData, setFormData } = useUser();
 *
 * if (loading) return <p>Cargando...</p>;
 * return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
 */
const useUser = () => {
  /** Lista de usuarios obtenidos desde la API */
  const [users, setUsers] = useState<UserApi[]>([]);

  /** Usuario seleccionado para edición, null si no hay ninguno */
  const [userToEdit, setUserToEdit] = useState<UserApi | null>(null);

  /** Indica si hay una petición HTTP en curso */
  const [loading, setLoading] = useState<boolean>(false);

  /** Estado del formulario para crear o editar un usuario */
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    avatar: "https://placehold.co/600x400/004AAD/FFF?text=user+avatar",
    password: "",
  });

  /**
   * Obtiene la lista completa de usuarios desde la API.
   * Actualiza el estado `users` y maneja errores con una alerta.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<UserApi[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      errorAlert("No se pudo cargar los usuarios. Por favor, intente de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  
  /**
   * Muestra una alerta de éxito usando SweetAlert2.
   *
   * @param {string} message - Mensaje a mostrar en la alerta.
   */
  const successAlert = (message: string): void => {
    Swal.fire({
      icon: "success",
      title: message,
    });
  };

  /**
   * Muestra una alerta de error usando SweetAlert2.
   *
   * @param {string} message - Mensaje a mostrar en la alerta.
   */
  const errorAlert = (message: string): void => {
    Swal.fire({
      icon: "error",
      title: message,
    });
  };
  /** Carga los usuarios al montar el componente */
  useEffect(() => {
    fetchUsers();
  }, []);


};

export default useUser;
