import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavigationPanelComponent } from '../shared/navigation-panel/navigation-panel.component';

interface SeizureLog {
  _id: string; // Updated to use MongoDB _id field
  id: string;
  date: Date;
  type: string;
  duration: string;
  triggers: string;
}

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: Date;
  seizureLogs: SeizureLog[];
}

@Component({
  selector: 'app-seizure-logs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule, NavigationPanelComponent],
  templateUrl: './seizure-logs.component.html',
  styleUrls: ['./seizure-logs.component.scss']
})
export class SeizureLogsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  seizureLogForm: FormGroup;
  isEditing: boolean = false;
  editingLogId: string | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService) { 
    this.seizureLogForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required],
      triggers: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    const headers = this.authService.getAuthHeaders();
    this.http.get<Patient[]>('http://localhost:3000/api/seizure-logs', { headers }).subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        this.filteredPatients = [];
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase().trim();
    if (filterValue) {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredPatients = [];
    }
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.isEditing = false;
  }

  addSeizureLog(): void {
    this.isEditing = true;
    this.editingLogId = null;
    this.seizureLogForm.reset();
  }

  editSeizureLog(log: SeizureLog): void {
    this.isEditing = true;
    this.editingLogId = log.id;
    const logDate = new Date(log.date);
    this.seizureLogForm.patchValue({
      date: logDate.toISOString().substring(0, 10), // Format date for input[type="date"]
      type: log.type,
      duration: log.duration,
      triggers: log.triggers
    });
  }

  saveSeizureLog(): void {
    if (this.selectedPatient && this.seizureLogForm.valid) {
      if (this.editingLogId === null) {
        const newLog: SeizureLog = {
          _id: '',
          id: new Date().getTime().toString(),
          ...this.seizureLogForm.value,
          date: new Date(this.seizureLogForm.value.date)
        };
        const headers = this.authService.getAuthHeaders();
        this.http.post<Patient>(`http://localhost:3000/api/seizure-logs/${this.selectedPatient._id}`, newLog, { headers }).subscribe({
          next: (updatedPatient) => {
            this.selectedPatient = updatedPatient;
            this.seizureLogForm.reset();
            this.isEditing = false;
          },
          error: (err) => {
            console.error('Error adding seizure log:', err);
          }
        });
      } else {
        const updatedLog = {
          ...this.seizureLogForm.value,
          date: new Date(this.seizureLogForm.value.date)
        };
        const headers = this.authService.getAuthHeaders();
        this.http.put<Patient>(`http://localhost:3000/api/seizure-logs/${this.selectedPatient._id}/${this.editingLogId}`, updatedLog, { headers }).subscribe({
          next: (updatedPatient) => {
            this.selectedPatient = updatedPatient;
            this.isEditing = false;
            this.editingLogId = null;
            this.seizureLogForm.reset();
          },
          error: (err) => {
            console.error('Error saving seizure log:', err);
          }
        });
      }
    } else {
      console.error('Form is invalid or no patient selected.');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingLogId = null;
    this.seizureLogForm.reset();
  }

  deleteSeizureLog(id: string): void {
    if (this.selectedPatient) {
      console.log(`Deleting log ID: ${id} for patient ID: ${this.selectedPatient._id}`);
      const headers = this.authService.getAuthHeaders();
      this.http.delete<Patient>(`http://localhost:3000/api/seizure-logs/${this.selectedPatient._id}/${id}`, { headers }).subscribe({
        next: (updatedPatient) => {
          this.selectedPatient = updatedPatient;
        },
        error: (err) => {
          console.error('Error deleting seizure log:', err);
        }
      });
    }
  }
}
