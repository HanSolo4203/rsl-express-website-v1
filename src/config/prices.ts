export type PriceUnit = "each" | "kg";
export type Category = "FrontOfHouse" | "Housekeeping" | "Towels" | "Kitchen" | "Other";

export type PriceItem = {
  code: string; // stable key used in forms and calc
  name: string; // display label
  category: Category;
  unit: PriceUnit;
  price: number; // ZAR per unit
};

export const PRICE_VERSION = "2025-pricelist";

export const PER_KG = {
  wdif: { code: "kg_wdif", name: "Wash, Dry, Iron, Fold (per kg)", price: 52.80 }, // color normal
  wdf: { code: "kg_wdf", name: "Wash, Dry, Fold (per kg)", price: 37.40 },
  wdifColor: { code: "kg_wdif_color", name: "Wash, Dry, Iron, Fold — Color Separated (per kg)", price: 60.72 },
  wdfColor: { code: "kg_wdf_color", name: "Wash, Dry, Fold — Color Separated (per kg)", price: 43.01 },
} as const;

export const PRICE_LIST: PriceItem[] = [
  // Front of House
  { code: "napkins", name: "Napkins", category: "FrontOfHouse", unit: "each", price: 3.10 },
  { code: "waiter_apron", name: "Waiter Aprons", category: "FrontOfHouse", unit: "each", price: 5.00 },
  { code: "waiter_bib", name: "Waiter Bibs", category: "FrontOfHouse", unit: "each", price: 5.00 },
  { code: "round_tbl_sm", name: "Round Tablecloths - Small", category: "FrontOfHouse", unit: "each", price: 6.00 },
  { code: "round_tbl_md", name: "Round Tablecloths - Medium", category: "FrontOfHouse", unit: "each", price: 6.50 },
  { code: "round_tbl_lg", name: "Round Tablecloths - Large", category: "FrontOfHouse", unit: "each", price: 7.50 },
  { code: "tbl_sm", name: "Tablecloths - Small", category: "FrontOfHouse", unit: "each", price: 6.00 },
  { code: "tbl_md", name: "Tablecloths - Medium", category: "FrontOfHouse", unit: "each", price: 6.50 },
  { code: "tbl_lg", name: "Tablecloths - Large", category: "FrontOfHouse", unit: "each", price: 7.50 },
  { code: "overlay_sm", name: "Overlays - Small", category: "FrontOfHouse", unit: "each", price: 6.00 },
  { code: "overlay_md", name: "Overlays - Medium", category: "FrontOfHouse", unit: "each", price: 6.50 },
  { code: "overlay_lg", name: "Overlays - Large", category: "FrontOfHouse", unit: "each", price: 7.50 },
  { code: "overlay_xl", name: "Overlays - Extra Large", category: "FrontOfHouse", unit: "each", price: 8.80 },

  // Housekeeping (sheets, pillow cases, duvet covers)
  { code: "pc_continental", name: "Pillow Cases - Continental (Square)", category: "Housekeeping", unit: "each", price: 5.80 },
  { code: "pc_standard", name: "Pillow Cases - Standard", category: "Housekeeping", unit: "each", price: 5.50 },
  { code: "fitted_king", name: "Fitted Sheet - King", category: "Housekeeping", unit: "each", price: 11.70 },
  { code: "fitted_queen", name: "Fitted Sheet - Queen", category: "Housekeeping", unit: "each", price: 10.30 },
  { code: "fitted_double", name: "Fitted Sheet - Double", category: "Housekeeping", unit: "each", price: 9.20 },
  { code: "fitted_three_quarter", name: "Fitted Sheet - 3/4", category: "Housekeeping", unit: "each", price: 9.00 },
  { code: "fitted_single", name: "Fitted Sheet - Single", category: "Housekeeping", unit: "each", price: 7.50 },
  { code: "fitted_cot", name: "Fitted Sheet - Cot", category: "Housekeeping", unit: "each", price: 6.10 },
  { code: "flat_king", name: "Flat Sheet - King", category: "Housekeeping", unit: "each", price: 11.70 },
  { code: "flat_queen", name: "Flat Sheet - Queen", category: "Housekeeping", unit: "each", price: 10.30 },
  { code: "flat_double", name: "Flat Sheet - Double", category: "Housekeeping", unit: "each", price: 9.20 },
  { code: "flat_three_quarter", name: "Flat Sheet - 3/4", category: "Housekeeping", unit: "each", price: 9.00 },
  { code: "flat_single", name: "Flat Sheet - Single", category: "Housekeeping", unit: "each", price: 7.50 },
  { code: "flat_cot", name: "Flat Sheet - Cot", category: "Housekeeping", unit: "each", price: 6.10 },
  { code: "duvet_cov_king", name: "Duvet Covers - King", category: "Housekeeping", unit: "each", price: 17.40 },
  { code: "duvet_cov_queen", name: "Duvet Covers - Queen", category: "Housekeeping", unit: "each", price: 15.20 },
  { code: "duvet_cov_double", name: "Duvet Covers - Double", category: "Housekeeping", unit: "each", price: 13.00 },
  { code: "duvet_cov_single", name: "Duvet Covers - Single", category: "Housekeeping", unit: "each", price: 10.80 },
  { code: "duvet_cov_cot", name: "Duvet Covers - Cot", category: "Housekeeping", unit: "each", price: 8.60 },

  // Towels & related
  { code: "towel_xl", name: "Towels - Extra Large", category: "Towels", unit: "each", price: 17.10 },
  { code: "towel_pool", name: "Towels - Pool Towel", category: "Towels", unit: "each", price: 17.10 },
  { code: "towel_bath_sheet", name: "Towels - Bath Sheet", category: "Towels", unit: "each", price: 12.00 },
  { code: "towel_bath", name: "Towels - Bath Towel", category: "Towels", unit: "each", price: 9.80 },
  { code: "towel_hand", name: "Towels - Hand Towel", category: "Towels", unit: "each", price: 7.50 },
  { code: "towel_gym", name: "Towels - Gym Towel", category: "Towels", unit: "each", price: 7.50 },
  { code: "face_cloth", name: "Towels - Face Cloth", category: "Towels", unit: "each", price: 4.30 },
  { code: "head_band", name: "Towels - Head Band", category: "Towels", unit: "each", price: 3.50 },
  { code: "bath_mat", name: "Bath Mats", category: "Towels", unit: "each", price: 6.60 },
  { code: "spa_gown", name: "Spa Gown", category: "Towels", unit: "each", price: 17.90 },
  { code: "blanket", name: "Blanket", category: "Towels", unit: "each", price: 12.70 },
  { code: "cushion_cover", name: "Cushion Cover", category: "Towels", unit: "each", price: 13.20 },
  { code: "curtain", name: "Curtain", category: "Towels", unit: "each", price: 165.00 },
  { code: "duvet_inner_king", name: "Duvet Inner - King", category: "Towels", unit: "each", price: 55.00 },
  { code: "duvet_inner_single", name: "Duvet Inner - Single", category: "Towels", unit: "each", price: 33.00 },

  // Kitchen
  { code: "chef_jacket", name: "Chefs Jackets", category: "Kitchen", unit: "each", price: 6.60 },
  { code: "chef_trousers", name: "Chefs Trousers", category: "Kitchen", unit: "each", price: 6.60 },
  { code: "chef_apron", name: "Chefs Aprons", category: "Kitchen", unit: "each", price: 6.10 },
  { code: "chef_tshirt", name: "Chefs T-Shirts", category: "Kitchen", unit: "each", price: 5.30 },
  { code: "kitchen_cloth", name: "Kitchen Cloths", category: "Kitchen", unit: "each", price: 5.00 },
];

export type ItemCode = typeof PRICE_LIST[number]["code"];

export const PRICE_INDEX = Object.fromEntries(PRICE_LIST.map(i => [i.code, i]));
