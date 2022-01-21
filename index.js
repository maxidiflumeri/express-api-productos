import express from 'express'
import Contenedor from './src/Contenedor.js'
import routers from './src/routes/index.js'
import path from 'path'

const app = express()
app.use(express.json())
app.use('/api', routers) 
app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const contenedor = new Contenedor('productos')

// await contenedor.deleteAll()
// await contenedor.save({nombre: 'Queso', precio: 200})
// await contenedor.save({nombre: 'Leche', precio: 100})
// await contenedor.save({nombre: 'Pan', precio: 80})
// await contenedor.save({nombre: 'Crema', precio: 120})
// await contenedor.save({nombre: 'Fideos', precio: 50})
