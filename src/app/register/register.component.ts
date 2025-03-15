import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const isMatch = passwordControl.value === confirmPasswordControl.value;
    return isMatch ? null : { passwordMismatch: true };
  };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formularioRegister: FormGroup;
  registerService = inject(RegisterService);
  constructor(private form: FormBuilder,  private router: Router){
    this.formularioRegister = this.form.group({
      name: ['',[Validators.required]],
      age: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
      passwordVerification: ['',[Validators.required]],
    }, { validators: passwordMatchValidator('password', 'passwordVerification') });
  }
  hasError(controlName:string, errorType:string){
    return this.formularioRegister.get(controlName)?.hasError(errorType) && this.formularioRegister.get(controlName)?.touched;  
  }
  Register(){
    if (this.formularioRegister.invalid) {
      this.formularioRegister.markAllAsTouched();
      return;
    }
    const registerData = this.formularioRegister.value;
    
    this.registerService.RegisterUser(registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro');
      }
    });
  }

}
