import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-top',
  templateUrl: './btn-top.component.html',
  styleUrls: ['./btn-top.component.scss']
})
export class BtnTopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  backToTop(){
    window.scrollTo(0,0);
  }
}
