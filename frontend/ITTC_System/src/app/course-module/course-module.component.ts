import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrl: './course-module.component.css'
})
export class CourseModuleComponent implements OnInit{

  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.getNextModuleId();
  }

  moduleDetails: any[] = [];
  ModuleId: any;
  ModuleName: any;
  ModuleCode: any;
  Active: any;
  User: any;
  DateEntered: any;

  currentModuleId: string = "";
  searchModuleId: any;
   
  
  getNextModuleId(){debugger;
    this.http.get("http://localhost:7890/api/course_module/maxId").subscribe((resultData: any)=> {
      this.ModuleId = resultData.nextId;
    });
  }

  resetForm() {
    this.getNextModuleId();
    this.ModuleName = "";
    this.ModuleCode = "";
    this.Active = "";
    this.User = "";
    this.DateEntered = null;
  }

  submit() {
    if (this.currentModuleId == ""){
      this.createModule();
    } else {
      this.updateModule();
    }
  }

  createModule() {
    debugger;
    let moduleData = {
      "ModuleId": this.ModuleId,
      "ModuleName": this.ModuleName,
      "ModuleCode": this.ModuleCode,
      "Active": this.Active,
      "User": this.User,
      "DateEntered": this.DateEntered,
    };
    this.http.post("http://localhost:7890/api/course_module/add", moduleData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Module created successfully");
        this.resetForm();
      } else {
        alert("Failed to update result");
      }
    });
  }

  updateModule(){
    let moduleData = {
      "ModuleName": this.ModuleName,
      "ModuleCode": this.ModuleCode,
      "Active": this.Active,
      "User": this.User,
      "DateEntered": this.DateEntered,
    };
    this.http.put("http://localhost:7890/api/course_module/update" + "/" + this.currentModuleId, moduleData).subscribe((resultData: any)=> {
      if (resultData && resultData.status) {
        alert("Course module updated successfully");
        this.resetForm();
      } else {
        alert("Failed to update result");
      }
    });
  }

  getAllModules() {
    this.http.get("http://localhost:7890/api/course_module").subscribe((resultData: any)=> {
      this.moduleDetails = resultData.data;
    });
  }
  
  getModuleById() {
    if (!this.searchModuleId) {
      console.error('Please enter a valid module ID');
      return;
    }

    this.http.get(`http://localhost:7890/api/course_module/${this.searchModuleId}`).subscribe(
      (resultData: any) => {
        console.log(resultData.data);
        this.moduleDetails = resultData.data;
      },
      (error) => {
        console.error('Error fetching module data:', error);
      }
    );
  }

  deleteModule(data: any) {debugger;
    this.http.delete("http://localhost:7890/api/course_module/delete" + "/" +data.ModuleId).subscribe((resultData: any) => {
      if (resultData && resultData.status) {
        alert("Module Deleted successfully");
        this.getAllModules();
      } else {
        alert("Failed to update result");
      }
    });
  }

  viewModules(data: any) {
    this.resetForm();
    this.ModuleId = data.ModuleId;
    this.ModuleName = data.ModuleName;
    this.ModuleCode = data.ModuleCode;
    this.Active = data.Active;
    this.User = data.User;
    this.DateEntered = data.DateEntered;

    this.currentModuleId = data.ModuleId;
  }
}
