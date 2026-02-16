import { Component, inject, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service.ts';
import { JsonPipe } from '@angular/common';
import { Serie } from '../../model/serie/serie.model.js';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  seriesService = inject(SeriesService);
  series : Serie[] = [];

  ngOnInit() {
    this.seriesService.findAll().subscribe((series) => {next: this.series = series})
  }
}
