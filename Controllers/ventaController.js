import firebase from '../firebase.js';
import Venta from '../Models/ventaModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// Crear una venta
export const createVenta = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'ventas'), data); // Cambié 'venta' a 'ventas' para mantener consistencia
    res.status(200).send('Venta creada exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener todas las ventas
export const getVentas = async (req, res, next) => {
  try {
    const ventasSnapshot = await getDocs(collection(db, 'ventas'));
    const ventaArray = [];

    if (ventasSnapshot.empty) {
      res.status(400).send('No se encontraron ventas');
    } else {
      ventasSnapshot.forEach((doc) => {
        const venta = new Venta(
          doc.id,
          doc.data().nombre,
          doc.data().direccion,
          doc.data().producto,
          doc.data().cantidad,
          doc.data().precioTotal
        );
        ventaArray.push(venta);
      });

      res.status(200).send(ventaArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener una venta por ID
export const getVenta = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ventaDoc = doc(db, 'ventas', id);
    const data = await getDoc(ventaDoc);

    if (data.exists()) {
    res.status(200).send(data.data());
    } else {
    res.status(404).send('Venta no encontrada');
    }
} catch (error) {
    res.status(400).send(error.message);
}
};

// Actualizar una venta
export const updateVenta = async (req, res, next) => {
    try {
    const id = req.params.id;
    const data = req.body;
    const ventaDoc = doc(db, 'ventas', id);
    await updateDoc(ventaDoc, data);
    res.status(200).send('Venta actualizada exitosamente');
} catch (error) {
    res.status(400).send(error.message);
}
};

// Eliminar una venta
export const deleteVenta = async (req, res, next) => {
try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'ventas', id));
    res.status(200).send('Venta eliminada exitosamente');
} catch (error) {
    res.status(400).send(error.message);
}
};
