import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNoteDto } from './notes.image/notes.creating.dto';
import { UpdateNoteDto } from './notes.image/notes.updating.dto';

@Injectable()
export class NotesService {
  private prisma = new PrismaClient();

  create(createNoteDto: CreateNoteDto, userId: string) {
    return this.prisma.note.create({
      data: {
        content: createNoteDto.content,
        userId: userId,
      },
    });
  }
  
  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(noteId: string, userId: string) {
    return this.prisma.note.deleteMany({
      where: {
        id: noteId,
        userId: userId,
      },
    });
  }
}
