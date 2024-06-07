import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duedate: string;

  @Prop()
  priority: string;

  @Prop([String])
  tags: string[];

  @Prop()
  completed: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
