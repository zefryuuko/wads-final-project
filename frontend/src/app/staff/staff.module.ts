import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

import { StaffRoutingModule } from './staff-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseGroupContentComponent } from './course-group-content/course-group-content.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    CoursesComponent,
    CourseDetailsComponent,
    CourseGroupContentComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
