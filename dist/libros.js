"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
class Libro {
    constructor(nombre, autor, paginas, isbn) {
        this.nombre = nombre;
        this.autor = autor;
        this.paginas = paginas,
            this.isbn = isbn;
    }
}
class GestorLibros {
    constructor(libros) {
        this.libros = libros;
    }
    insertar(libro) {
        this.libros.push(libro);
        return this.libros;
    }
    consultar() {
        return this.libros;
    }
    consultarLibroId(isbn) {
        return this.libros.find((libro) => libro.isbn === isbn);
    }
    consultarLibrosDesdeArchivo(libros) {
        console.log("Libros desde archivo", libros.split('|'));
    }
    modificar(libro) {
        const indexLibro = this.libros.findIndex(libro => (libro.isbn === libro.isbn));
        this.libros[indexLibro] = libro;
    }
    eliminar(isbn) {
        return this.libros.filter(libro => libro.isbn !== isbn);
    }
}
let libros = [];
const cantidadLibros = readline_sync_1.default.question("Ingresela cantidad de libros a ingresar: ");
for (let i = 0; i < parseInt(cantidadLibros); i++) {
    let nombre = readline_sync_1.default.question("Ingrese el nombre del libro: ");
    let autor = readline_sync_1.default.question("Ingrese el autor del libro: ");
    let paginas = readline_sync_1.default.question("Ingrese el numero de paginas: ");
    let isbn = readline_sync_1.default.question("Ingrese el isbn del libro: ");
    libros.push({ nombre, autor, paginas: parseInt(paginas), isbn: parseInt(isbn) });
}
const gestorDeLibros = new GestorLibros(libros);
//leer libros
console.log("Listado de libros ", gestorDeLibros.consultar());
//consultar libro id
console.log("Libro por id: ", gestorDeLibros.consultarLibroId(libros[0].isbn));
//Modificar Libro
gestorDeLibros.modificar(new Libro('MARKETING 4.0', 'KOTLER, PHILLIP', 192, 9789874467249));
//Inserta Nuevo Libro
console.log("Insertar Libro: ", gestorDeLibros.insertar(new Libro('LA MILLA VERDE', 'KING, STEPHEN', 448, 9789877254631)));
//Eliminar Libro
console.log("Eliminar Libro - Libros Actuales ", gestorDeLibros.eliminar(libros[0].isbn));
//archivo de texto con libros
let librosDesdeArchivo = fs.readFileSync(path_1.default.join(__dirname, 'libros.txt'), 'utf-8');
gestorDeLibros.consultarLibrosDesdeArchivo(librosDesdeArchivo);
//# sourceMappingURL=libros.js.map