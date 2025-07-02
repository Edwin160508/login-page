import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-application',
  standalone: true,
  imports: [],
  templateUrl: './main-application.component.html',
  styleUrl: './main-application.component.scss'
})
export class MainApplicationComponent {

  constructor(private router: Router,) { }

  logout(): void {    
    this.router.navigate(['login']);
  }
}
