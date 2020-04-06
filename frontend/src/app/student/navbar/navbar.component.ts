import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Sticky Navbar
    const navbar = document.getElementById('navbar-main');
    const header = document.getElementById('navbar-head');
    const sticky = navbar.offsetTop;
    function updateNavbar() {
      if (window.pageYOffset > sticky) {
          navbar.classList.add('sticky');
          header.classList.add('sticky');
      } else {
          navbar.classList.remove('sticky');
          header.classList.remove('sticky');
      }
    }

    window.onscroll = () => { updateNavbar(); };
  }

}
