import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit{

  constructor(private http: HttpClient){ }

  ngOnInit(): void {debugger;
    this.getNextCourseId();
    this.getModuleCodes();
  }
  
  courseDetails: any[] = [];
  CourseName: any;
  CD_ID: any;
  CourseType: any;
  Duration: any;
  Medium: any;
  CourseLevel: any;
  moduleCodeList: any[] = [];
  ModuleCode: any;
  Active: any;
  User: any;
  DateEntered: any;
  searchCourseId: any;
  currentCourseId:string = "";

  getNextCourseId(){debugger;
    this.http.get("http://localhost:7890/api/course/maxId").subscribe((resultData: any)=> {
      this.CD_ID = resultData.nextId;
    });
  }

  getModuleCodes() {
    this.http.get(`http://localhost:7890/api/course_module/load/code`).subscribe(
      (resultData: any) => {
        console.log(resultData.data);
        this.moduleCodeList = resultData.data;
      },
      (error) => {
        console.error('Error fetching module code', error);
      }
    );
  }  

  submit() {
    if (this.currentCourseId == ""){
      this.addCourse();
    } else {
      this.updateCourse();
    }
  }

  addCourse() {
    let courseData = {
      "CD_ID": this.CD_ID,
      "CourseName": this.CourseName,
      "CourseType": this.CourseType,
      "Duration": this.Duration,
      "Medium": this.Medium,
      "CourseLevel": this.CourseLevel,
      "ModuleCode": this.ModuleCode,
      "Active": this.Active,
      "User": this.User,
      "DateEntered": this.DateEntered,
    };
    this.http.post("http://localhost:7890/api/course/add", courseData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Course created successfully");
        this.resetForm();
      } else {
        alert("Failed to create course ");
      }
    });
  }

  getAllCourses() {
    this.http.get("http://localhost:7890/api/course").subscribe((resultData: any)=> {
      this.courseDetails = resultData.data;
    });
  }

  getCourseById() {
    if (!this.searchCourseId) {
      console.error('Please enter a valid module ID');
      return;
    }

    this.http.get(`http://localhost:7890/api/course/${this.searchCourseId}`).subscribe(
      (resultData: any) => {
        console.log(resultData.data);
        this.courseDetails = resultData.data;
      },
      (error) => {
        console.error('Error fetching module data:', error);
      }
    );
  }

  viewCourse(data: any) {
    this.resetForm();
    this.CD_ID = data.CD_ID;
    this.CourseName = data.CourseName;
    this.CourseType = data.CourseType;
    this.Duration = data.Duration;
    this.CourseLevel = data.CourseLevel;
    this.Duration = data.Duration;
    this.Medium = data.Medium;
    this.ModuleCode = data.ModuleCode;
    this.Active = data.Active;
    this.User = data.User;
    this.DateEntered = data.DateEntered;

    this.currentCourseId = data.CD_ID;
  }

  updateCourse () {debugger;
    let courseData = {
      "CourseName": this.CourseName,
      "CourseType": this.CourseType,
      "Duration": this.Duration,
      "Medium": this.Medium,
      "CourseLevel": this.CourseLevel,
      "ModuleCode": this.ModuleCode,
      "Active": this.Active,
      "User": this.User,
      "DateEntered": this.DateEntered,
    };
    this.http.put("http://localhost:7890/api/course/update" + "/" + this.currentCourseId, courseData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Course detail updated successfully");
        this.resetForm();
      } else {
        alert("Failed to update Course detail");
      }
    });
  }

  deleteCourse(data: any) {
    this.http.delete("http://localhost:7890/api/course/delete" + "/" +data.CD_ID).subscribe((resultData: any) => {
      if (resultData && resultData.status) {
        alert("Course detail deleted successfully");
        this.getAllCourses();
      } else {
        alert("Failed to delete Course detail");
      }
    });
  }
  
  resetForm() {
    this.ModuleCode = null;
    this.CourseName = null;
    this.CourseType = null;
    this.Duration = null;
    this.Medium = null;
    this.CourseLevel = null;
    this.Duration = null;
    this.Active = null;
    this.User = null;
    this.DateEntered = null;
    this.getNextCourseId();
    this.getModuleCodes();
  }

}
