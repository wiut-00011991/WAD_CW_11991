import { Component, OnInit, inject } from '@angular/core';
import { TaskItemService } from '../../../services/taskitem.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItem } from '../../../interfaces/TaskItem';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {
  taskItemService = inject(TaskItemService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  editTask: TaskItem = {
    id: 0,
    name: "",
    description: "",
    dueDate: new Date(),
    contributionComment: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: 0,
    project: {
      id: 0,
      name: "",
      description: null,
      startDate: new Date(),
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: []
    }
  };
  projectObject: any;
  selected: any;
  pID: number = 0;
  ngOnInit() {
    this.taskItemService.getByID(this.activatedRoute.snapshot.params["id"]).subscribe(result => {
      this.editTask = result;
      this.selected = this.editTask.projectId;
    });
    this.taskItemService.getAllProjects().subscribe((result) => {
      this.projectObject = result;
    });
  }

  goHome() {
    this.router.navigateByUrl("home")
  }

  edit() {
    this.editTask.projectId = this.pID;
    this.editTask.project = this.projectObject[findIndexByID(this.projectObject, this.pID)];
    this.taskItemService.edit(this.editTask).subscribe(res=>{
      alert("Changes has been updated")
      console.log(`${this.editTask.contributionComment} contribution`)
      this.router.navigateByUrl("home");
    })
  }
}

function findIndexByID(jsonArray: any[], indexToFind: number): number {
  return jsonArray.findIndex((item) => item.id === indexToFind);
}

