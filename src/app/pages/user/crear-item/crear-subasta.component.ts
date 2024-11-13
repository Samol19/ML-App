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
import { ItemService } from '../../../core/services/item.service';
import { StorageService } from '../../../core/services/storage.service';

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
export class CrearItemComponent implements OnInit {
  ofertaForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService, // Inyectamos el servicio de item
    private storageService: StorageService


  ) { }

  ngOnInit() {
    this.initForm();
    this.isEditMode = false;
  }

  private initForm(): void {
    this.ofertaForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      img: [''],
      init_price: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      user_id: ['',Validators.required]

    });
  }

  onSubmit(): void {

    const userid = this.storageService.getAuthData()?.user_id;
    if (userid) {
      // Asigna el user_id al formulario antes de enviarlo
      this.ofertaForm.patchValue({ user_id: userid });
    }
  
    if (this.ofertaForm.valid) {
      // Llama al servicio de ItemService para crear el item
      this.itemService.createItem(this.ofertaForm.value).subscribe({
        next: (response) => {
          this.showSnackBar('Ítem creado exitosamente');
          this.router.navigate(['/home']); // Cambia a la ruta deseada
        },
        error: (err) => {
          console.error(err);
          this.showSnackBar('Error al crear el ítem');
        }
      });
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
          img: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }
}