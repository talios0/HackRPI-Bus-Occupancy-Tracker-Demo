"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var AppComponent = /** @class */ (function () {
    function AppComponent(_document) {
        this._document = _document;
        this.title = 'hackrpi-covid';
    }
    AppComponent.prototype.ngOnInit = function () {
        var selectedSeats = [];
        this._document.body.style.fontFamily = "Roboto";
        this._document.body.style.background = "radial-gradient(circle, rgba(19,12,157,1) 0%, rgba(113,43,233,1) 100%)";
        var seatHolder = document.getElementsByClassName("busSeats")[0];
        for (var i = 0; i < 9; i++) {
            var rowSeparator = document.createElement("div");
            rowSeparator.id = "row-" + i;
            rowSeparator.className = "row";
            rowSeparator.style.display = "flex";
            rowSeparator.style.width = "100%";
            rowSeparator.style.margin = "0.25rem";
            for (var j = 0; j < 2; j++) {
                var seatSeparator = document.createElement("div");
                seatSeparator.id = "separator-" + j;
                seatSeparator.style.display = "flex";
                seatSeparator.style.flexDirection = "row";
                seatSeparator.style.justifyContent = "space-around";
                seatSeparator.style.width = "100%";
                var _loop_1 = function () {
                    var div = document.createElement("div");
                    div.id = "seat-" + i + "-" + j + "-" + k;
                    div.className = "seat side" + j;
                    div.style.width = "4rem";
                    div.style.height = "2rem";
                    div.dataset.occupied = "true";
                    if (i == 0) {
                        div.dataset.occupied = "false";
                        div.style.background = "green";
                        div.addEventListener("click", function () {
                            console.log(div.dataset.occupied);
                            var foundSeat = true;
                            if (div.dataset.occupied == "true")
                                return;
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
                    else if (i % 2 == 1)
                        div.style.background = "red";
                    else
                        div.style.background = "blue";
                    seatSeparator.appendChild(div);
                };
                for (var k = 0; k < 1; k++) {
                    _loop_1();
                }
                rowSeparator.append(seatSeparator);
            }
            seatHolder.append(rowSeparator);
        }
        var submit = document.getElementsByClassName("submit")[0];
        submit.addEventListener("click", function () {
            for (var i = 0; i < selectedSeats.length; i++) {
                if (selectedSeats[i] == null)
                    continue;
                selectedSeats[i].style.background = "blue";
                selectedSeats[i].dataset.occupied = "true";
                var occupants = document.getElementById("occupants");
                occupants.textContent = (parseInt(occupants.textContent) + 1).toString();
            }
            selectedSeats = [];
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.sass']
        }),
        __param(0, core_1.Inject(common_1.DOCUMENT))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
