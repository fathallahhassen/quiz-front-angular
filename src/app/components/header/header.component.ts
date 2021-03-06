import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser;

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.currentUserSubject.subscribe((value) => {
      if (value) {
        this.currentUser = value.user;
      }
    });
  }

  ngOnInit(): void {

  }

  logout() {
    this.authenticationService.logout();
  }
}
