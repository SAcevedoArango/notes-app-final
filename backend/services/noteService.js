import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getNotes(isArchived) {
  return await prisma.note.findMany({
    where: isArchived ? { isArchived: true } : undefined,
  });
}

async function createNote({ title, content }) {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }
  return await prisma.note.create({
    data: { title, content },
  });
}

async function updateNote(id, { title, content }) {
  return await prisma.note.updateMany({ 
    where: { id },
    data: { title, content },
  });
}

async function deleteNote(id) {
  await prisma.note.delete({
    where: { id },
  });
}

async function archiveNote(id, isArchived) {
  return await prisma.note.updateMany({ 
    where: { id },
    data: { isArchived },
  });
}

export default { getNotes, createNote, updateNote, deleteNote, archiveNote }; 
