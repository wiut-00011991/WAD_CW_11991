import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaskItemService } from '../../../services/taskitem.service';
import { TaskItem } from '../../../interfaces/TaskItem';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  taskItemService=inject(TaskItemService);
  router = inject(Router)
  items:TaskItem[]=[]; // empty list of tasks

  ngOnInit(){
    this.taskItemService.getAllTaskItems()
        .subscribe((result)=>{this.items = result}); // get all tasks from the api
  }

  displayedColumns: string[] = ['ID', 'Name', 'Description', 'Due Date', 'Contribution Comment', 'Project Name', 'Actions'];
  
  EditClicked(itemID:number){
    this.router.navigateByUrl("/editTask/"+itemID);
  };

  DetailsClicked(itemID:number){
    this.router.navigateByUrl("/taskDetails/"+itemID);
  };

  DeleteClicked(itemID:number){
    this.router.navigateByUrl("/deleteTask/"+itemID);
  }
}

