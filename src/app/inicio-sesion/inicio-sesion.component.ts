import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InicioSesionService } from '../Services/inicio-sesion.service';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  
  load: boolean = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: InicioSesionService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    
    });
  }

async onSubmit() {
  
  if (this.form.valid) {

    let data = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

  this.load = false;
  this.client.postRequest('http://localhost:5000/api/v01/user/inicio-sesion', data).subscribe(
  
  (respuesta: any) => {

    this.route.navigate(['/inicio2']);
    
  },

(error) => {
  console.log(error.status)

})

} else{

  console.log("Form error");
}

  }
  async onSubmitToken() {

        if (this.form.valid) {

          this.client.postRequest('http://localhost:5000/api/v01/user/login', {
            email: this.form.value.email,
            password: this.form.value.password
          }).subscribe(

            (response: any) => {
              console.log(response);
              this.auth.login(response.token)
              this.auth.setCourrentUser(response.name)
              this.route.navigate( ['/']);
          }),

          (error) => {

            console.log(error.status);

          };
        } else {

          console.log("Form error");
        }
      }
}