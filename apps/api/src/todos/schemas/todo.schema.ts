import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop({
    required: true,
    trim: true,
  })
  task: string;

  @Prop({
    required: true,
  })
  date: string;

  @Prop({
    required: true,
    enum: [
      'Pending',
      'In Progress',
      'Completed',
    ],
    default: 'Pending',
  })
  status: string;

  @Prop({
    required: true,
    trim: true,
  })
  duration: string;

  @Prop({
    required: true,
    trim: true,
  })
  owner: string;
}

export const TodoSchema =
  SchemaFactory.createForClass(Todo);