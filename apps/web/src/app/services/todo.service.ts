import {
  Injectable,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs';

import {
  Todo,
} from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private readonly apiUrl =
    'http://localhost:3000/todos';

  constructor(
    private readonly http: HttpClient,
  ) {}

  getTodos():
    Observable<Todo[]> {

    return this.http.get<Todo[]>(
      this.apiUrl,
    );
  }

  createTodo(
    todo: Todo,
  ): Observable<Todo> {

    return this.http.post<Todo>(
      this.apiUrl,
      todo,
    );
  }

  updateTodo(
    id: string,
    todo: Partial<Todo>,
  ): Observable<Todo> {

    return this.http.patch<Todo>(
      `${this.apiUrl}/${id}`,
      todo,
    );
  }

  deleteTodo(
    id: string,
  ): Observable<{
    message: string;
  }> {

    return this.http.delete<{
      message: string;
    }>(
      `${this.apiUrl}/${id}`,
    );
  }
}