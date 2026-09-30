import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectModel,
} from '@nestjs/mongoose';

import {
  Model,
} from 'mongoose';

import {
  Todo,
  TodoDocument,
} from './schemas/todo.schema';

import {
  CreateTodoDto,
} from './dto/create-todo.dto';

import {
  UpdateTodoDto,
} from './dto/update-todo.dto';

@Injectable()
export class TodosService {

  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel:
      Model<TodoDocument>,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
  ) {
    const todo =
      new this.todoModel(
        createTodoDto,
      );

    return todo.save();
  }

  async findAll() {
    return this.todoModel
      .find()
      .sort({
        createdAt: -1,
      })
      .exec();
  }

  async findOne(id: string) {

    const todo =
      await this.todoModel
        .findById(id)
        .exec();

    if (!todo) {
      throw new NotFoundException(
        'Todo not found',
      );
    }

    return todo;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ) {

    const todo =
      await this.todoModel
        .findByIdAndUpdate(
          id,
          updateTodoDto,
          {
            new: true,
            runValidators: true,
          },
        )
        .exec();

    if (!todo) {
      throw new NotFoundException(
        'Todo not found',
      );
    }

    return todo;
  }

  async remove(id: string) {

    const todo =
      await this.todoModel
        .findByIdAndDelete(id)
        .exec();

    if (!todo) {
      throw new NotFoundException(
        'Todo not found',
      );
    }

    return {
      message:
        'Todo deleted successfully',
    };
  }
}