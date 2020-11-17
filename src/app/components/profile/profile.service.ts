import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private UserDetailsUrl = `${environment.BASE_API}/users/user-details`;

  constructor(private httpClient: HttpClient) {
  }

  getUserDetails(userEmail) {
    return this.httpClient.post(this.UserDetailsUrl,
      {
        email: userEmail,
      });
  }
}
