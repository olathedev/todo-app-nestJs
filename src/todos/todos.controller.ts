import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get() //GET /todos
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id') //GET /todos/:id
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Post() //POST /todos
  create(
    @Body(ValidationPipe)
    createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id') //PATCH /todos/:id
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id') //DELETE /todos/:id
  delete(@Param('id') id: string) {
    return { id };
  }
}
