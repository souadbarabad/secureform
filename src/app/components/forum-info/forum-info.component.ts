import { Component,SecurityContext } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-forum-info',
  templateUrl: './forum-info.component.html',
  styleUrls: ['./forum-info.component.css'],
})
export class ForumInfoComponent {

  infoForm !: FormGroup ;

  constructor( private formbuilder:FormBuilder, private sanitizer: DomSanitizer){
    this.infoForm= this.formbuilder.group({ 
      name: ['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]], 
    })
      
  }
    sanitizeFormData(data: { name: string; email: string; password: string }) {
      return {
        name: this.sanitizeInput(data.name),
        email: this.sanitizeInput(data.email),
        password: this.sanitizeInput(data.password), 
      };
    }

  sanitizeInput(input: string): string {
    let sanitized = this.sanitizer.sanitize(SecurityContext.HTML, input);
    if (sanitized) {
      sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, ''); 
    }
    return sanitized ? sanitized : '';
  }

  submitForm(){
    if(this.infoForm.valid){
      let textbrut =this.infoForm.value;
      console.log('Données brute :', textbrut);
      const sanitizedData = this.sanitizeFormData(textbrut);
      console.log('Données sécurisées:', sanitizedData);
    } else {
      console.log('Formulaire invalide');
    }
  }

}
