export enum Button {
  ORDERING = 'Proceed To Checkout',
  ADD = 'ADD TO CARD',
  REMOVE = 'REMOVE FROM CARD',
  DETAILS = 'DETAILS',
  BUY = 'BUY NOW',
  CLEAR_INPUT = 'CLEAR',
  COUPON_APPLY = 'APPLY',
  COUPON_ADD = 'ADD',
  CONFIRM = 'CONFIRM',
}

export enum Title {
  BASKET_HEADER__TITLE = 'Card Totals',
  PRODUCTS = 'Products: ',
  CARD_SUBTOTAL_MONEY = 'Subtotal:',
  CARD_TOTAL_MONEY = 'Total:',
  HEADER_TOTAL_MONEY = 'Card total:',
  PRODUCT_DISCOUNT = ' OFF',
  DISCOUNT = 'Discount:',
  STOCK = 'Stock: ',
  CATEGORY = 'Category: ',
  BRAND = 'Brand: ',
  DESCRIPTION = 'Description:',
  DETAILS_DISCOUNT = 'Discount Percentage: ',
}

export enum Symbol {
  DISCOUNT = '%',
  CURRENCY = '$',
  SUBTRACT = '(-)',
  MINUS = '-',
  PLUS = '+',
  MANDATORY = '*',
}

export enum Events {
  CLICK = 'click',
  CHANGE = 'change',
  INPUT = 'input',
}

export enum DefaultValues {
  PAGINATION_LIMIT = 3,
  PAGINATION_PAGE = 1,
}

export enum LSKeys {
  basket = 'basketHS',
  coupons = 'couponsHS',
  modal = 'modalHS',
}
