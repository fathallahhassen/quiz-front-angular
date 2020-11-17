import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {QuizzesComponent} from './components/quizzes/quizzes.component';
import {AuthGuard} from './shared/helpers/auth.guard';
import {ProfileComponent} from './components/profile/profile.component';

const routing: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quizzes', component: QuizzesComponent},
  {path: 'quiz/:id', component: QuizComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routing)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
