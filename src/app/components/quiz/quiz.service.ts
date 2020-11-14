import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizUrl = environment.BASE_API + '/questions';

  answers = [];
  correctAnswers = 0;

  constructor(private httpClient: HttpClient) {
  }

  getLoadQuiz(): any {
    return this.httpClient.get(this.quizUrl);
  }


  recordAnswers($event: any, currentQuestion: any) {
    if (currentQuestion.answer === $event) {
      this.correctAnswers++;
    }
    this.answers.push({question: currentQuestion, answer: $event});
  }
}
