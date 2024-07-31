import { Component, OnInit } from '@angular/core';
import { PatientService, Patient } from '../services/patient.service';
import { AuthService } from '../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {
  patient: Patient | null = null;

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
