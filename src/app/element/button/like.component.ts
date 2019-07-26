import { Component, Input } from '@angular/core';
import { Model } from 'src/app/model';
import { Like } from 'src/app/model/like';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'like-button',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeButtonComponent {

  @Input('related')
  public related     : Model<any,any>;
  public authService : AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  public addLike() {

    HttpService.api().post<Like>('likes', {
      related_id: this.related.getAttrs().id,
      related_type: this.related.getModelType()
    }).subscribe((like: Like) => {
      this.related.getRelations().like = like;
    });
  }

  public removeLike() {

    HttpService.api().delete('likes/'+this.related.getRelations().like.getAttrs().id, {
    }).subscribe(() => {
      delete this.related.getRelations().like;
    });
  }
}
