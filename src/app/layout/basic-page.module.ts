import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BasicPageComponent } from './basic-page.component';
import { BasicPageHeaderModule } from 'src/app/layout/basic-page/header.module';
import { BasicPageFooterModule } from 'src/app/layout/basic-page/footer.module';

const routes: Routes = [{
  path: '',
  component: BasicPageComponent,
  children: [{
    path: '',
    loadChildren: () => import('src/app/content/index.module').then(mod => mod.IndexModule)
  }, {
    path: 'auth-user/account',
    loadChildren: () => import('src/app/content/user/account.module').then(mod => mod.UserAccountModule)
  }, {
    path: 'auth-user/profile',
    loadChildren: () => import('src/app/content/user/profile.module').then(mod => mod.UserProfileModule)
  }, {
    path: 'broadcasts',
    loadChildren: () => import('src/app/content/list/broadcast-vod.module').then(mod => mod.BroadcastVodListModule)
  }, {
    path: 'broadcasts/:id',
    loadChildren: () => import('src/app/content/vod-player/aftv-bcast.module').then(mod => mod.AftvBcastVodPlayerModule)
  }, {
    path: 'clips',
    loadChildren: () => import('src/app/content/list/clip.module').then(mod => mod.ClipListModule)
  }, {
    path: 'clips/:id',
    loadChildren: () => import('src/app/content/vod-player/clip.module').then(mod => mod.ClipVodPlayerModule)
  }, {
    path: 'free-posts',
    loadChildren: () => import('src/app/content/list/post/free.module').then(mod => mod.FreePostListModule)
  }, {
    path: 'password-reset',
    loadChildren: () => import('src/app/content/user/password-reset.module').then(mod => mod.UserPasswordResetModule)
  }, {
    path: 'posts/create',
    loadChildren: () => import('src/app/content/post/create.module').then(mod => mod.PostCreateModule)
  }, {
    path: 'posts/:id',
    loadChildren: () => import('src/app/content/post/show.module').then(mod => mod.PostShowModule)
  }, {
    path: 'posts/:id/edit',
    loadChildren: () => import('src/app/content/post/edit.module').then(mod => mod.PostEditModule)
  }, {
    path: 'post/votes',
    loadChildren: () => import('src/app/content/list/post/vote.module').then(mod => mod.VotePostListModule)
  }, {
    path: 'section',
    loadChildren: () => import('src/app/content/list/section-vod.module').then(mod => mod.SectionVodListModule)
  }, {
    path: 'section/lol-games/:id',
    loadChildren: () => import('src/app/content/vod-player/lol-game.module').then(mod => mod.LolGameVodPlayerModule)
  }, {
    path: 'section/pubg-games/:id',
    loadChildren: () => import('src/app/content/vod-player/pubg-game.module').then(mod => mod.PubgGameVodPlayerModule)
  }, {
    path: 'sign-in',
    loadChildren: () => import('src/app/content/user/sign-in.module').then(mod => mod.UserSignInModule)
  }, {
    path: 'sign-up',
    loadChildren: () => import('src/app/content/user/sign-up.module').then(mod => mod.UserSignUpModule)
  }, {
    path: 'users/:id',
    loadChildren: () => import('src/app/content/user/profile.module').then(mod => mod.UserProfileModule)
  }, {
    path: 'youtube',
    loadChildren: () => import('src/app/content/list/youtube.module').then(mod => mod.YoutubeModule)
  }, {
    path: 'youtube/videos/:id',
    loadChildren: () => import('src/app/content/vod-player/youtube.module').then(mod => mod.YoutubeVodPlayerModule)
  }]
}];

@NgModule({
  declarations: [
    BasicPageComponent,
  ],
  exports: [
    BasicPageComponent,
  ],
  imports: [
    BasicPageHeaderModule,
    BasicPageFooterModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class BasicPageModule { }
