import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookRide } from 'src/models/book-ride';
import { OfferedRide } from 'src/models/offered-ride';
import { User } from 'src/models/user';
import * as Notiflix from 'notiflix';

import { RideServiceService } from '../services/RideService.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  constructor(
    private rideService: RideServiceService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {
    this.activeUser = JSON.parse(localStorage.getItem("user")!);
  }

  //Arrays of Previously Offered Rides and Booked Rides
  PreviouslyOfferedRides!: OfferedRide[]
  PreviouslyBookedRides!: BookRide[]
  activeUser!: User;
  offeredRidesCount: boolean = false
  bookRidesCount: boolean = false


  ngOnInit(): void {
    //Notiflix.Loading.dots("Loading");
    this.spinner.show()
    //Getting the Previously Booked Rides
    this.rideService.GetBookedRide(this.activeUser.userId!).subscribe((data) => {
      this.PreviouslyBookedRides = data.response;
      if (this.PreviouslyBookedRides == null) {
        this.bookRidesCount = true;
      }
    })

    // Getting the Previously Offered Rides
    this.rideService.GetOfferedRide(this.activeUser.userId!).subscribe((data) => {
      this.PreviouslyOfferedRides = data.response;
      if (this.PreviouslyOfferedRides == null) {
        this.offeredRidesCount = true;
      }
      //Notiflix.Loading.remove(2000);
      // this.spinner.hide()
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 3000);
    })
  }

  
  // Method which Logs out the user and clears the Local Storage
  Logout() {
    localStorage.clear();
  }



}
