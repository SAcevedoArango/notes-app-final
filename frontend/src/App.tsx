import {useState, useEffect, useMemo} from "react";
import "./App.css"

type Note = { 
  id: number;
  title: string;
  content: string;
  isArchived: boolean
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [allNotes, setAllNotes] = useState<Note[]>([]);
const [showArchived, setShowArchived] = useState(false);
const [selectedNote, setSelectedNote] = useState<Note | null>(null);

const toggleShowArchived = () => {
  setShowArchived(!showArchived);
};

const fetchNotes = async () => {
  try {
    // Fetch all notes
    const response = await fetch("http://localhost:5000/api/notes");
    const notes: Note[] = await response.json();
    setAllNotes(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

  useEffect(() => {
    fetchNotes();
  }, [allNotes, showArchived]);

  const filteredNotes = useMemo(() => {
    return allNotes.filter((note) => showArchived === note.isArchived);
  }, [allNotes, showArchived]);


const handleArchiveClick = async (note: Note) => {
  try {
    const newIsArchived = !note.isArchived;

    const response = await fetch(
      `http://localhost:5000/api/notes/${note.id}/archive`,
      {
        method: "PATCH",
        body: JSON.stringify({ isArchived: newIsArchived }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setSelectedNote(null);
    setTitle("");
    setContent("");
    
    if (!response.ok) {
      throw new Error("Failed to update note's archive status.");
    }

    setAllNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === note.id ? { ...n, isArchived: newIsArchived } : n
      )
    );
  } catch (error) {
    console.error("Error archiving/unarchiving note:", error);
  }
  fetchNotes();
};


const handleNoteClick = (noteId: number) => {
  const selected = allNotes.find((note) => note.id === noteId);
  setSelectedNote(selected || null);
  if (selected) { 
    setTitle(selected.title);
    setContent(selected.content);
  } else {
    setTitle(""); 
    setContent("");
  }
};


const handleAddNote = async (
  event: React.FormEvent
) => {
  event.preventDefault(); 

  try {
    const response = await fetch(
      "http://localhost:5000/api/notes",
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      }
    );

    const newNote = await response.json();

    setNotes([newNote, ...notes]); 
    setTitle("");
    setContent("");
  } catch (error) {
      console.log(error);
  }


};

const handleUpdateNote = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  if (!selectedNote) {
    return;
  } 

  try {
    const response = await fetch(
      `http://localhost:5000/api/notes/${selectedNote.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content,
      })
    }
  )
    const updatedNote = await response.json();

    const updatedNotesList = notes.map((note) => 
      note.id === selectedNote.id
        ? updatedNote
        : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);

  } catch (error) {
      console.log(error);
  }

};

const handleCancel = () => {
  setTitle("");
  setContent("");
  setSelectedNote(null);
};


const deleteNote = async (event: React.MouseEvent, noteId: number) => {
  event.stopPropagation();

  try {
    await fetch(`http://localhost:5000/api/notes/${noteId}`, {
      method: "DELETE",
    });

    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="main-container">
      <h1>My Notes App</h1>
      <form 
        className="form-note"
        onSubmit={(event) => 
          selectedNote
            ? handleUpdateNote(event)
            : handleAddNote(event)
          }
        >
        <input 
          value={title}
          onChange={(event) =>
            setTitle(event.target.value) 
          }
          placeholder="Title"
          required
        >
        </input>
        <textarea
          value={content}
          onChange={(event) => 
            setContent(event.target.value)
           }
          placeholder="Content"
          rows={10}
          required
        >
        </textarea>

        {selectedNote ? ( 
          <div className="buttons-edit">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add note</button>
        )}
        
      </form>
      <button 
        className="archive-general"
        onClick={toggleShowArchived}>
      {showArchived ? 'Hide Archived Notes' : 'Show Archived Notes'} 
    </button>
    <div className="grid-notes">
      {filteredNotes.map((note) => ( 
        <div
        key={note.id} 
        className="note" 
        onClick={() => handleNoteClick(note.id)}
      >
        <div className="header-notes">
          <button 
            className="archive-single-note"
            onClick={() => handleArchiveClick(note)}>
              {note.isArchived ? 'Unarchive' : 'Archive'} 
          </button>
          <button
            onClick={(event) => deleteNote(event, note.id)}
          >
            X
          </button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p> 
      </div>
      ))}
      {filteredNotes.length === 0 && (
        <p>{showArchived ? "No archived notes yet." : "Add some notes!"}</p>
      )}
    </div>
  </div>
);
}

export default App;