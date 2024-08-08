import express from 'express';
import {
createVenta,
getVentas,
getVenta,
updateVenta,
deleteVenta,
} from '../Controllers/ventaController.js';

const router = express.Router();

router.get('/ventas', getVentas);          // Obtener todas las ventas
router.post('/ventas/new', createVenta);   // Crear una nueva venta
router.get('/ventas/:id', getVenta);       // Obtener una venta por ID
router.put('/ventas/update/:id', updateVenta); // Actualizar una venta
router.delete('/ventas/delete/:id', deleteVenta); // Eliminar una venta

export default router;
