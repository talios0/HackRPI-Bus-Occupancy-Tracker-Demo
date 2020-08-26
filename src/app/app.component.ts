import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { convertPropertyBindingBuiltins } from '@angular/compiler/src/compiler_util/expression_converter';
import { NgModuleResolver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor (@Inject(DOCUMENT) private _document) {}
  ngOnInit() {
    var selectedSeats = [];
    this._document.body.style.fontFamily = "Roboto";
    this._document.body.style.background = "radial-gradient(circle, rgba(19,12,157,1) 0%, rgba(113,43,233,1) 100%)";
    
    var seatHolder = document.getElementsByClassName("busSeats")[0];
    for (var i = 0; i < 9; i++) {
      let rowSeparator = document.createElement("div");
      rowSeparator.id ="row-"+i;
      rowSeparator.className = "row";
      rowSeparator.style.display = "flex";
      rowSeparator.style.width = "100%";
      rowSeparator.style.margin = "0.25rem";
        for (var j = 0; j < 2; j++) {
          let seatSeparator = document.createElement("div");
          seatSeparator.id = "separator-"+j;
          seatSeparator.style.display = "flex";
          seatSeparator.style.flexDirection = "row";
          seatSeparator.style.justifyContent = "space-around";
          seatSeparator.style.width = "100%";
            for (var k = 0; k < 1; k++) {
                let div = document.createElement("div");
                div.id = "seat-"+i+"-"+j+"-"+k;
                div.className = "seat side"+j;
                div.style.width="4rem";
                div.style.height="2rem";
                div.dataset.occupied = "true";
                if (i == 0) {
                  div.dataset.occupied = "false";
                  div.style.background = "green";
                  div.addEventListener("click", function() {
                    console.log(div.dataset.occupied);
                    var foundSeat = true;
                    if (div.dataset.occupied == "true") return;
                    for (var l = 0; l < selectedSeats.length; l++) {
                      if (selectedSeats[l] == div) {
                        selectedSeats[l] = null;
                        console.log(selectedSeats);
                        div.style.background = "green";
                        foundSeat = false;
                        break;
                      }
                    }
                    if (foundSeat) { 
                      div.style.background = "lime";  
                      selectedSeats.push(div);
                    }

                  });
                }
                else if (i%2 == 1) div.style.background="red";
                else div.style.background="blue";
                seatSeparator.appendChild(div);
            }
            rowSeparator.append(seatSeparator);
        }
        seatHolder.append(rowSeparator);
    }

    var submit = document.getElementsByClassName("submit")[0];
    submit.addEventListener("click", function() {
      for (var i = 0; i < selectedSeats.length; i++) {
        if (selectedSeats[i] == null) continue;
        selectedSeats[i].style.background = "blue";
        selectedSeats[i].dataset.occupied = "true";
        var occupants = document.getElementById("occupants");
        occupants.textContent = (parseInt(occupants.textContent) + 1).toString();
      }
      selectedSeats = [];
    });

  }

  title = 'hackrpi-covid';
}

