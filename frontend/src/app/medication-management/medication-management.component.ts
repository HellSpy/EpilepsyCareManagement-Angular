import { Component, OnInit } from '@angular/core';
import { PatientService, Medication, MedicationDetails } from '../services/patient.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-medication-management',
  templateUrl: './medication-management.component.html',
  styleUrls: ['./medication-management.component.scss'],
  imports: [RouterModule, CommonModule, FormsModule]
})
export class MedicationManagementComponent implements OnInit {
  medications: Medication[] = [];
  selectedMedication: MedicationDetails | null = null;
  searchText: string = '';

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

  filteredMedications(): Medication[] {
    if (!this.searchText) {
      return this.medications;
    }
    return this.medications.filter(medication =>
      medication._id.toLowerCase().includes(this.searchText.toLowerCase())
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
