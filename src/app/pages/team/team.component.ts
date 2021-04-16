import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from 'src/app/Interfaces/team';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'dateJoin'];
  dataSource = new MatTableDataSource<Team>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private team: TeamsService) {}

  ngOnInit(): void {
    this.team.getTeamsByUserId().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
