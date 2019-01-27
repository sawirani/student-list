import {Component, OnInit} from '@angular/core';
import {STUDENTS} from 'src/app/studentlist/studentlist';
import {Student} from './student.model';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  students: Student[] = STUDENTS;
  threeRating = false;

  sFName: string;
  sLName: string;

  fRating: string;
  fDate: string;

  popup = false;

  deluser: Student;

  constructor() {
  }

  IsRedColor(assessment: Number): boolean {
    if (assessment === 3) {
      if (this.threeRating === true) {
        return true;
      }
    }
    return false;
  }

  ChangeRedThreeRating(): void {
    (this.threeRating === true) ? this.threeRating = false : this.threeRating = true;
  }

  SortTextField(field: string): void {
    this.students.sort((a, b) => {
      return (a[field]).localeCompare(b[field]);
    });
  }

  SortNumberField(field: string): void {
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

  SLastName(lastName: string): boolean {
    return lastName === this.sLName;
  }

  SFirstName(firstName: string): boolean {
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
      if ((tmpdate.getFullYear() !== date.getFullYear()) || (tmpdate.getDate() !== date.getDate()) || (tmpdate.getMonth() !== date.getMonth())) {
        return true;
      }
    }
    return false;
  }

  Confirm(student: Student) {
    this.deluser = student;
    console.log('tut');
    this.popup = true;
  }


  Cancel() {
    this.popup = false;
  }

  Delete() {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i] === this.deluser) {
        this.students.splice(i, 1);
      }
    }
    this.popup = false;
  }


  ngOnInit() {
  }
}

