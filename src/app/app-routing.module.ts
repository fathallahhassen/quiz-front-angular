import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';

const routing: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz', component: QuizComponent},
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
