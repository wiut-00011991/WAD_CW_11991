import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskItemService } from '../../../services/taskitem.service';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TaskItem } from '../../../interfaces/TaskItem';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatChipsModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()], // needed to add datepicker
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateTaskComponent {
  taskService = inject(TaskItemService);

  router = inject(Router);
  project: any; 
  pID: number = 0;

  // Empty TaskItem Object
  createTask: TaskItem = {
    name: "",
    description: "",
    projectId: 0,
    id: 0,
    dueDate: new Date(),
    contributionComment: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }

  ngOnInit() {
    this.taskService.getAllProjects().subscribe((result) => {
      this.project = result
    }); // get all projects on init

  };

  create() {
    this.createTask.projectId=this.pID // assign pID to the createTask field
    this.taskService.create(this.createTask).subscribe(
      {
      next: () => {
        alert("Item Saved")
        this.router.navigateByUrl("home");
      },
      error: (error) => {
        alert(`Error creating item: ${error.message}`); // handle errors 
      }
    });
  };

  cancel() {
    this.router.navigateByUrl("home")
  }
}
