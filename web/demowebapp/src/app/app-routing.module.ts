import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaceVerifyComponent } from './face-verify/face-verify.component';


const routes: Routes = [
  {path: '', component: FaceVerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
