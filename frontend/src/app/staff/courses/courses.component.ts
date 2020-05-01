import { Component, OnInit } from '@angular/core';
import { CoursesService } from './../../shared/services/courses/courses.service';

@Component({
  selector: 'bm-staff-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(public coursesService: CoursesService) { }
  currentPage: number;
  currentPageData: any;

  ngOnInit(): void {
    this.currentPage = 1;
    this.coursesService.getCourseGroups(
      this.currentPage,
      (res) => {
        this.currentPageData = res;
      },
      (err) => {}
    );
  }
}
