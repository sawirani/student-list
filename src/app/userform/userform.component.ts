import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Validators, ValidationErrors} from '@angular/forms';
import {Student} from '../student.model';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  studentForm: FormGroup;
  @Output() addpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addstudent: EventEmitter<Student> = new EventEmitter<Student>();

  constructor(private fb: FormBuilder) {
  }

  _nameValidator(control: FormControl): ValidationErrors {

    const value = control.value;
    if ((value.firstName !== null && value.lastName !== null)) {
      if ((value.firstName.toLowerCase() === value.lastName.toLowerCase())) {
        return {invalidName: 'Имя не должно совпадать с фамилией'};
      }
    }

    if ((value.firstName !== null && value.middleName !== null)) {
      if ((value.firstName.toLowerCase() === value.middleName.toLowerCase())) {
        return {invalidName: 'Имя не должно совпадать с отчеством'};
      }
    }

    return null;
  }

  _dataValidator(control: FormControl): ValidationErrors {
    const value = control.value;

    const now: Date = new Date();
    const ndate: Date = new Date(value);
    now.setFullYear(now.getFullYear() - 10);

    if (ndate > now) {
      return {invalidDate: 'Пользователю должно быть не менее 10 лет'};
    }
    return null;
  }

  onSubmit() {
    const student: Student = new Student();
    student.rating = this.studentForm.value.rating;
    student.birthday = new Date(this.studentForm.value.birthday);
    student.fistName = this.studentForm.value.person.firstName;
    student.lastName = this.studentForm.value.person.lastName;
    student.middleName = this.studentForm.value.person.middleName;

    this.addstudent.emit(student);
    this.addpopup.emit(true);
  }

  cancel() {
    this.addpopup.emit(true);
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      person: this.fb.group({
        'firstName': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        'lastName': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        'middleName': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
      }, {validator: this._nameValidator}),
      'birthday': [null, [Validators.required, this._dataValidator]],
      'rating': [null, [Validators.required, Validators.min(2), Validators.max(5)]]
    });
  }
}
