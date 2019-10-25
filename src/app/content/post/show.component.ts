import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class PostShowComponent {

  public post: Post;
  public referrer: string;
  public authService: AuthService;
  public contentHtml: SafeHtml;

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer, authService: AuthService) {

    const post       = route.snapshot.data.post;

    this.authService = authService;
    this.post        = post;
    this.contentHtml = sanitizer.bypassSecurityTrustHtml(post.getAttrs().content);
  }

  public delete(post: Post) {

    post.delete$().subscribe();

    if ( post.getAttrs().type == 'free' ) {
      StorageService.get('router').navigate(['/free-posts']);
    }
  }
}
