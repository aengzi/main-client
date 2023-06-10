import {
  Component,
  ElementRef,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'index-content',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  @ViewChild('htmlDiv')
  public htmlDiv: ElementRef;

  public constructor(private sanitizer: DomSanitizer) {}

  public ngAfterViewInit() {
    const changelog = require('raw-loader!README.md').default;
    const markdown = marked(changelog);

    this.htmlDiv.nativeElement.innerHTML = this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.sanitizer.bypassSecurityTrustHtml(markdown)
    );
  }
}
