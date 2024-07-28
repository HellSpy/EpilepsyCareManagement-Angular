import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface SeizureLog {
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
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './seizure-logs.component.html',
  styleUrls: ['./seizure-logs.component.scss']
})
export class SeizureLogsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.http.get<Patient[]>('http://localhost:3000/api/seizure-logs').subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        // Initialize filteredPatients as empty
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
  }

  addSeizureLog(): void {
    // Logic to add a new seizure log
  }

  editSeizureLog(log: SeizureLog): void {
    // Logic to edit an existing seizure log
  }

  deleteSeizureLog(id: string): void {
    if (this.selectedPatient) {
      this.selectedPatient.seizureLogs = this.selectedPatient.seizureLogs.filter(log => log.id !== id);
    }
  }
}
