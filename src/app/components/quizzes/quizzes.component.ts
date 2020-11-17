import {Component, OnInit} from '@angular/core';
import {QuizzesService} from './quizzes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  quizzes;

  constructor(private quizzesService: QuizzesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes() {
    this.quizzesService.loadQuiz().subscribe((response) => {
      console.log('response', response);
      this.quizzes = response;
    }, error => {
      console.log('error', error);
    });
  }

  redirectToQuiz(item: any) {
    const quizUrl = '/quiz/' + item._id;
    this.router.navigate([quizUrl]);

  }
}
