import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})

export class InputUserDataFormComponent implements OnInit {
    registered = false;
    guid:string;
    submitted = false;
    userForm: FormGroup;
    serviceErrors:any = {};
  
    constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router)
    {

      this.http.get('/api/v1/generate_uid').subscribe((data:any)=>{
        this.guid = data.guid;
      }, error => {
        console.log('Error while retrieving guid',error);
      })
  
    }
  
    invalidFirstName()
    {
      return (this.submitted && this.userForm.controls.first_name.errors != null);
    }
  
    invalidLastName()
    {
      return (this.submitted && this.userForm.controls.last_name.errors != null);
    }
  
    invalidEmail()
    {
      return (this.submitted && this.userForm.controls.email.errors != null);
    }
  
    invalidZipcode()
    {
      return (this.submitted && this.userForm.controls.zipcode.errors != null);
    }
  
    invalidPassword()
    {
      return (this.submitted && this.userForm.controls.password.errors != null);
    }
  
    ngOnInit()
    {
      this.userForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      });
    }
  
    onSubmit()
    {
      this.submitted = true;
  
      if(this.userForm.invalid == true)
      {
        return;
      }
      else
      {
        let data:any = Object.assign({guid:this.guid},this.userForm.value);

        this.http.post('/api/v1/customer',data).subscribe((res:any)=>{

          console.log(res)

          let path = '/user/' + res.customer.uid;

          this.router.navigate([path])
        },error=>{
          console.log(error)
        });

        this.registered = true;
      }
    }
  
  };
