import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class UserAccountComponent {
  public authService: typeof AuthService;
}
