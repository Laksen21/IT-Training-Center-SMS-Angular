import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { CourseModuleComponent } from './course-module/course-module.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentExamResultComponent } from './student-exam-result/student-exam-result.component';

const routes: Routes = [
  {path: '', component:StudentRegistrationComponent },
  {path: 'course-modules', component:CourseModuleComponent },
  {path: 'course-details', component:CourseDetailComponent },
  {path: 'exam-result', component:StudentExamResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
