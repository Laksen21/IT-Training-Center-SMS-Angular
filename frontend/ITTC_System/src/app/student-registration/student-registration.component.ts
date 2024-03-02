import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent implements OnInit{
  
  constructor(private http: HttpClient){

  }
    
  ngOnInit(): void {
    this.getCourseIds();
    this.getNextStudentId();
  }

  studentDetails: any[] = [];

  studentId: any;
  courseYear: number = null;
  courseId: number = null;
  courseIdList: any[] = []; //cIdarray
  fullName: string = "";
  nameWithInitials: string = "";

  genderList = ['Male', 'Female']; // Gender array
  selectedGender: string = "";

  nic: string = "";
  misNumber: string = "";
  mobileNo: number = null;
  address: string = "";
  changed: boolean = false;
  deleted: boolean = false;
  dropOut: boolean = false;
  finalExamSitted: boolean = false;
  repeatStudent: boolean = false;
  user: number = null;
  date: string = "";
  searchStudentId: any;
  currentStudentId: string = "";

  submit() {
    if (this.currentStudentId == ""){
      this.studentRegister();
    } else {
      this.udpateStudent();
    }
  }

  getNextStudentId(){debugger;
    this.http.get("http://localhost:7890/api/student/maxId").subscribe((resultData: any)=> {
      this.studentId = resultData.nextId;
    });
  }

  studentRegister() {
    let stuData = {
      "Id": this.studentId,
      "CourseYear": this.courseYear,
      "CourseId": this.courseId,
      "FullName": this.fullName,
      "NameWithInitials": this.nameWithInitials,
      "Gender": this.selectedGender,
      "Nic": this.nic,
      "MISNumber": this.misNumber,
      "Mobile": this.mobileNo,
      "Address": this.address,
      "Changed": this.changed,
      "Deleted": this.deleted,
      "Dropout": this.dropOut,
      "FinalExamSitted": this.finalExamSitted,
      "RepeatStudent": this.repeatStudent,
      "User": this.user,
      "DateEntered": this.date,
    };
    this.http.post("http://localhost:7890/api/student/add", stuData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Student registerd successfully");
        this.resetForm();
      } else {
        alert("Failed to register student");
      }
    });
  }
  
  getAllStudents() {
    this.http.get("http://localhost:7890/api/student").subscribe((resultData: any)=> {
      this.studentDetails = resultData.data;
    });
  }

  getStudentById() {
    if (!this.searchStudentId) {
      console.error('Please enter a valid student ID');
      return;
    }

    this.http.get(`http://localhost:7890/api/student/${this.searchStudentId}`).subscribe(
      (resultData: any) => {
        console.log(resultData.data);
        this.studentDetails = resultData.data;
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  viewStudent(data: any) {
    this.resetForm()

    this.studentId = data.Id;
    this.courseYear = data.CourseYear;
    this.courseId = data.CourseId;
    this.fullName = data.FullName;
    this.nameWithInitials = data.NameWithInitials;
    this.selectedGender = data.SelectedGender;
    this.nic = data.Nic;
    this.misNumber = data.MISNumber;
    this.mobileNo = data.Mobile;
    this.address = data.Address;
    this.changed = data.Changed;
    this.deleted = data.Deleted;
    this.dropOut = data.Dropout;
    this.finalExamSitted = data.FinalExamSitted;
    this.repeatStudent = data.RepeatStudent;
    this.user = data.User;
    this.date = data.DateEntered;

    this.currentStudentId = data.Id;
  }
  
  udpateStudent() {debugger;
    let stuData = {
      "CourseYear": this.courseYear,
      "CourseId": this.courseId,
      "FullName": this.fullName,
      "NameWithInitials": this.nameWithInitials,
      "Gender": this.selectedGender,
      "Nic": this.nic,
      "MISNumber": this.misNumber,
      "Mobile": this.mobileNo,
      "Address": this.address,
      "Changed": this.changed,
      "Deleted": this.deleted,
      "Dropout": this.dropOut,
      "FinalExamSitted": this.finalExamSitted,
      "RepeatStudent": this.repeatStudent,
      "User": this.user,
      "DateEntered": this.date,
    };
    this.http.put("http://localhost:7890/api/student/update"+ "/" +this.currentStudentId, stuData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Student updated successfully");
        this.resetForm();
      } else {
        alert("Failed to update student detail");
      }
    });
  }

  deleteStudent(data: any) {
    this.http.delete("http://localhost:7890/api/student/delete" + "/" +data.Id).subscribe((resultData: any) => {
      if (resultData && resultData.status) {
        alert("Student detail deleted successfully");
        this.getAllStudents();
      } else {
        alert("Failed to delete student detail");
      }
    });
  }


  resetForm(){
      this.studentId = null;
      this.courseId = null;
      this.courseYear = null;
      this.fullName = "";
      this.nameWithInitials = "";
      this.selectedGender = "";
      this.nic = null;
      this.misNumber = "";
      this.mobileNo = null;
      this.address = "";
      this.changed = false
      this.deleted = false;
      this.dropOut = false;
      this.finalExamSitted = false;
      this.repeatStudent = false;
      this.user = null;
      this.date = "";
      this.getCourseIds();
      this.getNextStudentId();
  }

  getCourseIds() {
    this.http.get(`http://localhost:7890/api/course/load/id`).subscribe(
      (resultData: any) => {
        console.log(resultData.data);
        this.courseIdList = resultData.data;
      },
      (error) => {
        console.error('Error fetching course id', error);
      }
    );
  }
}



