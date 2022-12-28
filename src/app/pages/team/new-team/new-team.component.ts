import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TeamsService } from 'src/app/services/teams/teams.service';
import swal from 'sweetalert2';
import { Team } from '../../../Interfaces/team';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css'],
})
export class NewTeamComponent implements OnInit {
  teamNameControl = new FormControl('', Validators.required);
  teamStarDateControl = new FormControl('', Validators.required);

  constructor(
    private teamService: TeamsService,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  saveNewTeam(): void {
    if (
      this.teamNameControl.status === 'VALID' &&
      this.teamStarDateControl.status === 'VALID'
    ) {
      const team: Team = {
        id: null,
        idUser: this.auth.id,
        name: this.teamNameControl.value,
        dateJoin: new Date(this.teamStarDateControl.value),
      };
      delete team.id;

      this.teamService.save(team).subscribe((result) => {
        if (result) {
          this.router.navigate(['/teams']);
        }
      });
    } else {
      swal.fire({
        title: 'Error!',
        text: 'Invalid data!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }
}
