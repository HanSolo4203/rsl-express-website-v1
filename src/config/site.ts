export const siteConfig = {
  name: "RSL Express",
  tagline: "Professional Linen Services with 24-Hour Turnaround",
  description: "Commercial linen solutions for hospitality with guaranteed 24-hour turnaround and RFID tracking (coming soon).",
  phone: "+27 834537517",
  email: "dylan@rslexpress.com",
  address: "Shop 10, WEX1, 85 Albert Road, Woodstock, Cape Town",
  hours: "Mon–Sun, 6:00 AM – 10:00 PM",
  highlights: [
    "24-hour guaranteed turnaround (collection 11:00, delivery 11:00 next day)",
    "Daily service Monday through Sunday",
    "Emergency service available with 4-hour notice",
    "Professional washing, drying, pressing & packaging",
  ],
  rfid: {
    benefits: [
      "Real-time tracking of every linen item",
      "Automated inventory management (no manual counting)",
      "Instant location identification",
      "Lifecycle reporting (wash counts, rotations, replacement needs)",
      "Dashboard access for management",
      "Loss-prevention alerts for missing items",
      "Automated billing based on processed quantities",
    ],
    timeline: [
      "Weeks 1–8: Software integration",
      "Weeks 6–8: Hardware installation prep",
      "Weeks 9–10: System testing & calibration",
      "Week 11: Staff training",
      "Week 12: Full deployment",
    ],
    statusNote: "Manual tracking in place during RFID rollout; trial service available now.",
  },
  service: {
    schedule: {
      collectionTime: "11:00 AM daily",
      deliveryTime: "11:00 AM next day (24-hour guaranteed)",
      days: "Monday through Sunday",
      emergency: "Emergency service with 4-hour notice",
    },
    categories: {
      bed: ["Flat Sheets (wash/dry/iron/fold)", "Fitted Sheets (preserve elastic)", "Pillowcases (inside-out cleaning)", "Duvet Covers (button/zip care)"],
      bath: ["Bath Towels (high-temp sanitization)", "Hand Towels (separate processing)", "Washcloths (stain inspection/treatment)", "Bath Mats (protect backing)"],
      table: ["Tablecloths (spot treatment, pressing)", "Napkins (color separation, pre-treat)", "Specialty linens (custom handling)"],
    },
    quality: {
      cleanliness: ["Stain removal", "Fresh, clean scent (non-overpowering)", "Lint-free processing/packaging"],
      handling: ["Gentle processing to extend life", "Maintain softness", "Damage-prevention protocols"],
      packaging: ["Organized by category", "Protective wrapping", "Clear labeling & count verification", "Secure delivery containers"],
    },
    equipment: ["Commercial washers", "Speed Queen industrial dryers", "Professional pressing equipment", "Secure transport vehicles"],
    staffing: ["Experienced laundry technicians", "Dedicated quality control inspectors", "Professional delivery team", "Management oversight for hospitality accounts"],
    capacity: ["Scalable for seasonal volume", "Backup equipment for reliability", "Priority processing for hotel/hostel accounts"],
  },
  ctas: {
    estimate: "Request a Free Estimate",
    trial: "Schedule a Trial Service",
  },
  seo: {
    defaultTitle: "RSL Express — Commercial Linen Services, 24-Hour Turnaround",
    defaultDescription: "Hospitality linen washing, drying, pressing & packaging. Daily pickup/delivery and RFID tracking (coming soon).",
  },
};
