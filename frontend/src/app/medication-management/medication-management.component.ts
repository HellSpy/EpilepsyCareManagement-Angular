import { Component, OnInit } from '@angular/core';
import { PatientService, Medication, MedicationDetails } from '../services/patient.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavigationPanelComponent } from '../shared/navigation-panel/navigation-panel.component';

@Component({
  standalone: true,
  selector: 'app-medication-management',
  templateUrl: './medication-management.component.html',
  styleUrls: ['./medication-management.component.scss'],
  imports: [RouterModule, CommonModule, FormsModule, NavigationPanelComponent]
})
export class MedicationManagementComponent implements OnInit {
  medications: Medication[] = [];
  selectedMedication: MedicationDetails | null = null;
  searchText: string = '';

  constructor(private patientService: PatientService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userRole = this.authService.getUserRole();
    if (userRole !== 'Doctor' && userRole !== 'Admin') {
      this.router.navigate(['/login']);
    }
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
      medication._id?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }  

  selectMedication(id: string): void {
    this.patientService.getMedicationDetails(id).subscribe(
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
