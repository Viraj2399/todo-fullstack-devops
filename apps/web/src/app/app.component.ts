import {
  Component,
  OnInit,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  Todo,
} from './models/todo';

import {
  TodoService,
} from './services/todo.service';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    FormsModule,
  ],

  templateUrl:
    './app.component.html',

  styleUrl:
    './app.component.css',
})
export class AppComponent
  implements OnInit {

  todos: Todo[] = [];

  newTodo: Todo = {
    task: '',
    date: '',
    status: 'Pending',
    duration: '',
    owner: '',
  };

  loading = false;

  errorMessage = '';

  constructor(
    private readonly todoService:
      TodoService,
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {

    this.loading = true;

    this.todoService
      .getTodos()
      .subscribe({

        next: (todos) => {

          this.todos = todos;

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load todos.';

          this.loading = false;
        },

      });
  }

  addTodo(): void {

    if (
      !this.newTodo.task.trim() ||
      !this.newTodo.date ||
      !this.newTodo.duration.trim() ||
      !this.newTodo.owner.trim()
    ) {

      this.errorMessage =
        'Please fill all fields.';

      return;
    }

    this.errorMessage = '';

    this.todoService
      .createTodo(this.newTodo)
      .subscribe({

        next: () => {

          this.resetForm();

          this.loadTodos();
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to create todo.';
        },

      });
  }

  completeTodo(todo: Todo): void {

    if (!todo._id) {
      return;
    }

    this.todoService
      .updateTodo(
        todo._id,
        {
          status: 'Completed',
        },
      )
      .subscribe({

        next: () => {
          this.loadTodos();
        },

        error: (error) => {
          console.error(error);
        },

      });
  }

  deleteTodo(id: string): void {

    this.todoService
      .deleteTodo(id)
      .subscribe({

        next: () => {
          this.loadTodos();
        },

        error: (error) => {
          console.error(error);
        },

      });
  }

  resetForm(): void {

    this.newTodo = {
      task: '',
      date: '',
      status: 'Pending',
      duration: '',
      owner: '',
    };
  }
}