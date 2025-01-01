import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumInfoComponent } from './components/forum-info/forum-info.component';


const routes: Routes = [
  { path: '', component: ForumInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
