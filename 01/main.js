class User {
    constructor (name, lastName, books, pets) {
        this.name = name,
        this.lastName = lastName,
        this.books = books,
        this.pets = pets
    }

    showUser () {
        console.log(`${this.name} ${this.lastName} ${this.books} ${this.pets}`)
    }

}

const user1 = new User ("Pepe", "Argento", [{libro1: "IT"},{libro2: "The  Girl on the Train"},{libro3: "El Codigo Da Vinci"}], ["Perro", "Tortuga"] )
    console.log(user1)
    user1.showUser()