import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CrudService } from '../../services/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr =[];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        this.taskArr = res;
      },
      error: (err) => {
        alert("Unable to get the list of Tasks.");
      },
    });
  }

  addTask(etask: Task) {
    this.crudService.addTask(etask).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  editTask() {
    this.crudService.editTask(this.taskObj).subscribe({
      next: res =>{
        this.ngOnInit();
      },
      error: err => {
        alert("Failed to edit the task");
      }
    });
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe({
      next: res =>{
        this.ngOnInit();
      },
      error: err =>{
        alert("Failed to delete the task.");
      }
    })
  }
}
