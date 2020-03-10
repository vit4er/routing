import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private route: ActivatedRoute,
    private serversService: ServersService
  ) {
  }

  ngOnInit() {
    this.server = this.serversService.getServer(+this.route.snapshot.params.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams.subscribe((q: Params) => {
      if (q !== null) {
        this.allowEdit = q.allowEdit === '1';
      }
    });
    this.route.fragment.subscribe((f) => {
      if (f !== null) {
        console.log(f);
      }
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
