import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../model';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<User>(`${environment.BASE_API}/profile`);
  }

  edit(profile: User) {
    return this.http.patch<User>(`${environment.BASE_API}/profile`, profile);
  }
}
