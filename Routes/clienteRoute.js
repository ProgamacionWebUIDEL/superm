import express from 'express';
import {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} from '../Controllers/clienteController.js';

const router = express.Router();

router.get('/clientes', getClientes);          // Obtener todos los clientes
router.post('/clientes/new', createCliente);   // Crear un nuevo cliente
router.get('/clientes/:id', getClienteById);   // Obtener un cliente por ID
router.put('/clientes/update/:id', updateCliente); // Actualizar un cliente
router.delete('/clientes/delete/:id', deleteCliente); // Eliminar un cliente

export default router;
