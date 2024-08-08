import express from 'express';
import {
  createEmpleado,
  getEmpleados,
  getEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from '../Controllers/empleadoController.js';

const router = express.Router();

router.get('/empleados', getEmpleados);          // Obtener todos los empleados
router.post('/empleados/new', createEmpleado);   // Crear un nuevo empleado
router.get('/empleados/:id', getEmpleado);       // Obtener un empleado por ID
router.put('/empleados/update/:id', updateEmpleado); // Actualizar un empleado
router.delete('/empleados/delete/:id', deleteEmpleado); // Eliminar un empleado

export default router;
