import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizUrl = `${environment.BASE_API}/quizzes/`;
  UserUpdateUrl = `${environment.BASE_API}/users/add-quiz`;

  answers = [];
  correctAnswers = 0;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {

  }

  getQuiz(quizId): any {
    return this.httpClient.get(this.quizUrl + quizId);
  }


  recordAnswers($event: any, currentQuestion: any) {
    if (currentQuestion.answer === $event) {
      this.correctAnswers++;
    }
    this.answers.push({question: currentQuestion, answer: $event});
  }

  updateUserWithQuiz(quiz) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      return this.httpClient.post(this.UserUpdateUrl,
        {
          email: currentUser.user.email,
          quiz: {
            id: quiz._id,
            answers: this.answers,
            result: this.correctAnswers * 100 / quiz.questions.length
          }
        });
    }

  }
}
