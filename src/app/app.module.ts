import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { map, of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/layout/basic-page.module').then(
        (mod) => mod.BasicPageModule
      ),
    resolve: {
      auth: 'auth$$',
    },
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  providers: [
    {
      provide: 'auth$$',
      useValue: () => {
        if (AuthService.getUser()) {
          return of(AuthService.getUser());
        } else if (localStorage.getItem('aengzi-auth-token')) {
          const obs = HttpService.api()
            .get<User>('auth-user')
            .pipe(map(({ result: user }) => user));

          obs.subscribe(
            (user) => {
              AuthService.setUser(user);
            },
            () => {
              localStorage.removeItem('aengzi-auth-token');
              location.reload();
            }
          );

          return obs;
        }

        return of(null);
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
