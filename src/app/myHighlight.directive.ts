import { Directive, ElementRef, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
@Directive({ selector: '[myHighlight]' })

export class HighlightDirective implements OnInit {
    @Input() defaultColor: string;
    @Input('myHighlight') highlightColor: string;
    constructor(private el: ElementRef) {
    }
    ngOnInit() {
        if (this.highlightColor == undefined) {
            this.highlight(null)

        }
    }
    ngOnChanges(changes: SimpleChanges) {


        this.highlight(changes.highlightColor.currentValue)


    }
    highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}


