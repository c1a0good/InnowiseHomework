const axios = require('axios');

describe('FakeStore API Product Tests', () => {
  let products;

  beforeAll(async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  });

  test('API should return status code 200', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    expect(response.status).toBe(200);
  });

  test('Each product should have a non-empty title', () => {
    const productsWithEmptyTitles = products.filter(product => !product.title || product.title.trim() === '');
    
    if (productsWithEmptyTitles.length > 0) {
      console.log('Products with empty titles:', productsWithEmptyTitles);
    }
    
    expect(productsWithEmptyTitles).toHaveLength(0);
  });

  test('Each product should have a non-negative price', () => {
    const productsWithNegativePrices = products.filter(product => product.price < 0);
    
    if (productsWithNegativePrices.length > 0) {
      console.log('Products with negative prices:', productsWithNegativePrices);
    }
    
    expect(productsWithNegativePrices).toHaveLength(0);
  });

  test('Each product rating should not exceed 5', () => {
    const productsWithInvalidRatings = products.filter(
      product => product.rating && product.rating.rate > 5
    );
    
    if (productsWithInvalidRatings.length > 0) {
      console.log('Products with invalid ratings:', productsWithInvalidRatings);
    }
    
    expect(productsWithInvalidRatings).toHaveLength(0);
  });

  test('Generate list of products with defects', () => {
    const defectiveProducts = products.filter(product => {
      const hasEmptyTitle = !product.title || product.title.trim() === '';
      const hasNegativePrice = product.price < 0;
      const hasInvalidRating = product.rating && product.rating.rate > 5;
      
      return hasEmptyTitle || hasNegativePrice || hasInvalidRating;
    });

    if (defectiveProducts.length > 0) {
      console.log('Products with defects:', JSON.stringify(defectiveProducts, null, 2));
    }
    
    // This test is informative and will always pass
    expect(true).toBe(true);
  });
}); 