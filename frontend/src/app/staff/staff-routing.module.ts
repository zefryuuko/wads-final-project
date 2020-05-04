import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseGroupContentComponent } from './course-group-content/course-group-content.component';

const routes: Routes = [
  {
    path: 'staff',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:courseGroup', component: CourseGroupContentComponent },
      { path: 'courses/:courseGroup/:courseId', component: CourseDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
