import { db } from '../firebase.js';  // Asegúrate de que la ruta sea correcta
import Cliente from '../Models/clienteModel.js';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// Crear un cliente
export const createCliente = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'clientes'), data);
    res.status(200).send('Cliente creado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener todos los clientes
export const getClientes = async (req, res, next) => {
  try {
    const clientes = await getDocs(collection(db, 'clientes'));
    const clienteArray = [];

    if (clientes.empty) {
      res.status(400).send('No se encontraron clientes');
    } else {
      clientes.forEach((doc) => {
        const cliente = new Cliente(
          doc.id,
          doc.data().name,
          doc.data().apellido,
          doc.data().mail,
          doc.data().telefono,
          doc.data().direccion
        );
        clienteArray.push(cliente);
      });

      res.status(200).send(clienteArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener un cliente por ID
export const getClienteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const clienteDoc = doc(db, 'clientes', id);
    const data = await getDoc(clienteDoc);

    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Cliente no encontrado');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Actualizar un cliente
export const updateCliente = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const clienteDoc = doc(db, 'clientes', id);
    await updateDoc(clienteDoc, data);
    res.status(200).send('Cliente actualizado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Eliminar un cliente
export const deleteCliente = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'clientes', id));
    res.status(200).send('Cliente eliminado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
