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
  sanitizedContent!: SafeHtml;

  constructor( private formbuilder:FormBuilder, private sanitizer: DomSanitizer){
    this.infoForm= this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]], 
    })
      
  }
    // Méthode pour nettoyer et sécuriser les données
    sanitizeFormData(data: { name: string; email: string; password: string }) {
      return {
        name: this.sanitizeInput(data.name),
        email: this.sanitizeInput(data.email),
        password: this.sanitizeInput(data.password), 
      };
    }

    // Méthode de sanitization
  sanitizeInput(input: string): string {
    let sanitized = this.sanitizer.sanitize(SecurityContext.HTML, input);
    // Sanitization en mode HTML
    if (sanitized) {
      sanitized = sanitized.replace(/<script[^>]*?>.*?<\/script>/gi, ''); // Supprime les balises <script>
      sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, ''); // Supprime toutes les autres balises HTML
    }
    return sanitized ? this.escapeHtml(sanitized) : '';

  }
  escapeHtml(input: string): string {
    // Remplacer les caractères spéciaux par leurs entités HTML
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
