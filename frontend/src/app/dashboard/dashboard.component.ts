import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PatientService, Patient, Medication } from '../services/patient.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  medications: Medication[] = [];

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

    this.patientService.getMedications().subscribe((data: Medication[]) => {
      console.log('Medications data received:', data);
      this.medications = data;
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

  deselectPatient(): void {
    this.selectedPatient = null;
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase().trim();
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(filterValue)
    );
  }

  applyAgeFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim();

    if (filterValue === '') {
      // Reset to original patients array if input is empty
      this.filteredPatients = this.patients;
    } else {
      const age = Number(filterValue);
      if (!isNaN(age)) {
        this.filteredPatients = this.patients.filter(patient =>
          patient.age && patient.age === age
        );
      } else {
        // If input is not a valid number, reset to original patients array
        this.filteredPatients = this.patients;
      }
    }
  }

  applyMedicationFilter(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const medication = capitalizeFirstLetter(selectElement.value.trim());
    console.log('Selected medication:', medication);

    if (medication === '') {
      this.filteredPatients = this.patients;
    } else {
      this.filteredPatients = this.patients.filter(patient => {
        if (patient.epilepsyDetails && patient.epilepsyDetails.medication) {
          const patientMedication = capitalizeFirstLetter(patient.epilepsyDetails.medication.trim());
          console.log('Checking patient:', patient.name);
          console.log('Patient medication:', patientMedication);
          return patientMedication === medication;
        } else {
          console.log('No epilepsyDetails or medication for patient:', patient.name);
        }
        return false;
      });
    }
    console.log('Filtered patients:', this.filteredPatients);
  }
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
