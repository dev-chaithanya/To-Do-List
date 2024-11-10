import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CrudService } from '../../services/crud.service';
import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string ='';

  constructor(private crudService: CrudService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.addTaskValue = '';
    this.editTaskValue = '';
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
        // alert("Unable to get the list of Tasks.");/
        this.snackBar.open('Unable to get the list of Tasks.', 'close',{
          duration: 3000,
        });
      },
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue 
    this.crudService.addTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      error: (err) => {
        // alert(err);
        console.error(err);
        this.snackBar.open('An error occured', 'close',{
          duration: 3000,
        });
      },
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: res =>{
        this.ngOnInit();
      },
      error: err => {
        // alert("Failed to edit the task");
        this.snackBar.open('Failed to edit the task!', 'close',{
          duration: 3000,
        });
      }
    });
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe({
      next: res =>{
        this.ngOnInit();
      },
      error: err =>{
        // alert("Failed to delete the task.");
        this.snackBar.open('Failed to delete the task.', 'close',{
          duration: 3000,
        });
      }
    })
  }

  callTask(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
