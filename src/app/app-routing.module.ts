import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './pages/results/results.component';
import { WatchComponent } from './pages/watch/watch.component';
import { WatchLaterComponent } from './pages/watch-later/watch-later.component';


const routes: Routes = [
  { path: 'results', component: ResultsComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'watchLater', component: WatchLaterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
