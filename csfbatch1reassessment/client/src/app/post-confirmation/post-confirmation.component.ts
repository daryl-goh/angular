import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-confirmation',
  templateUrl: './post-confirmation.component.html',
  styleUrls: ['./post-confirmation.component.css']
})
export class PostConfirmationComponent {

  posting_id!: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router){
      this.posting_id = this.activatedRoute.snapshot.params['posting_id'];
    }

  backHome() {
    this.router.navigate([''])
  }

  

}
