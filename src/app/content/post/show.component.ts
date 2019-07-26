import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class PostShowComponent {

  public post: Post;
  public referrer: string;
  public authService: AuthService;

  constructor(route: ActivatedRoute, authService: AuthService) {
    this.post = route.snapshot.data.post;
    this.authService = authService;
  }
}
