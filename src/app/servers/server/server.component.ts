import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

export interface Server {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: Server = {} as Server;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serversService: ServersService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params.id);
    });
  }

  onEditServerClick() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
