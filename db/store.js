const fs = require("fs")
const util = require("util")
const uuidv1 = require("uuid")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((notes) => {
            let displayNotes;
            try {
                displayNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                displayNotes = []
            }
            return displayNotes
        })
    }
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("please enter title and text")
        }

        const newNote = { title, text, id: uuidv1() }
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updateNote) => this.write(updateNote))
            .then(() => newNote)
    }
    removeNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes))
    }
}
module.exports = new Store();