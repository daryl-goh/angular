import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model';
import { TaskRepository } from '../task.repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form!: FormGroup


  constructor(private fb: FormBuilder, private taskRepo: TaskRepository) { }

  ngOnInit(): void {
    this.form = this.createForm()
    }

  private createForm(): FormGroup {
    return this.fb.group({
      task: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<number>(1, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      dueDate: this.fb.control<number>(Date.now(), [Validators.required])
    })
  } 

  processTask() {
    const task = this.form.value as Task 
    console.info('>>> task: ', task)
    // task.dueDate = new Date(this.form.get('dueDate')?.value).getTime()
    this.taskRepo.addTask(task)
      .then(result => {
        this.ngOnInit()
        return this.taskRepo.getAllTask()
      })
      .catch(error => {console.error('>>>error: ', error)
    })
  } 
  

  
}
