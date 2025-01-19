import { Note } from './note.js';
import userMessages from '../lang/messages/en/user.js';

class NoteManager {
    // contructor initializes empty array, initalized current highest id, retrieves
    // data from local storage, creates notes based on local storage.
    constructor() {
        this.allNotes = [];
        this.highestId = 0;
        this.localArray = JSON.parse(localStorage.getItem("notes") || "[]");
        this.len = this.localArray.length;
        for(let i = 0; i < this.len; ++i) {
            this.createNewNote(this.localArray[i].text);
        }
        setInterval(this.saveNotesLocal.bind(this), 2000);
        this.makeAddButton();
    }

    // creates a date object and populates the timestamp dom object
    postTime() {
        const d = new Date();
        document.getElementById("timestamp").innerHTML = userMessages.storedTime + d.toLocaleTimeString();
    }

    // increases the highest usable id. Creates a note object and pushes it to array of note objects.
    // displays note, assigns delete button, and saves new note to local storage
    createNewNote(text) {
        let newId = this.highestId++;
        let newNote = new Note(newId, text);
        this.allNotes.push(newNote);

        newNote.displayNote();

        this.assignDeleteButton(newNote);

        this.saveNotesLocal();
    }

    // creates a delete button dom object. Appends the button to the appropriate note.
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

    // removes the note from the gui, then removes the note object from array
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

    // fills the appropriate notes with text. Saves array to local storage. Posts time. 
    saveNotesLocal() {
        for(let i = 0; i < this.allNotes.length; ++i) {
            this.allNotes[i].text = document.getElementById("newNote"+this.allNotes[i].id).value;
        }
        localStorage.setItem("notes", JSON.stringify(this.allNotes));
        this.postTime();
    }

    // creates add button that makes new note.
    makeAddButton() {
        let addbutton = document.getElementById("addbtn");
        addbutton.addEventListener("click", () => noteManager.createNewNote(""));   
    }
}

let noteManager = new NoteManager;

