import { SearchPage } from './search.po';
import {browser} from 'protractor';

describe('ngAuction search', () => {
  let searchPage: SearchPage;

  beforeEach(() => {
    searchPage = new SearchPage();
  });

  it('should perform the search for products that cost from $10 to $100', async () => {
    searchPage.navigateToLandingPage();
    let url = await browser.getCurrentUrl();
    expect(url).toContain('/categories/all');

    searchPage.performSearch(10, 100);
    url = await browser.getCurrentUrl();
    expect(url).toContain('/search?minPrice=10&maxPrice=100');

    const firstProductPrice = await searchPage.getFirstProductPrice();
    expect(firstProductPrice).toBeGreaterThan(10);
    expect(firstProductPrice).toBeLessThan(100);
  });
});
