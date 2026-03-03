import { Seller } from "../aggregates/Seller.js";

export class SellerMustBeUnbannedPolicy{
	static enforce(seller: Seller){
		if(seller.isBanned)

	}

}
