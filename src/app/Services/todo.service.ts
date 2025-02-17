/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos: string[] = [];

  constructor() {}

  getTodos(): string[] {
    return this._todos;
  }

  addTodo(todo: string): void {
    this._todos.push(todo);
  }

  removeTodo(index: number): void {
    this._todos.splice(index, 1);
  }
}
