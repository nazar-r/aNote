import { Controller, Get, Req, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './notes.image/notes.creating.dto';
import { UpdateNoteDto } from './notes.image/notes.updating.dto';
import { JwtCheckCookies } from '../src.b.jwt/jwt.check.cookies';

@Controller('notes')
@UseGuards(JwtCheckCookies)
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const userId = req.user.id; // беремо userId з payload JWT
    return this.notesService.create(createNoteDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.notesService.remove(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }
}