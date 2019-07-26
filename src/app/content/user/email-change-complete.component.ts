import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './email-change-complete.component.html',
  styleUrls: ['./email-change-complete.component.scss']
})
export class UserEmailChangeCompleteComponent {

  public isSubmit = false;

  public constructor(route: ActivatedRoute, router: Router) {

    HttpService.api().patch('users/'+route.snapshot.queryParams.id, {
      token: route.snapshot.queryParams.token
    }).subscribe((user: User) => {
      this.isSubmit = true;
      AuthService.getUser().getAttrs().email = user.getAttrs().email;
      StorageService.get('snack-bar').open(
        '이메일 변경이 완료 되었습니다.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
      router.navigate(['/user/account']);
    });
  }

}
