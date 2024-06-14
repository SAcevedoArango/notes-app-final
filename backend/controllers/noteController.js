import noteService from "../services/noteService.js";

async function getNotes(req, res) {
  try {
    const isArchived = req.query.isArchived === "true";
    const notes = await noteService.getNotes(isArchived);
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Something went wrong..." });
  }
}

async function createNote(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and Content fields must not be empty!" });
  }

  try {
    const note = await noteService.createNote({ title, content });
    res.status(201).json(note); 
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Something went wrong..." });
  }
}

async function updateNote(req, res) {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID must be a valid number" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and Content fields must not be empty!" });
  }

  try {
    const updatedNote = await noteService.updateNote(id, { title, content });
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Something went wrong..." });
  }
}

async function deleteNote(req, res) {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID must be a valid number" });
  }

  try {
    await noteService.deleteNote(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Something went wrong..." });
  }
}

async function archiveNote(req, res) {
  const id = parseInt(req.params.id);
  const { isArchived } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID must be a valid number" });
  }

  if (isArchived === undefined) {
    return res.status(400).json({ error: "isArchived value is required" });
  }

  try {
    const updatedNote = await noteService.archiveNote(id, isArchived);
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: "Note not found" }); 
    }
  } catch (error) {
    console.error("Error archiving/unarchiving note:", error);
    res.status(500).json({ error: "Something went wrong..." });
  }
}

export default { getNotes, createNote, updateNote, deleteNote, archiveNote };
