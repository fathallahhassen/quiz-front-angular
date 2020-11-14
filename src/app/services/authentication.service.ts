﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {User} from '../model/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  callAuthApi(userLoginInformation, apiPath) {
    return this.http.post<any>(`${environment.BASE_API}/auth/${apiPath}`, userLoginInformation)
      .pipe(map(response => {
        // store user details and basic auth credentials in local storage to keep response logged in between page refreshes
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
