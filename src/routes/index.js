import axios from "axios";
import { Router } from "express";

const router = Router();

// Rutas para el inicio de sesion y el registro con email y password
router.post("/login");
router.post("/register");
router.post("/logout");
router.post("/protected");

// Rutas para traer los servicios, crearlos, modificarlos y eliminarlos
router.get("/services");
router.post("/services");
router.put("/services/:id");
router.delete("/services/:id");

// Rutas para traer clientes registrados
router.get("/users");
router.delete("/users/:id");

// Rutas para traer turnos
router.get("/appointments"); // admin
router.post("/appointments"); // cliente
router.put("/appointments/:id"); // confirmar / cancelar

// Rutas para disponibilidad de turnos
router.get("/availability");
router.post("/availability");
router.delete("/availability/:id");

export default router;
