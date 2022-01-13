import {Router} from "express";
import Contenedor from "../Contenedor.js";

const router = Router()
const contenedor = new Contenedor('productos')

router.get('/obtenerTodos', async (req, res, next) => {
    try {
        const productos = await contenedor.getAll()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({
                mensaje: 'Ocurrio un error.', error: `${
                error.message
            }`
        })
        next(error)
    }
})

router.get('/obtenerProductoRandom', async (req, res, next) => {
    try {
        const productos = await contenedor.getAll()
        const random = Math.floor(Math.random() * (productos.length - 0)) + 0;        
        res.status(200).json(productos[random])
    } catch (error) {
        res.status(500).json({
                mensaje: 'Ocurrio un error.', error: `${
                error.message
            }`
        })
        next(error)
    }
})

export default router
