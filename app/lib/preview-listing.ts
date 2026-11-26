export type PreviewListing = {
  name: string;
  shortName: string;
  phone: string;
  area: string;
  address: string;
  map: string;
  boltFood?: string;
  intro?: string;
  source?: string;
  sourceName?: string;
  hero?: string;
  menu?: readonly (readonly (string | number)[])[];
};
