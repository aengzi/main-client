import { Component } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class YoutubeVideoListComponent {

  public apiParams: Params = {
    limit: 20
  };
}
