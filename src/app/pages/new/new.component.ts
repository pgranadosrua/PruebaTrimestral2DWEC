import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SeriesService } from '../../services/series.service.ts';
import { Serie } from '../../model/serie/serie.model.js';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  seriesService = inject(SeriesService);
  router = inject(Router)

  serieNueva!: Serie;

  miFormulario = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    channel: new FormControl<string>('', [Validators.required]),
    rating: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]),
  });

  get formularioValido() {
    return this.miFormulario.valid;
  }

  alEnviar() {
    this.seriesService.insertOne(this.convertirFormularioASerie()).subscribe((serie) => {next:
      this.serieNueva = serie,
      console.log("Serie creada correctamente" + JSON.stringify(serie))
      setTimeout(() => {
          this.router.navigate(['/home']);
        }, 5000);});
    this.miFormulario.reset();



  }

  convertirFormularioASerie() {
    const serieNueva: Serie = {
      title: this.miFormulario.value.title ?? '',
      creator: '',
      rating: this.miFormulario.value.rating ?? 0,
      dates: '',
      image: '',
      channel: this.miFormulario.value.channel ?? '',
    };
    return serieNueva;
  }
}
