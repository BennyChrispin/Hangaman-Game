import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CategoryData } from '../../models/gamemodel';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
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
export class StartComponent {
  categoryData: CategoryData | null = null;
  categoryNames: string[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCategoryData().subscribe(
      (res: any) => {
        this.categoryData = res;
        if (this.categoryData) {
          this.categoryNames = Object.keys(this.categoryData.categories);
          console.log(this.categoryNames);
        }
        // console.log("Name:", this.categoryNames)
      },
      (error) => {
        console.error('Error fetching category data: ', error);
      }
    );
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

  startGame(gameCategory: string) {
    this.router.navigate([`/play/${gameCategory}`]);
  }
}
