import { Component, OnInit } from '@angular/core';
import { PatientService, Patient } from '../services/patient.service';
import { AuthService } from '../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],  // Add FormsModule to imports
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {
  patient: Patient | null = null;
  editMode = false;  // Flag to toggle edit mode

  constructor(
    private patientService: PatientService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPatientInfo();
  }

  loadPatientInfo(): void {
    const email = this.authService.getUserEmail();
    if (email) {
      this.patientService.getPatientByEmail(email).subscribe(
        patient => {
          this.patient = {
            ...patient,
            emergencyContact: patient.emergencyContact || {},
            epilepsyDetails: patient.epilepsyDetails || {},
            lifestyle: patient.lifestyle || {},
            supportResources: patient.supportResources || {}
          };
        },
        error => {
          console.error('Error fetching patient information', error);
        }
      );
    }
  }

  // Toggle edit mode
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  // Save patient information
  savePatientInfo(): void {
    if (this.patient) {
      this.patientService.updatePatient(this.patient).subscribe(
        response => {
          console.log('Patient information updated successfully', response);
          this.editMode = false;  // Exit edit mode
        },
        error => {
          console.error('Error updating patient information', error);
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
