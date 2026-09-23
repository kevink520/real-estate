export const agent = {
  name: "Eleanor Hayes",
  title: "REALTOR®",
  brokerage: "Hayes & Harbor Realty",
  phone: "(978) 555-0142",
  phoneHref: "tel:+19785550142",
  email: "eleanor@hayesharbor.com",
  office: ["14 Front Street", "Marblehead, MA 01945"],
  license: "MA Lic. #9-0142-EH",
  brokerageId: "Broker Lic. #422-HHR",
};

export const stats = [
  { value: 19, suffix: "", label: "Years on the North Shore" },
  { value: 340, suffix: "+", label: "Homes bought & sold" },
  { value: 412, prefix: "$", suffix: "M", label: "In closed transactions" },
  { value: 4.9, decimals: 1, mark: "★", label: "Average across 180 reviews" },
];

export const tourChapters = [
  {
    at: 0.16,
    eyebrow: "The Approach",
    title: "Every house makes a first impression.",
    body: "I'll tell you what the curb doesn't — the roof's age, the drainage, the street's winter light.",
  },
  {
    at: 0.36,
    eyebrow: "The Foyer",
    title: "The moment it starts to feel like home.",
    body: "Buyers decide in the first ten steps. I stage and photograph those steps with care.",
  },
  {
    at: 0.56,
    eyebrow: "The Living Room",
    title: "Where the real conversations happen.",
    body: "Fireside or kitchen table — we'll talk through timing, trade-offs and what you actually need.",
  },
  {
    at: 0.74,
    eyebrow: "The Kitchen",
    title: "Details that hold their value.",
    body: "I know which renovations the North Shore market pays back — and which it quietly ignores.",
  },
  {
    at: 0.9,
    eyebrow: "The Garden",
    title: "And the life that opens up beyond it.",
    body: "Let's find the door you'll want to walk through for the next twenty years.",
  },
];

export type Listing = {
  image: string;
  alt: string;
  status: "Just Listed" | "For Sale" | "Under Contract" | "Coming Soon";
  address: string;
  town: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  note: string;
};

export const listings: Listing[] = [
  {
    image: "/images/shingle-home.webp",
    alt: "Cedar-shingle coastal home with a wraparound porch and autumn trees",
    status: "Just Listed",
    address: "7 Harbor Light Lane",
    town: "Marblehead Neck",
    price: "$2,485,000",
    beds: 4,
    baths: 3.5,
    sqft: "3,640",
    note: "Deep porch, harbor glimpses, fieldstone chimney",
  },
  {
    image: "/images/brick-townhouse.webp",
    alt: "Federal brick townhouse with black door and a walled garden patio",
    status: "For Sale",
    address: "22 Chestnut Street",
    town: "Salem — McIntire District",
    price: "$1,695,000",
    beds: 3,
    baths: 2.5,
    sqft: "2,780",
    note: "1810 Federal with private walled garden",
  },
  {
    image: "/images/colonial-exterior.webp",
    alt: "Cream center-hall colonial with green shutters and a brick path",
    status: "Under Contract",
    address: "41 Hale Street",
    town: "Beverly Farms",
    price: "$1,950,000",
    beds: 5,
    baths: 3,
    sqft: "3,910",
    note: "Center-hall colonial, sunroom, half-acre lot",
  },
  {
    image: "/images/tour-kitchen-seed.webp",
    alt: "Sunlit kitchen with white oak island and brass pendants",
    status: "Coming Soon",
    address: "3 Summer Street",
    town: "Manchester-by-the-Sea",
    price: "$2,150,000",
    beds: 4,
    baths: 3,
    sqft: "3,120",
    note: "Renovated chef's kitchen, walk to Singing Beach",
  },
];

export const advantages = [
  {
    title: "Neighborhood fluency",
    body: "Nineteen years of walking these streets means I know which blocks flood in a nor'easter, which schools just added a program, and which listings are coming before they hit the market.",
    receive: "A private shortlist and honest street-level notes on every home you consider.",
  },
  {
    title: "Hands-on guidance",
    body: "You'll work with me — not a team of rotating assistants. I attend every showing, inspection and closing, and I answer my phone on weekends.",
    receive: "One trusted point of contact from first conversation to keys in hand.",
  },
  {
    title: "Editorial marketing",
    body: "Every listing gets architectural photography, a written narrative of the home, a film tour, and a targeted launch to my network of Boston and North Shore agents.",
    receive: "More qualified buyers in the first week — when it matters most.",
  },
];

export const neighborhoods = [
  {
    name: "Marblehead",
    image: "/images/shingle-home.webp",
    tagline: "Old Town lanes & the harbor",
    detail: "Crooked streets of 18th-century captains' houses, sunset from Crocker Park, and one of the most active racing harbors on the East Coast.",
    median: "$1.28M median",
  },
  {
    name: "Salem — McIntire District",
    image: "/images/brick-townhouse.webp",
    tagline: "Federal brick & walled gardens",
    detail: "Chestnut Street is often called the most beautiful street in America. Expect preservation guidelines — I'll walk you through them.",
    median: "$865K median",
  },
  {
    name: "Beverly Farms",
    image: "/images/colonial-exterior.webp",
    tagline: "Village life, 40 minutes to Boston",
    detail: "The commuter rail stops in the village. Walk to West Beach, the library and Saturday morning at the farmers' market.",
    median: "$1.62M median",
  },
  {
    name: "Manchester-by-the-Sea",
    image: "/images/tour-garden-seed.webp",
    tagline: "Singing Beach & quiet woods",
    detail: "Sand that squeaks underfoot, 1,000 acres of conservation trails, and a small-town school system families move for.",
    median: "$1.85M median",
  },
];

export const testimonials = [
  {
    quote:
      "We were relocating from Chicago with two kids and six weeks to decide. Eleanor previewed twenty homes on video for us, flagged a basement issue our inspector later confirmed, and found us a colonial in Beverly Farms before it was listed.",
    name: "Priya & Daniel Okafor",
    detail: "Bought in Beverly Farms",
  },
  {
    quote:
      "After forty years in our Marblehead home, selling felt overwhelming. Eleanor handled the downsizing plan, the contractors and the staging. We had four offers in five days and closed above asking.",
    name: "Margaret Lindqvist",
    detail: "Sold in Marblehead",
  },
  {
    quote:
      "As first-time buyers we lost three bidding wars before calling Eleanor. She rewrote our offer strategy, and we won the fourth — a brick townhouse in Salem — without waiving our inspection.",
    name: "Sam Whitfield & Theo Brandt",
    detail: "First-time buyers in Salem",
  },
];

export const steps = [
  {
    title: "Discuss your goals",
    body: "A relaxed thirty-minute conversation — in person or on the phone — about timing, budget and what matters most to you.",
  },
  {
    title: "Create a plan",
    body: "A written strategy tailored to you: pricing or search criteria, preparation, neighborhoods, lenders and a realistic timeline.",
  },
  {
    title: "Buy or sell with guidance",
    body: "I negotiate, coordinate inspections and paperwork, and stay beside you through closing — and well after.",
  },
];
