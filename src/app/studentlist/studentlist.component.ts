import {Component} from '@angular/core';
import {STUDENTS} from 'src/app/studentlist';
import {Student} from '../student.model';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['../app.component.css', './studentlist.component.css']
})
export class StudentlistComponent {

  students: Student[] = STUDENTS;
  _threeRating = false;

  sFName: string;
  sLName: string;

  fRating: string;
  fDate: string;

  popup = false;
  addpopup = false;

  _deluser: Student;

  constructor() {
  }

  isRedColor(assessment: Number): boolean {
    if (assessment === 3) {
      if (this._threeRating === true) {
        return true;
      }
    }
    return false;
  }

  changeRedThreeRating(): void {
    (this._threeRating === true) ? this._threeRating = false : this._threeRating = true;
  }

  sortTextField(field: string): void {
    this.students.sort((a, b) => {
      return (a[field]).localeCompare(b[field]);
    });
  }

  sortNumberField(field: string): void {
    this.students.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
  }

  sLastName(lastName: string): boolean {
    return lastName === this.sLName;
  }

  sFirstName(firstName: string): boolean {
    return firstName === this.sFName;
  }

  filterRating(rating: number): boolean {
    if (this.fRating) {
      return rating !== Number(this.fRating);
    }
    return false;
  }

  filterDate(date: Date) {
    const tmpdate = new Date(this.fDate);
    if (this.fDate) {
      if ((tmpdate.getFullYear() !== date.getFullYear()) ||
          (tmpdate.getDate() !== date.getDate()) ||
          (tmpdate.getMonth() !== date.getMonth())) {
        return true;
      }
    }
    return false;
  }

  confirm(student: Student) {
    this._deluser = student;
    this.popup = true;
  }


  cancel() {
    this.popup = false;
  }

  delete() {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i] === this._deluser) {
        this.students.splice(i, 1);
      }
    }
    this.popup = false;
  }

  studentPopUp(pop: boolean) {
    if (pop === false) {
      this.addpopup = true;
    } else {
      this.addpopup = false;
    }
  }

  addStudent(stud: Student) {
    this.students.push(stud);
  }
}

