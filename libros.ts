import * as fs from 'fs'
import path from 'path'
import readlineSync from 'readline-sync'

class Libro {
    //propiedades
    nombre: string
    autor: string
    paginas: number
    isbn: number

    constructor(nombre:string, autor: string, paginas: number, isbn: number){
        this.nombre = nombre
        this.autor = autor
        this.paginas = paginas,
        this.isbn = isbn
    }

}

class GestorLibros{
    libros : Libro[]

    constructor(libros: any[]){
        this.libros = libros
    }
    insertar(libro: Libro): Libro[]{
        this.libros.push(libro)
        return this.libros
    }

    consultar(): Libro[]{
        return this.libros

    }

    consultarLibroId(isbn: number) : Libro | undefined{
        return this.libros.find((libro) => libro.isbn === isbn) 
    } 

    consultarLibrosDesdeArchivo(libros:string): void {
        console.log("Libros desde archivo", libros.split('|'))
    }

    modificar(libro: Libro) : void {
        const indexLibro = this.libros.findIndex(libro => (libro.isbn === libro.isbn))
        this.libros[indexLibro] = libro
    }
    eliminar(isbn: number) : Libro[]{
        return this.libros.filter(libro => libro.isbn !== isbn)

    }
}


let libros: Libro[] = [];
const cantidadLibros = readlineSync.question("Ingresela cantidad de libros a ingresar: ");
for(let i=0; i<parseInt(cantidadLibros); i++){
    let nombre = readlineSync.question("Ingrese el nombre del libro: ");
    let autor = readlineSync.question("Ingrese el autor del libro: ");
    let paginas = readlineSync.question("Ingrese el numero de paginas: ");
    let isbn = readlineSync.question("Ingrese el isbn del libro: ");

    libros.push({nombre, autor, paginas: parseInt(paginas) ,isbn : parseInt(isbn)})
}


const gestorDeLibros = new GestorLibros(libros)


//leer libros
console.log("Listado de libros ", gestorDeLibros.consultar())

//consultar libro id
console.log("Libro por id: " , gestorDeLibros.consultarLibroId(libros[0].isbn))
//Modificar Libro
gestorDeLibros.modificar(new Libro('MARKETING 4.0', 'KOTLER, PHILLIP', 192, 9789874467249 ))

//Inserta Nuevo Libro
console.log("Insertar Libro: " , gestorDeLibros.insertar(new Libro('LA MILLA VERDE', 'KING, STEPHEN', 448, 9789877254631 )))

//Eliminar Libro
console.log("Eliminar Libro - Libros Actuales " , gestorDeLibros.eliminar(libros[0].isbn))

//archivo de texto con libros
let librosDesdeArchivo: string = fs.readFileSync(path.join(__dirname, 'libros.txt'), 'utf-8')
gestorDeLibros.consultarLibrosDesdeArchivo(librosDesdeArchivo)