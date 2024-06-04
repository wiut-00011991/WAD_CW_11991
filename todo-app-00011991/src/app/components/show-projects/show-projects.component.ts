import { Component, inject } from '@angular/core';
import { ProjectItemService } from '../../services/projectItem.service';
import { Router } from '@angular/router';
import { ProjectItem } from '../../interfaces/ProjectItem';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-show-projects',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './show-projects.component.html',
  styleUrl: './show-projects.component.css'
})
export class ShowProjectsComponent {
  projectItemService=inject(ProjectItemService);
  router = inject(Router)
  items:ProjectItem[]=[]; // empty list of projects

  ngOnInit(){
    this.projectItemService.getAllProjects()
        .subscribe((result)=>{this.items = result}); // get all projects from the api
  }

  displayedColumns: string[] = ['ID', 'Name', 'Description', 'Start Date', 'End Date', 'Actions']; // show these columns in table
  
  EditClicked(itemID:number){
    this.router.navigateByUrl("/editProject/"+itemID);
  };

  DetailsClicked(itemID:number){
    this.router.navigateByUrl("/projectDetails/"+itemID);
  };

  DeleteClicked(itemID:number){
    this.router.navigateByUrl("/deleteProject/"+itemID);
  }
}
