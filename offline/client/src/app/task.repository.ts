import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { firstValueFrom, Subject } from "rxjs";
import { SyncResult, Task } from "./model";

@Injectable()
export class TaskRepository extends Dexie {

    todo!: Dexie.Table<Task, number>

    onToDo = new Subject<void>();

    constructor(private http: HttpClient){
        super('TaskDB')
        this.version(1).stores({
            todo: '++id, dueDate',
           
        })
        
        this.todo = this.table('todo')
       
    }

    getAllTask(): Promise<Task[]> {
        return this.todo.orderBy('dueDate').toArray()
    }

    addTask(task: Task): Promise<number> {
        return this.todo.add(task)
            .then(v =>  {
                this.onToDo.next()
                return v
            })
    }

    // deleteAll(): Promise<void> {
    //     return this.getAllTask()
    //       .then(result => result.map(v => v.id))
    //       .then(result => {
    //         console.info('>>> result: ', result)
    //         return result
    //       })
    //       .then(result => this.todo.bulkDelete(result))
    //       .then(() => {
    //         this.onToDo.next()
    //       })
    //   }

    
    synaAsUrlForm(endpoint: string, task: Task) {
        const params = new HttpParams()
          .set('task', task.task)
          .set('dueDate', task.dueDate)
          .set('priority', task.priority)
    
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
    
        return firstValueFrom(
          // POST /api/tasks
          // Content-Type: application/x-www-form-urlencoded
          this.http.post<any>(endpoint, params.toString(), { headers })
        )
      }

    sync(endpoint: string): Promise<void> {
        return this.getAllTask()
          .then(result => firstValueFrom(this.http.post<SyncResult>(endpoint, result)))
          .then(result => {
            console.info('>>> after sync: ', result)
          })
        //   .then(() => this.deleteAll())
      }

}

