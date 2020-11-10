import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private router: Router) {
  }


  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  public startQuiz(): void {
    this.router.navigate(['quiz']);
  }

}
