import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('slideIn', [
      state(
        'void',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      state(
        '*',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => *', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  start() {
    this.router.navigate(['/start']);
  }

  gotToInstruction() {
    this.router.navigate(['/instruction']);
  }
}
