import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private config: AppConfig) { }

  login(username: string, password: string) {
    return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  upDateProfile(data) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${data.token}`);

    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.config.apiUrl + '/users/' + data._id, data, options)
      .map((response: Response) => {
        let result = response.json();
        let user = result.user
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  checkAuthen() {
    if (localStorage.getItem('currentUser')) {
      // Retun true after log in success
      return true;
    }
    return false;
  }

}
