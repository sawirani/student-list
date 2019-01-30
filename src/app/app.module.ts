import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import {FormsModule} from '@angular/forms';
import { UserformComponent } from './userform/userform.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentlistComponent,
    UserformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
