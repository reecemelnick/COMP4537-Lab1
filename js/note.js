export class Note {
    constructor(noteCount, text) {
        this.text = text;
        this.id = noteCount;
    }

    displayNote() {
        let notes = document.getElementById("notes");
        let newNote = document.createElement("div");
        newNote.id = "newBlock"+this.id;
        notes.appendChild(newNote);
        let newText = document.createElement("textarea");
        newText.value = this.text;
        newText.id = "newNote"+this.id;
        newText.className = "newNote";
        newNote.appendChild(newText);
    }
}