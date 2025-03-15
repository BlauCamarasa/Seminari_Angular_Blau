import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  
    private apiUrl = "http://localhost:9000/api/users";
  
    RegisterUser(credentials: { name: string, age: Number, email: string; password: string }): Observable<any> {
      return this.http.post(this.apiUrl, credentials);
    }
}
