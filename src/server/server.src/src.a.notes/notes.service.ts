import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNoteDto } from './notes.image/notes.creating.dto';
import { UpdateNoteDto } from './notes.image/notes.updating.dto';

@Injectable()
export class NotesService {
  private prisma = new PrismaClient();

  create(createNoteDto: CreateNoteDto, cookiesUserId: string) {
    return this.prisma.note.create({
      data: {
        content: createNoteDto.content,
        userId: cookiesUserId,
      },
    });
  }

  findNotes(userId: string, ) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  remove(noteId: string, userId: string) {
    return this.prisma.note.deleteMany({
      where: {
        userId: userId,
        noteId: noteId,
      },
    });
  }
}
