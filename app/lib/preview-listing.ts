export type PreviewListing = {
  name: string;
  shortName: string;
  area: string;
  address: string;
  phone: string;
  map: string;
  rating: string;
  reviews: string;
  menuKind: string;
  menuSource: string;
  dishes: string[];
};

export function phoneHref(listing: PreviewListing) {
  return 'tel:' + listing.phone.replace(/\s/g, '');
}
