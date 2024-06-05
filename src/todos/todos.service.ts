import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodosService {
  private todos = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Purchase vegetables, fruits, milk, and bread',
      dueDate: '2024-06-06',
      priority: 'High',
      tags: ['shopping', 'errands'],
      completed: false,
    },
    {
      id: 2,
      title: 'Schedule dentist appointment',
      description: "Call Dr. Smith's office to schedule a routine check-up",
      dueDate: '2024-06-08',
      priority: 'Medium',
      tags: ['health', 'appointments'],
      completed: false,
    },
    {
      id: 3,
      title: 'Finish project report',
      description: 'Complete the quarterly report for the marketing project',
      dueDate: '2024-06-10',
      priority: 'High',
      tags: ['work', 'reports'],
      completed: false,
    },
    {
      id: 4,
      title: 'Call plumber',
      description: 'Fix the leaking faucet in the kitchen',
      dueDate: '2024-06-05',
      priority: 'Low',
      tags: ['home', 'maintenance'],
      completed: true,
    },
    {
      id: 5,
      title: 'Read a book',
      description: "Finish reading 'The Great Gatsby'",
      dueDate: '2024-06-15',
      priority: 'Low',
      tags: ['leisure', 'reading'],
      completed: false,
    },
    {
      id: 6,
      title: 'Update resume',
      description: 'Add recent job experiences and skills to the resume',
      dueDate: '2024-06-07',
      priority: 'Medium',
      tags: ['career', 'documents'],
      completed: true,
    },
    {
      id: 7,
      title: 'Plan weekend trip',
      description:
        'Research and book accommodations for the trip to the mountains',
      dueDate: '2024-06-09',
      priority: 'Medium',
      tags: ['travel', 'planning'],
      completed: false,
    },
    {
      id: 8,
      title: 'Clean the house',
      description: 'Vacuum, dust, and mop all rooms',
      dueDate: '2024-06-06',
      priority: 'Low',
      tags: ['home', 'cleaning'],
      completed: true,
    },
    {
      id: 9,
      title: 'Pay utility bills',
      description: 'Pay electricity, water, and internet bills',
      dueDate: '2024-06-07',
      priority: 'High',
      tags: ['finance', 'bills'],
      completed: false,
    },
    {
      id: 10,
      title: 'Exercise for 30 minutes',
      description: 'Go for a run or do a home workout',
      dueDate: '2024-06-06',
      priority: 'Medium',
      tags: ['health', 'fitness'],
      completed: false,
    },
  ];

  findAll() {
    return this.todos;
  }
  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
  create(createTodoDto: CreateTodoDto) {
    const highestId = this.todos.sort((a, b) => b.id - a.id);

    const newTodo = {
      id: highestId[0].id + 1,
      ...createTodoDto,
    };
    this.todos.push(newTodo);

    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTodoDto };
      }

      return todo;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    const removedTodo = this.findOne(id);

    return removedTodo;
  }
}
