import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/user-info-model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})
export class DisplayUserDataComponent implements OnInit {

	
	constructor(
		private route:ActivatedRoute,
		private http:HttpClient
	) { }

	private subscriber: any;
	user:UserInfoModel;

	ngOnInit()
	{
		this.subscriber = this.route.params.subscribe(params => {
	       
	       this.http.get('/api/v1/customer/' + params.uid).subscribe((data:any) => {
				console.log(data)
				this.user = new UserInfoModel(data.customer);
		    });
	    });
	}

}
