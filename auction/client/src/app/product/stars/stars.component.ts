import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'nga-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {
  get stars(): boolean[] {
    return this._stars;
  }

  set stars(value: boolean[]) {
    this._stars = value;
  }
  private _rating: number;
  private _stars: boolean[];

  private maxStars = 5;

  @Input() readonly = true;

  @Input() get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value || 0;
    this._stars = Array(this.maxStars).fill(true, 0, this.rating);
  }

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  fillStarsWithColor(index: number) {

    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

}
