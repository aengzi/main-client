import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './sign-up-complete.component.html',
  styleUrls: ['./sign-up-complete.component.scss']
})
export class UserSignUpCompleteComponent {

  public isSubmit = false;

  public constructor(route: ActivatedRoute, router: Router) {

    HttpService.api().post('sign-up', {
      token: route.snapshot.queryParams.token
    }).subscribe(() => {

      StorageService.get('snack-bar').open(
        '회원가입이 완료 되었습니다. 로그인해주세요.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
      this.isSubmit = true;
      router.navigate(['/sign-in']);
    });
  }

}
