import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

import { Sort } from "../utility/sort";

@Directive({
    selector: '[appSort]',
})
export class SortDirective {

    @Input() appSort: Array<any> | undefined;
    constructor(private renderer: Renderer2, private targetElement: ElementRef) {
        
    }

    @HostListener("click")

    sortData() {

        const sort = new Sort();

        const elem = this.targetElement.nativeElement;

        let ele1 : HTMLElement = document.getElementById('name') as HTMLElement;
        let ele2 : HTMLElement = document.getElementById('symbol') as HTMLElement;
        let ele3 : HTMLElement = document.getElementById('dailyLow') as HTMLElement;
        let ele4 : HTMLElement = document.getElementById('dailyHigh') as HTMLElement;
        let ele5 : HTMLElement = document.getElementById('gain/loss') as HTMLElement;
        
        ele1.setAttribute('active','false')
        ele2.setAttribute('active','false')
        ele3.setAttribute('active','false')
        ele4.setAttribute('active','false')
        ele5.setAttribute('active','false')
        const order = elem.getAttribute("data-order");

        const type = elem.getAttribute("data-type");

        const property = elem.getAttribute("data-name");
        
        const active = elem.getAttribute('active');

        elem.setAttribute('active','true');

        if (order === "desc") {

            this.appSort?.sort(sort.startSort(property, order, type));
            elem.setAttribute("data-order", "asc");
        }
        else {
            this.appSort?.sort(sort.startSort(property, order, type));
            elem.setAttribute("data-order", "desc");
        }
    }
}