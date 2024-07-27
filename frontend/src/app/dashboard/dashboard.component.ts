// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientService, Patient } from '../services/patient.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;

  constructor(private patientService: PatientService) {
    console.log('DashboardComponent initialized');
  }

  ngOnInit(): void {
    console.log('DashboardComponent ngOnInit');
    this.patientService.getPatients().subscribe((data: Patient[]) => {
      console.log('Patients data received:', data);
      this.patients = data;
      this.filteredPatients = data;  // Initialize filteredPatients
    });
  }

  selectPatient(id: string): void {
    console.log('selectPatient called with id:', id);
    this.patientService.getPatientById(id).subscribe({
      next: (data: Patient) => {
        console.log('Selected Patient data received:', data);
        this.selectedPatient = data;
      },
      error: (err) => {
        console.error('Error fetching patient data:', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase().trim();
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(filterValue)
    );
  }
}
