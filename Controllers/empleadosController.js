import { db } from '../firebase.js';  // Asegúrate de que la ruta sea correcta
import Empleado from '../Models/empleadoModel.js';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// Crear un empleado
export const createEmpleado = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'empleados'), data);
    res.status(200).send('Empleado creado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener todos los empleados
export const getEmpleados = async (req, res, next) => {
  try {
    const empleadosSnapshot = await getDocs(collection(db, 'empleados'));
    const empleadoArray = [];

    if (empleadosSnapshot.empty) {
      res.status(400).send('No se encontraron empleados');
    } else {
      empleadosSnapshot.forEach((doc) => {
        const empleado = new Empleado(
          doc.id,
          doc.data().name,
          doc.data().puesto,
          doc.data().direccion,
          doc.data().telefono
        );
        empleadoArray.push(empleado);
      });

      res.status(200).send(empleadoArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener un empleado por ID
export const getEmpleado = async (req, res, next) => {
  try {
    const id = req.params.id;
    const empleadoDoc = doc(db, 'empleados', id);
    const data = await getDoc(empleadoDoc);

    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Empleado no encontrado');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Actualizar un empleado
export const updateEmpleado = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const empleadoDoc = doc(db, 'empleados', id);
    await updateDoc(empleadoDoc, data);
    res.status(200).send('Empleado actualizado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'empleados', id));
    res.status(200).send('Empleado eliminado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
