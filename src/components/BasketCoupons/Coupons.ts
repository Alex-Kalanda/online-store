import CouponsDatabase from './CouponsDatabase';
import ICoupon from './BasketCoupons.interface';
import { LSKeys } from '../../common.types/enums';

class Coupons {
  private data: ICoupon[] = CouponsDatabase;

  public activeCoupons = this.getAllActiveCoupons();

  public getAllCoupons(): ICoupon[] {
    return this.data;
  }

  public getAllActiveCoupons(): ICoupon[] {
    return localStorage.getItem(LSKeys.coupons) ? JSON.parse(localStorage.getItem(LSKeys.coupons) as string) : [];
  }

  public getActualDiscont(): number {
    return this.getAllActiveCoupons().reduce((acc, coupon) => acc + coupon.discount, 0);
  }

  public getCouponByValue(name: string): ICoupon {
    return this.data.find((coupon) => coupon.name === name) as ICoupon;
  }

  public removeActiveCoupon(name: string): void {
    this.activeCoupons = this.activeCoupons.filter((coupon) => coupon.name !== name);
    localStorage.setItem(LSKeys.coupons, JSON.stringify(this.activeCoupons));
  }

  public setActiveCoupon(value: string): void {
    const coupon = this.getCouponByValue(value);
    this.activeCoupons.push(coupon);
    localStorage.setItem(LSKeys.coupons, JSON.stringify(this.activeCoupons));
  }

  public isExist(value: string): boolean {
    return !!this.data.find((coupon) => coupon.name === value);
  }

  public isActive(value: string):boolean {
    return !!this.activeCoupons.find((coupon) => coupon.name === value);
  }

  public getCouponsAsString(): string {
    return this.data.map((coupon: ICoupon) => coupon.name).join(', ');
  }
}

export default Coupons;
