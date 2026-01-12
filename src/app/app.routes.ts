import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ZoneComponent } from './pages/zone/zone.component';
import { ChecklistComponent } from './pages/checklist/checklist.component';
import { HistoryComponent } from './pages/history/history.component';
import { FollowupComponent } from './pages/followup/followup.component';


export const routes: Routes = [


{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'zones', component: ZoneComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: 'followup', component: FollowupComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: 'dashboard' },


];
