import {Component, OnInit} from '@angular/core';
import {QuizService} from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz;
  questionHasAnswer = false;
  questionIndex = 0;
  currentQuestion;
  displayResult = false;

  constructor(public quizService: QuizService) {
  }

  ngOnInit(): void {
    this.quizService.getLoadQuiz().subscribe((response) => {
      this.quiz = response;
      this.setCurrentQuestion();
    }, error => {
      console.log('error', error);
    });

  }

  onQuestionAnswered($event: any): void {
    this.questionHasAnswer = true;
    this.quizService.recordAnswers($event, this.currentQuestion);
  }

  nextQuestion(): void {
    this.questionIndex++;
    this.setCurrentQuestion();
    this.questionHasAnswer = false;
  }

  setCurrentQuestion(): void {
    this.currentQuestion = this.quiz[this.questionIndex];
  }

  showResults() {
    this.displayResult = !this.displayResult;
  }
}
