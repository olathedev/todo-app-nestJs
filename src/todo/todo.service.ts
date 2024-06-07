import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoModel.create(createTodoDto);
    return todo;
  }

  async findAll() {
    const todo = await this.todoModel.find();
    return todo;
  }

  async findOne(id: string) {
    try {
      const todo = await this.todoModel.findById({ _id: id });
      if (!todo) {
        throw new NotFoundException('No todo found with this ID');
      }
      return todo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const isTodo = await this.todoModel.find({ _id: id });
      if (!isTodo) {
        throw new NotFoundException('No todo found with this ID');
      }

      const todo = await this.todoModel.findOneAndUpdate(
        { _id: id },
        updateTodoDto,
      );
      return todo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const isTodo = await this.todoModel.find({ _id: id });
      if (!isTodo) {
        throw new NotFoundException('No todo found with this ID');
      }

      await this.todoModel.findOneAndDelete({ _id: id });

      return 'Todo Deleted';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
