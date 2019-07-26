import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  templateUrl: './sign-up-complete.component.html',
  styleUrls: ['./sign-up-complete.component.scss']
})
export class UserSignUpCompleteComponent {

  public isSubmit = false;

  public constructor(route: ActivatedRoute) {

    HttpService.api().post('sign-up', {
      token: route.snapshot.queryParams.token
    }).subscribe(() => {
      this.isSubmit = true;
    });
  }

}
