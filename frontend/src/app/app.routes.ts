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
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { PatientPageComponent } from './patient-page/patient-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Doctor', 'Admin'] }},
  { path: 'seizure-logs', component: SeizureLogsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Doctor', 'Admin'] }},
  { path: 'medication-management', component: MedicationManagementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Doctor', 'Admin'] }},
  { path: 'reports-analytics', component: ReportsAndAnalyticsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Doctor', 'Admin'] }},
  { path: 'patient', component: PatientPageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Patient'] }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule], // Include HttpClientModule here
  exports: [RouterModule]
})
export class AppRoutingModule {}
