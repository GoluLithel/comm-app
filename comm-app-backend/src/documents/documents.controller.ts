import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ShareDocumentDto } from './dto/share-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly docs: DocumentsService) {}

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.docs.create(dto);
  }

  @Get()
  findAll(@Query('ownerId') ownerId?: string) {
    return this.docs.findAll(ownerId);
  }

  @Get('shared-with/:userId')
  sharedWith(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.docs.findSharedWith(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.docs.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDocumentDto,
  ) {
    return this.docs.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.docs.remove(id);
  }

  // ---------- shares ----------
  @Get(':id/shares')
  listShares(@Param('id', ParseUUIDPipe) id: string) {
    return this.docs.listShares(id);
  }

  @Post(':id/shares')
  addShare(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ShareDocumentDto,
  ) {
    return this.docs.addShare(id, dto.userId);
  }

  @Delete(':id/shares/:userId')
  @HttpCode(204)
  removeShare(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.docs.removeShare(id, userId);
  }
}
