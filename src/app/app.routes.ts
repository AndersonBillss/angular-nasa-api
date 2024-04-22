import { Routes } from '@angular/router';
import { PictureOfDayComponent } from './picture-of-day/picture-of-day.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: PictureOfDayComponent},
    {path: '**', component: PageNotFoundComponent}
];
