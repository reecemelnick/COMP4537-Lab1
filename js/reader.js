import { Note } from './note.js';
import userMessages from '../lang/messages/en/user.js';

class NoteViewer {
    constructor() {
        this.allNotes = [];
        this.getNotesFromLocal();
        setInterval(this.getNotesFromLocal.bind(this), 2000);
    }

    getNotesFromLocal() {
        document.getElementById("notes").innerHTML = "";
        let notes = JSON.parse(localStorage.getItem("notes") || "[]");
        this.generateNotes(notes);
    }

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

    postTime() {
        const d = new Date();
        document.getElementById("timestamp").innerHTML =  userMessages.updateTime + d.toLocaleTimeString();
    }
}


let noteViewer = new NoteViewer;