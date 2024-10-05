import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from "./login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'gestionnaire-budget-Front-end';
  balance: number = 1000;
  addIncome(amount:number) {
    this.balance += amount
  }


}


