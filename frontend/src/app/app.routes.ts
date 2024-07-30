// src/app/app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SeizureLogsComponent } from './seizure-logs/seizure-logs.component';
import { MedicationManagementComponent } from './medication-management/medication-management.component'; // new medication component
import { ReportsAndAnalyticsComponent } from './reports-and-analytics/reports-and-analytics.component'; // report component

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default route to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'seizure-logs', component: SeizureLogsComponent },
  { path: 'medication-management', component: MedicationManagementComponent },
  { path: 'reports-analytics', component: ReportsAndAnalyticsComponent }, // report component
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule], // Include HttpClientModule here
  exports: [RouterModule]
})
export class AppRoutingModule {}
