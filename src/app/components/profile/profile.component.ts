import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser;
  userQuizzes;


  constructor(private authenticationService: AuthenticationService,
              private profileService: ProfileService) {
    authenticationService.currentUserSubject.subscribe((value) => {
      if (value) {
        this.currentUser = value.user;
        this.getUserDetails();
      }
    });
  }

  ngOnInit(): void {
  }

  private getUserDetails() {
    this.profileService.getUserDetails(this.currentUser.email).subscribe((response: any) => {
      console.log('response', response);
      this.userQuizzes = response.quizzes;
    }, error => {
      console.log('error', error);
    });
  }
}
