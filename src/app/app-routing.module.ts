import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './pages/results/results.component';
import { WatchLaterComponent } from './pages/watch-later/watch-later.component';


const routes: Routes = [
  {path: '', redirectTo:'/search?query=music', pathMatch: 'full'},
  { path: 'search', component: ResultsComponent },
  { path: 'watchLater', component: WatchLaterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
