// src/app/medication-management/medication-management.component.ts
import { Component, OnInit } from '@angular/core';
import { PatientService, Medication, MedicationDetails } from '../services/patient.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-medication-management',
  templateUrl: './medication-management.component.html',
  styleUrls: ['./medication-management.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class MedicationManagementComponent implements OnInit {
  medications: Medication[] = [];
  selectedMedication: MedicationDetails | null = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications(): void {
    this.patientService.getMedications().subscribe(
      (data: Medication[]) => {
        this.medications = data;
      },
      (error) => {
        console.error('Error fetching medications:', error);
      }
    );
  }

  selectMedication(name: string): void {
    this.patientService.getMedicationDetails(name).subscribe(
      (data: MedicationDetails) => {
        this.selectedMedication = data;
      },
      (error) => {
        console.error('Error fetching medication details:', error);
      }
    );
  }

  deselectMedication(): void {
    this.selectedMedication = null;
  }
}