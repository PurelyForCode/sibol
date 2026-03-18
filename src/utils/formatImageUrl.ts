import { imageStorageLocation } from "../compositionRoot.js";

export function formatImageUrl(url: string){
	return `${imageStorageLocation}/${url}`
}
