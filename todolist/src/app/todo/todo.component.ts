import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Task, Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: Todo | null = null

  todoForm! : FormGroup
  taskArray!: FormArray

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.createForm()
  }

  private createForm(task: Task | null = null): FormGroup {
    return this.fb.group({
      name: this.fb.control(todo)
    })
    

  }

  processForm(): {

  }

  clearButton(): {

  }

  addTaskButton(): {


  }

  createButton() {

  }


}
