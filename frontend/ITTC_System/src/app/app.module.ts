import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { CourseModuleComponent } from './course-module/course-module.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentExamResultComponent } from './student-exam-result/student-exam-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StudentRegistrationComponent,
    CourseModuleComponent,
    CourseDetailComponent,
    StudentExamResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
