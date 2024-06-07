import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsEnum(['High', 'Medium', 'low'], {
    message: 'Priority should be either High, Medium or Low',
  })
  priority: 'Hign' | 'Medium' | 'low';

  @IsArray()
  tags: string[];

  @IsBoolean()
  completed?: boolean;
}
