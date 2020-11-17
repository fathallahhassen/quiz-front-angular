import {Component, OnInit} from '@angular/core';
import {QuizService} from './quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Quiz} from '../../model/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz: Quiz;
  questionHasAnswer = false;
  questionIndex = 0;
  currentQuestion;
  displayResult = false;

  subscriptions: Subscription = new Subscription();


  constructor(public quizService: QuizService,
              private  activatedRoute: ActivatedRoute,
              private router: Router) {
    const subscription = this.activatedRoute.params.subscribe((params: any) => {
      const quizId = params.id;
      this.getQuiz(quizId);
    });
    this.subscriptions.add(subscription);
  }

  ngOnInit(): void {
  }

  getQuiz(quizId) {
    this.quizService.getQuiz(quizId).subscribe((response) => {
      this.quiz = response;
      this.setCurrentQuestion();
    }, error => {
      console.log('error', error);
    });
  }

  onQuestionAnswered($event: any): void {
    this.questionHasAnswer = true;
    this.quizService.recordAnswers($event, this.currentQuestion);
    if (this.questionIndex === this.quiz.questions.length - 1) {
      this.addQuizToUserHistory();
    }
  }

  nextQuestion(): void {
    this.questionIndex++;
    this.setCurrentQuestion();
    this.questionHasAnswer = false;
  }

  setCurrentQuestion(): void {
    this.currentQuestion = this.quiz.questions[this.questionIndex];
  }

  showResults() {
    this.displayResult = !this.displayResult;
  }

  private addQuizToUserHistory() {
    this.quizService.updateUserWithQuiz(this.quiz).subscribe((response) => {
      this.router.navigate(['/profile']);
    }, error => {
      console.log('error', error);
    });
  }
}
