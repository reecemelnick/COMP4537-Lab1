import { Note } from './note.js';
import userMessages from '../lang/messages/en/user.js';

class NoteManager {
    constructor() {
        this.allNotes = [];
        this.localArray = JSON.parse(localStorage.getItem("notes") || "[]");
        this.len = this.localArray.length;
        for(let i = 0; i < this.len; ++i) {
            this.createNewNote(this.localArray[i].text);
        }
        setInterval(this.saveNotesLocal.bind(this), 2000);
        this.makeAddButton();
    }

    postTime() {
        const d = new Date();
        document.getElementById("timestamp").innerHTML = userMessages.storedTime + d.toLocaleTimeString();
    }
    
    createNewNote(text) {
        let newId = this.allNotes.length;
        let newNote = new Note(newId, text);
        this.allNotes.push(newNote);

        newNote.displayNote();

        this.assignDeleteButton(newNote);

        this.saveNotesLocal();
    }

    assignDeleteButton(newNote) {
        let delButton = document.createElement("input");
        delButton.className = "delButton";
        delButton.type = "button";
        delButton.id = "delButton"+this.id;
        delButton.value = "Delete";

        let newBlock = document.getElementById("newBlock"+newNote.id);
        newBlock.appendChild(delButton);

        delButton.addEventListener("click", () => this.removeNote(newNote));
    }

    removeNote(note) {
        document.getElementById("newBlock"+note.id).remove();

        for(let i = 0; i < this.allNotes.length; ++i) {
            if(this.allNotes[i].id == note.id) {
                this.allNotes.splice(i, 1);
            }
        }
        this.len--;
        this.saveNotesLocal();
    }

    saveNotesLocal() {
        for(let i = 0; i < this.allNotes.length; ++i) {
            this.allNotes[i].text = document.getElementById("newNote"+this.allNotes[i].id).value;
        }
        localStorage.setItem("notes", JSON.stringify(this.allNotes));
        this.postTime();
    }

    displayNotes() {
        for(let i = 0; i < this.allNotes.length; ++i) {
            this.allNotes[i].displayNote();
        }
    }

    removeAllNotes() {
        for(let i = 0; i < this.allNotes.length; ++i) {
            this.allNotes[i].removeNote();
        }
    }

    makeAddButton() {
        let addbutton = document.getElementById("addbtn");
        addbutton.addEventListener("click", () => noteManager.createNewNote(""));   
    }
}

let noteManager = new NoteManager;

