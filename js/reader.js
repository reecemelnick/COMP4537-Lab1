import { Note } from './note.js';
import userMessages from '../lang/messages/en/user.js';

class NoteViewer {
    constructor() {
        this.allNotes = [];
        this.getNotesFromLocal();
        setInterval(this.getNotesFromLocal.bind(this), 2000);
    }

    // clears notes section. Retrieves updated notes from local storage
    getNotesFromLocal() {
        document.getElementById("notes").innerHTML = "";
        let notes = JSON.parse(localStorage.getItem("notes") || "[]");
        this.generateNotes(notes);
    }

    // for each note in local storage a new note is made. Notes are displayed.
    generateNotes(notes) {
        for(let i = 0; i < notes.length; ++i) {
            let newNote = new Note(i);
            this.allNotes.push(newNote);

            newNote.text = notes[i].text;
            newNote.id = notes[i].id;

            newNote.displayNote();

            document.getElementById("newNote"+newNote.id).readOnly = true;

            this.postTime();
        }
    }

    // date object is made and put into timestamp div
    postTime() {
        const d = new Date();
        document.getElementById("timestamp").innerHTML =  userMessages.updateTime + d.toLocaleTimeString();
    }
}


let noteViewer = new NoteViewer;