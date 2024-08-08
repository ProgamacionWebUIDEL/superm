import firebase from '../firebase.js';
import Provedor from '../Models/provedorModel.js';
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

// Crear un proveedor
export const createProvedor = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'provedores'), data); // Cambié 'provedor' a 'provedores' para consistencia
    res.status(200).send('Proveedor creado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener todos los proveedores
export const getProvedors = async (req, res, next) => {
  try {
    const provedorsSnapshot = await getDocs(collection(db, 'provedores'));
    const provedorArray = [];

    if (provedorsSnapshot.empty) {
        res.status(400).send('No se encontraron proveedores');
    } else {
    provedorsSnapshot.forEach((doc) => {
        const provedor = new Provedor(
        doc.id,
        doc.data().nombre,
        doc.data().direccion,
        doc.data().telefono,
        doc.data().retailer,
        doc.data().amountInStock
        );
        provedorArray.push(provedor);
    });

    res.status(200).send(provedorArray);
    }
} catch (error) {
    res.status(400).send(error.message);
}
};

// Obtener un proveedor por ID
export const getProvedor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const provedorDoc = doc(db, 'provedores', id);
    const data = await getDoc(provedorDoc);

    if (data.exists()) {
        res.status(200).send(data.data());
    } else {
        res.status(404).send('Proveedor no encontrado');
    }
} catch (error) {
    res.status(400).send(error.message);
}
};

// Actualizar un proveedor
export const updateProvedor = async (req, res, next) => {  
try {
    const id = req.params.id;
    const data = req.body;
    const provedorDoc = doc(db, 'provedores', id);
    await updateDoc(provedorDoc, data);
    res.status(200).send('Proveedor actualizado exitosamente');
    } catch (error) {
    res.status(400).send(error.message);
    }
};

// Eliminar un proveedor
export const deleteProvedor = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'provedores', id));
    res.status(200).send('Proveedor eliminado exitosamente');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
