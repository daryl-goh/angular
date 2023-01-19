import { Component, OnInit } from '@angular/core';
import { Room, RoomList } from './rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  hotelName = 'Hilton Hotel'

  numberOfRooms = 10;

  hideRooms = false;

  rooms: Room = {
    totalRooms:20,
    availableRooms: 10,
    bookedRooms: 5
  };

  roomList: RoomList[] = [ 
   {
    roomNumber: 1,
    roomType: 'Deluxe Room',
    amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    price: 500,
    photos: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    checkinTime: new Date('11-Nov-2023'),
    checkoutTime: new Date('12-Nov-2023'),
  },
  {
    roomNumber: 2,
    roomType: 'Deluxe Room',
    amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    price: 1000,
    photos: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    checkinTime: new Date('11-Nov-2023'),
    checkoutTime: new Date('12-Nov-2023'),
  },
  {
    roomNumber: 3,
    roomType: 'Suite Room',
    amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    price: 15000,
    photos: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    checkinTime: new Date('11-Nov-2023'),
    checkoutTime: new Date('12-Nov-2023'),
  },

  ];

  constructor() { }

  ngOnInit(): void {} 

  toggle() {
    this.hideRooms =!this.hideRooms;
  }

}
