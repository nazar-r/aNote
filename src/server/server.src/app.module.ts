import { Module } from '@nestjs/common';
import { AuthModule } from './src.a.auth/auth.module';
import { NotesModule } from './src.a.notes/notes.module';
import { PrismaService } from './src.b.database/prisma.service';

@Module({
  imports: [AuthModule, NotesModule],
  providers: [PrismaService],
})
export class AppModule {}
