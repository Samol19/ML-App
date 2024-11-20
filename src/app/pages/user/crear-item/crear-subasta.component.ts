import { MaterialModule } from '../../../material/material.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../../core/services/item.service';
import { StorageService } from '../../../core/services/storage.service';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../shared/models/category-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-subasta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialModule,
    MatOption
  ],
  templateUrl: './crear-subasta.component.html',
  styleUrls: ['./crear-subasta.component.css']
})
export class CrearItemComponent implements OnInit {
  ofertaForm!: FormGroup;
  isEditMode: boolean = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private storageService: StorageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadCategories();
    this.isEditMode = false;
  }

  private initForm(): void {
    this.ofertaForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      img: [''],
      init_price: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      user_id: ['', Validators.required]
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log(categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.showSnackBar('Error al cargar las categorías');
      }
    });
  }

  onSubmit(): void {
    const userid = this.storageService.getAuthData()?.user_id;
    if (userid) {
      this.ofertaForm.patchValue({ user_id: userid });
    }
  
    if (this.ofertaForm.valid) {
      this.itemService.createItem(this.ofertaForm.value).subscribe({
        next: (response) => {
          this.showSnackBar('Ítem creado exitosamente');
          this.router.navigate(['/home']);
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