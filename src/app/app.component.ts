import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-CryptoJS';

  constructor(private http: HttpClient) {}

  send() {
    const payload = { username: 'piyali', password: 'mypassword' };
    this.http.post('/api/secure-endpoint', payload).subscribe(res => {
      console.log('Response:', res);
    });
  }
}
