import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges, OnInit,
  SimpleChange
} from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { startWith} from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import {BidMessage, BidService, Product, } from '../../shared/services';
import {Review, ReviewService} from '../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'nga-product-detail',
  styleUrls: [ './product-detail.component.scss' ],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;
  @Input() product: Product;

  isReviewHidden = true;
  localID: number;
  reviews: Review[];
  newRating: number;
  newComment: string;


  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly bidService: BidService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {
  }

  ngOnInit() {
    this.latestBids$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.bidService.priceUpdates$.pipe(startWith<BidMessage|null>(null)),
      (product, bid) =>  bid && bid.productId === product.id ? bid.price : product.price
    );
    this.reviews = this.reviewService.getReviewsForProduct(this.product.id);
    this.localID = +this.route.snapshot.params.productId;

  }

  ngOnChanges({ product }: { product: SimpleChange }) {
    this.productChange$.next(product.currentValue);
    this.reviews = this.reviewService.getReviewsForProduct(this.product.id);
    this.localID = +this.route.snapshot.params.productId;
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }

  addReview() {
    if (this.localID === this.product.id) {
      let review = new Review(0, this.product.id, new Date(), 'Anonymous',
        this.newRating, this.newComment);
      console.log('Adding review ' + JSON.stringify(review));
      this.reviews = [ ...this.reviews, review ];
      this.product.rating = this.averageRating(this.reviews);
      this.resetForm();
    }

  }

  averageRating(reviews: Review[]) {
    let sum = reviews.reduce((average, review) => average + review.rating, 0);
    return sum / reviews.length;
  }


  resetForm() {
    this.newRating = 0;
    this.newComment = '';
    this.isReviewHidden = true;
  }
}
