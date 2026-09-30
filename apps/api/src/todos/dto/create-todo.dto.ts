import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsIn([
    'Pending',
    'In Progress',
    'Completed',
  ])
  status: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  owner: string;
}