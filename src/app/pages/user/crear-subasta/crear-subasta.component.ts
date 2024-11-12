import { MaterialModule } from '../../../material/material.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-subasta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialModule
  ],
  templateUrl: './crear-subasta.component.html',
  styleUrls: ['./crear-subasta.component.css']
})
export class CrearSubastaComponent implements OnInit {
  ofertaForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initForm();
    this.isEditMode = false;
  }

  private initForm(): void {
    this.ofertaForm = this.fb.group({
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      benefits: ['', Validators.required],
      title: ['', Validators.required],
      jobModality_id: ['', Validators.required],
      salary: ['', Validators.required],
      location: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      scheduledPublishAt: [''],
      logo: [''],
      image: [''],
      video: [''],
      status: [''],
      ofertante_id: ['']
    });
  }

  onSubmit(): void {
    if (this.ofertaForm.valid) {
      console.log(this.ofertaForm.value);
      // Implement submission logic here
    } else {
      this.showSnackBar('Por favor, complete todos los campos requeridos.');
    }
  }

  vistaPrevia(): void {
    console.log('Vista previa', this.ofertaForm.value);
  }

  salir(): void {
    this.router.navigate(['']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.ofertaForm.patchValue({
          logo: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }
}