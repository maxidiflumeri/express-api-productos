import fs from 'fs'
export default class Contenedor {

    constructor(nombreArchivo2) {
        this.nombreArchivo = nombreArchivo2
    }

    async save(objeto) {
        let id = 0
        try {
            await fs.promises.readFile(`${this.nombreArchivo}.txt`)
            id = await this.guardarArchivo(objeto)
        } catch (error) {            
            await fs.promises.writeFile(`./${this.nombreArchivo}.txt`, '[]')
            id = await this.guardarArchivo(objeto)
        }
        return id
    }

    async guardarArchivo(objeto) {
        let id = 0
        try {
            const productosString = await fs.promises.readFile(`${this.nombreArchivo}.txt`)
            const productos = JSON.parse(productosString)
            if(productos.length==0){
                id = 1
                objeto.id = id
                productos.push(objeto)
            }else{
                id = productos[productos.length-1].id + 1
                objeto.id = id
                productos.push(objeto)
            }
            await fs.promises.writeFile(`${this.nombreArchivo}.txt`, JSON.stringify(productos))
            console.log('Updated!');
        } catch (error) {
            console.log(error)
        }

        return id
    }

    async getById(id){
        var productoRet = null
        try{
            const productosString = await fs.promises.readFile(`${this.nombreArchivo}.txt`)
            const productos = JSON.parse(productosString)
            productoRet = productos.find(producto => producto.id == id)
        }catch(error){
            console.log(error)
        }
        return productoRet==undefined? null : productoRet
    }

    async getAll(){
        var productosRet = []
        try{
            const productosString = await fs.promises.readFile(`${this.nombreArchivo}.txt`)
            productosRet = JSON.parse(productosString)            
        }catch(error){
            console.log(error)
        }
        return productosRet
    }

    async deleteAll(){        
        try{
            await fs.promises.writeFile(`./${this.nombreArchivo}.txt`, '[]')            
        }catch(error){
            console.log(error)
        }        
    }

    async deleteById(id){        
        try{
            const productosString = await fs.promises.readFile(`${this.nombreArchivo}.txt`)
            const productos = JSON.parse(productosString)
            var prodIndex = productos.findIndex(producto => producto.id == id)
            console.log(prodIndex)
            if(prodIndex !== -1){
                console.log('entre al if')
                productos.splice(prodIndex, 1)
                await fs.promises.writeFile(`${this.nombreArchivo}.txt`, JSON.stringify(productos))
            }
        }catch(error){
            console.log(error)
        }        
    }
}

// const producto = new Contenedor('productos')

// const objeto = {
//     titulo: "Queso",
//     precio: 300
// }

// console.log(await producto.save(objeto))
// console.log(await producto.save(objeto))
// console.log(await producto.save(objeto))
// console.log(await producto.save(objeto))

// console.log(await producto.getById(3))

// await producto.deleteById(3)

// console.log(await producto.getAll())

// await producto.deleteAll()
