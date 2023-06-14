import { Component, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Cropper from 'cropperjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'crop-image-dialog',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
})
export class CropImageDialogComponent {
  public elRef: ElementRef;
  public viewRef: MatDialogRef<CropImageDialogComponent>;
  public isLoaded = false;
  public cropper: any;

  public constructor(
    elRef: ElementRef,
    viewRef: MatDialogRef<CropImageDialogComponent>
  ) {
    this.elRef = elRef;
    this.viewRef = viewRef;
  }

  public onSelect() {
    const imageEl = this.elRef.nativeElement.querySelector('img');
    const inputEl = this.elRef.nativeElement.querySelector('input');
    const reader = new FileReader();
    reader.readAsDataURL(inputEl.files[0]);
    reader.onload = (e: ProgressEvent) => {
      this.isLoaded = true;
      imageEl.src = (<FileReader>e.target).result;
      this.cropper = new Cropper(imageEl, {
        aspectRatio: 1,
        viewMode: 3,
      });
    };
  }

  public onCrop() {
    const canvas = this.cropper.getCroppedCanvas({
      maxWidth: 1024,
      maxHeight: 768,
    });

    const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
    HttpService.api()
      .patch<User>('auth-user/', {
        thumbnail: base64,
      })
      .subscribe(({ result: user }) => {
        AuthService.getUser().getAttrs().thumbnail =
          user.getAttrs().thumbnail +
          '?' +
          Math.random().toString(36).substring(3);
        this.viewRef.close();
      });
  }
}
