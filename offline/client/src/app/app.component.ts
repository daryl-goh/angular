import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from './model';
import { TaskRepository } from './task.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks: Task[] = [];
  sub$!: Subscription

  constructor(private taskRepo: TaskRepository) {}

  ngOnInit(): void {
    this.sub$ = this.taskRepo.onToDo.subscribe(
      () => {
          this.taskRepo.getAllTask()
              .then(result => this.tasks =  result)
      }
    )
    this.taskRepo.getAllTask()
        .then(result => this.tasks = result)
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

  sync() {
    this.taskRepo.sync('/api/tasks')
      .then(() => {
        console.info('synced ')
      })
  }
  
}
