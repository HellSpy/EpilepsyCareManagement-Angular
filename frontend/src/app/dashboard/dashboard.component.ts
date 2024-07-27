// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../services/patient.service';

interface Patient {
  name: string;
  epilepsyDetails: {
    diagnosisDate: Date;
    medication: string;
    lastSeizureDate: Date;
    notes: string;
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((data: Patient[]) => {
      this.patients = data;
    });
  }
}
