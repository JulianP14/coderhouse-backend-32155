class User {
    constructor (name, lastName, [], []) {  // (2)
        this.name = name,
        this.lastName = lastName,
        this.books = [],
        this.pets = []
    }

    getFullName () {
        return console.log(`Mi nombre es: ${this.name + " " + this.lastName}`)
    }
    
    addMascota () { // (1): 
        this.pets.push(mascota2, mascota1, mascota3); 
        return this.pets;
    }
        countMascotas() {
            return console.log(`Hay un total de: ${this.pets.length} mascotas en el []`)
        }
    
    addBook (bookData) {
        return this.books.push(bookData)
    }

    getBookNames () {
        const bookNames = []
        let book1 = bookData[0].name;
        let book2 = bookData[1].name;
        bookNames.push(book1, book2)
        return console.log(`Los libros son: ${bookNames}`);
    }
}

const user1 = new User ("Pepe", "Argento", [], [] ); //(3)

// (1): 
let mascota1 = "Perro";
let mascota2 = "Gato";
let mascota3 = "Tortuga";

const bookData = [
    {
        name: "The Girl on the Train",
        autor: "Paula Hawkins"
    },
    {
        name: "IT",
        autor: "Stephen King"
    }
]

user1.getFullName();
user1.addMascota();
user1.countMascotas();
user1.addBook(bookData);
user1.getBookNames();

console.log(user1)