import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from './../../_service/persona.service';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Persona } from 'src/app/_model/persona';
import { MatSnackBarModule } from '@angular/material/';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private personaService: PersonaService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.personaService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(idPersona: number) {
    this.personaService.eliminar(idPersona).subscribe(() => {
      this.personaService.listar().subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('Se eliminó');
      })
    });
  }

}
