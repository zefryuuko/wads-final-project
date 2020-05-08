import { CoursesService } from './../../shared/services/courses/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-group-content',
  templateUrl: './course-group-content.component.html',
  styleUrls: ['./course-group-content.component.css']
})
export class CourseGroupContentComponent implements OnInit {

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) { }

  currentPage: number;
  currentPageData: [any];
  courseGroup: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.courseGroup = params.courseGroup;
        this.loadPage();
      }
    );
  }

  loadPage() {
    this.coursesService.getCoursesInGroup(
      this.courseGroup,
      (res) => {
        this.currentPageData = res[0].courses;
      },
      (err) => {}
    );
  }

  nextPage() {
    this.currentPage++;
    this.loadPage();
  }

  prevPage() {
    this.currentPage--;
    this.loadPage();
  }
}
