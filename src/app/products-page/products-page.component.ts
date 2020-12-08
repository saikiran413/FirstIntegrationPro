import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  productdetails: any[] = [];
  sortTypeValue = '';
  sortTypelw = 'lowtohigh';
  sortTypehl = 'hightolow';

  private noOfItemsToShowInitially: number = 12;
  private itemsToLoad: number = 12;
  itemsToShow: any[];
  isFullListDisplayed: boolean = false;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private location: Location) {
    this.activatedRoute.queryParams.subscribe(data => {
      this.sortTypeValue = data.sortType;
    });
  }

  ngOnInit() {
    this.productService.getProduct().subscribe(data => this.productdetails = data);
    this.itemsToShow = this.productdetails.slice(0, this.noOfItemsToShowInitially);
    this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
    if (this.sortTypeValue == this.sortTypelw) {
      this.itemsToShow = this.itemsToShow.sort((low, high) => low.Price - high.Price);
    } else {
      this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
    }
  }

  sort(event: any) {
    switch (event.target.value) {
      case 'Low':
        {
          this.itemsToShow = this.itemsToShow.sort((low, high) => low.Price - high.Price);
          const cururl = this.location.path().replace(this.sortTypehl, this.sortTypelw);
          this.location.go(cururl);
          this.sortTypeValue = this.sortTypelw;
          break;
        }
      case 'High':
        {
          this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
          const cururl = this.location.path().replace(this.sortTypelw, this.sortTypehl);
          this.location.go(cururl);
          this.sortTypeValue = this.sortTypehl;
          break;
        }
      default: {
        this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
        break;
      }
    }
    return this.itemsToShow;
  }


  onScroll() {
    if (this.noOfItemsToShowInitially <= this.productdetails.length) {
      this.noOfItemsToShowInitially += this.itemsToLoad;
      this.itemsToShow = this.productdetails.slice(0, this.noOfItemsToShowInitially);
    } else {
      this.isFullListDisplayed = true;
    }
  }
}
