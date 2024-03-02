import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-exam-result',
  templateUrl: './student-exam-result.component.html',
  styleUrl: './student-exam-result.component.css'
})
export class StudentExamResultComponent implements OnInit{

  constructor(private http: HttpClient){ }

  ngOnInit(): void {debugger;
    this.getModuleCodes();
  }

  examDetails: any[] = []; 
  StudentId: any;
  CourseYear: any;
  moduleCodeList: any[] = [];
  ModuleCode: any;
  Marks: any;
  User: any;
  DateEntered: any;

  currentStudentId: string = "";
  searchStudentId: any;

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
  
  resetForm() {
    this.StudentId = null;
    this.CourseYear = "";
    this.ModuleCode = "";
    this.Marks = "";
    this.User = "";
    this.DateEntered = null;
  }

  submit() {
    if (this.currentStudentId == ""){
      this.createResult();
    } else {
      this.updateResult();
    }
  }

  createResult() {
    debugger;
    let examData = {
      "StudentId": this.StudentId,
      "CourseYear": this.CourseYear,
      "ModuleCode": this.ModuleCode,
      "Marks": this.Marks,
      "User": this.User,
      "DateEntered": this.DateEntered,
    };
    this.http.post("http://localhost:7890/api/exam_result/add", examData).subscribe((resultData: any)=> {

      if (resultData && resultData.status) {
        alert("Result added successfully");
        this.resetForm();
      } else {
        alert("Failed to add result");
      }
    });
  }

  updateResult(){
    let moduleData = {
      "CourseYear": this.CourseYear,
      "Marks": this.Marks,
      "User": this.User,
      "DateEntered": this.DateEntered,
    };
    this.http.put("http://localhost:7890/api/exam_result/update" + "/" + this.currentStudentId + "/" + this.ModuleCode, moduleData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Result updated successfully");
        this.resetForm();
      } else {
        alert("Failed to update result");
      }
      
    });
  }

  getAllResults() {
    this.http.get("http://localhost:7890/api/exam_result").subscribe((resultData: any)=> {
      this.examDetails = resultData.data;
    });
  }
  
  getResultById() {
    if (!this.searchStudentId) {
      alert('Please enter a valid module ID');
      return;
    }

    this.http.get(`http://localhost:7890/api/exam_result/${this.searchStudentId}`).subscribe(
      (resultData: any) => {
        console.log(resultData.data);
        this.examDetails = resultData.data;
      },
      (error) => {
        error('Error fetching exam data:', error);
      }
    );
  }

  deleteResult(data: any) {debugger;
    this.http.delete("http://localhost:7890/api/exam_result/delete" + "/" + data.StudentId + "/" + data.ModuleCode).subscribe((resultData: any) => {
      if (resultData && resultData.status) {
        alert("Exam result Deleted");
        this.getAllResults();
      } else {
        alert("Failed to delete result");
      }
    
    });
  }

  viewResult(data: any) {
    this.resetForm();
    this.StudentId = data.StudentId;
    this.CourseYear = data.CourseYear;
    this.ModuleCode = data.ModuleCode;
    this.Marks = data.Marks;
    this.User = data.User;
    this.DateEntered = data.DateEntered;

    this.currentStudentId = data.StudentId;
  }
  
  downloadXlsx(): void {
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.examDetails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'result_sheet.xlsx');
  }
}
