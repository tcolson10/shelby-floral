// Every photo the site shows, keyed by filename in public/images/portfolio/.
// `alt` is what screen readers and Google read in place of the photo.
// After adding a photo here, run `npm run optimize-images` to create the
// smaller WebP copies the site serves (see scripts/optimize-images.js).
const images = {
	"IMG_1325.jpg": { w: 1100, h: 749, alt: "Couple embracing beneath a veil in a mountain meadow, bride holding a white bouquet" },
	"IMG_4486.jpg": { w: 1121, h: 1600, alt: "Mountain ceremony with low white floral meadows framing the couple" },
	"013355F8-6967-4C7B-AF4E-5F760C595FA5.jpeg": { w: 1100, h: 1100, alt: "Long outdoor reception table with white bud vases in the mountains" },
	"991763B8-2329-4E74-8902-A8315489D121.jpg": { w: 1440, h: 1439, alt: "Couple dancing beneath a white floral arch in a bright ballroom" },
	"IMG_1708.jpg": { w: 734, h: 1100, alt: "Reception table runner of white and blush blooms" },
	"9F174CF3-66EE-4E7F-A50D-5F61FF8BD789.jpeg": { w: 1440, h: 1440, alt: "White and blush roses surrounding a tiered wedding cake" },
	"IMG_0597.jpeg": { w: 1082, h: 1600, alt: "Groom dipping the bride for a kiss in an aisle lined with blush and white flowers" },
	"IMG_8790.jpg": { w: 734, h: 1100, alt: "Bride surrounded by bridesmaids raising peach and blush bouquets" },
	"IMG_0413.jpeg": { w: 828, h: 1100, alt: "Bridal party in pale yellow dresses holding matching bouquets on venue steps" },
	"69E94533-5E79-4BEE-8264-76315704CB4E.jpeg": { w: 1440, h: 1440, alt: "Red and burgundy floral columns framing an arched wooden doorway" },
	"IMG_6141.jpg": { w: 1067, h: 1600, alt: "Couple cutting their cake surrounded by white and blue florals" },
	"IMG_6162.jpg": { w: 734, h: 1100, alt: "Bride and bridesmaids holding white hydrangea bouquets" },
	"IMG_3099.jpeg": { w: 734, h: 1100, alt: "Blue hydrangea table runner beneath a striped garden umbrella" },
	"IMG_3110.JPG": { w: 825, h: 1100, alt: "Garden sweetheart table with blue hydrangeas and a striped umbrella" },
	"IMG_6645.JPG": { w: 734, h: 1100, alt: "Groom lifting the bride's train in a wood-paneled hall, bride holding a white bouquet" },
	"IMG_6008.jpg": { w: 734, h: 1100, alt: "Couple walking down estate steps between tall white floral columns" },
	"IMG_6001.jpg": { w: 734, h: 1100, alt: "Bride on estate steps between tall white floral columns" },
	"IMG_6428.jpeg": { w: 786, h: 1100, alt: "Bride holding a red bouquet tied with a flowing red ribbon" },
	"IMG_6981.jpg": { w: 734, h: 1100, alt: "Bride with a burgundy and white bouquet beside the groom" },
	"IMG_6983.jpg": { w: 734, h: 1100, alt: "Close-up of a white, blush and deep burgundy bridal bouquet" },
	"IMG_1683.jpg": { w: 1170, h: 1444, alt: "Close-up of soft yellow and blush bridesmaid bouquets" },
	"IMG_7216.jpg": { w: 1070, h: 1100, alt: "Couple kissing beside a mountain pond, bride holding a peach bouquet" },
	"D089FC39-EF2A-42EA-B9C0-B025D0066451.jpeg": { w: 825, h: 1100, alt: "White aisle arrangement of ranunculus and delphinium beside wooden chairs" },
	"lol13.jpg": { w: 1059, h: 1100, alt: "Sweetheart table with white calla lilies and black ribbon in front of a fireplace" },
	"o.jpg": { w: 1100, h: 734, alt: "Garden ceremony with white floral pillars beneath tall trees" },
	"sneak-1.jpeg": { w: 1100, h: 734, alt: "Ceremony room with two white floral columns flanking the windows" },
	"IMG_4006.JPG": { w: 734, h: 1100, alt: "Bride and bridesmaids in floral dresses holding white bouquets" },
	"IMG_4007.JPG": { w: 734, h: 1100, alt: "Bridesmaids in floral dresses holding bouquets tied with yellow ribbon" },
	"IMG_1362.JPG": { w: 850, h: 1100, alt: "Couple walking back down the aisle at a garden ceremony" },
	"laceeWGroom.jpg": { w: 1100, h: 1080, alt: "Smiling couple in a wildflower field, bride holding pink tulips" },
	"IMG_2952.JPG": { w: 734, h: 1100, alt: "Bridal shoes beside a pale blue and white bouquet on a windowsill" },
	"Kylie2.JPG": { w: 737, h: 1100, alt: "Bride holding a bright yellow bouquet on a balcony" },
	"IMG_3964.jpg": { w: 1067, h: 1600, alt: "Orange, pink and peach blooms cascading up a tree trunk" },
	"cakeCrop.jpg": { w: 903, h: 1100, alt: "Heart-shaped wedding cake surrounded by bud vases and candles" },
	"IMG_5156.jpg": { w: 1143, h: 1600, alt: "Column of blue and white hydrangeas beside a white garden bar" },
	"IMG_5161.jpg": { w: 1143, h: 1600, alt: "Blue and white hydrangea arrangements on pedestals against white draping" },
	"IMG_5167.jpg": { w: 1143, h: 1600, alt: "Couple kissing at a sweetheart table framed by blue and white hydrangeas" },
	"IMG_7622.jpg": { w: 1143, h: 1600, alt: "Reception table with candles and blush florals under a crystal chandelier in the mountains" },
	"IMG_7623.jpg": { w: 1143, h: 1600, alt: "Mountain reception with blush and white centerpieces and chandeliers in the trees" },
	"IMG_7624.jpg": { w: 1143, h: 1600, alt: "Couple smiling in the mountains, bride holding a blush and white bouquet" },
	"IMG_7625.jpg": { w: 1135, h: 1600, alt: "Outdoor mountain ceremony with white florals lining the aisle" },
	"IMG_7626.jpg": { w: 1067, h: 1600, alt: "Bride seated beneath her veil holding a blush and white bouquet in a mountain meadow" },
	"IMG_7627.jpg": { w: 1067, h: 1600, alt: "Bride laughing under her veil with a blush and white bouquet" },
	"IMG_7629.jpg": { w: 1067, h: 1600, alt: "Mountain ceremony aisle lined with blush and white arrangements" },
	"IMG_7632.jpg": { w: 1067, h: 1600, alt: "Couple exchanging vows before a mountain backdrop, florals lining the aisle" },
	"IMG_7633.jpg": { w: 1067, h: 1600, alt: "Couple facing each other at a mountaintop ceremony surrounded by guests and florals" },
	"IMG_7635.jpg": { w: 1067, h: 1600, alt: "Blush centerpiece with tall candles on a reception table" },
	"IMG_7636.jpg": { w: 1067, h: 1600, alt: "Blush and white centerpiece beside a table number card" },
	"IMG_7637.jpg": { w: 1067, h: 1600, alt: "Pink and white centerpiece with taper candles at a candlelit reception" },
	"IMG_7638.jpg": { w: 1067, h: 1600, alt: "Blush rose florals along a stone fireplace mantel and sweetheart table" },
	"IMG_7670.jpg": { w: 1066, h: 1600, alt: "Barn reception hall with green hydrangea chandeliers above white-draped tables" },
	"IMG_7666.jpg": { w: 1066, h: 1600, alt: "White orchid and green anthurium arrangement with trailing amaranthus beside a wedding menu" },
	"IMG_7686.jpg": { w: 1067, h: 1600, alt: "Ceremony chairs lined with white and green hydrangeas in front of the mountains" },
	"IMG_7675.jpg": { w: 1066, h: 1600, alt: "White calla lily and green floral centerpiece on a reception table" },
	"IMG_7669.jpg": { w: 1067, h: 1600, alt: "Overhead view of a round table with a white floral centerpiece and green menus" },
	"IMG_7688.jpg": { w: 1067, h: 1600, alt: "Guests with white parasols seated along a hydrangea-lined aisle" },
	"IMG_7678.jpg": { w: 1066, h: 1600, alt: "Cake table between the staircase florals beneath an iron chandelier" },
	"IMG_7683.jpg": { w: 1067, h: 1600, alt: "Bride with bridesmaids in black gowns holding white bouquets with trailing green amaranthus" },
	"IMG_7680.jpg": { w: 1067, h: 1600, alt: "Seating chart cards nestled in white and green hydrangeas" },
	"IMG_9534.jpg": { w: 1143, h: 1600, alt: "Two-tier white cake surrounded by white roses, daisies and peach garden roses" },
	"band-veil.jpg": { w: 2400, h: 1635, alt: "" },
	"band-hydrangea.jpg": { w: 2400, h: 3360, alt: "" },
	"hero-bridesmaids.jpg": { w: 2400, h: 3600, alt: "" },
	"shelby-about.jpg": { w: 1067, h: 1600, alt: "Shelby trimming white roses among white vases on the studio floor" },
	"IMG_8989.JPG": { w: 733, h: 1100, alt: "Shelby holding white flowers" },
};

// Homepage preview, in reading order: left to right, row by row.
const homeGallery = [
	"IMG_8790.jpg",
	"IMG_7633.jpg",
	"IMG_4486.jpg",
	"IMG_5167.jpg",
	"9F174CF3-66EE-4E7F-A50D-5F61FF8BD789.jpeg",
	"IMG_7623.jpg",
	"IMG_7686.jpg",
	"69E94533-5E79-4BEE-8264-76315704CB4E.jpeg",
	"IMG_6983.jpg",
	"IMG_7670.jpg",
	"IMG_0597.jpeg",
	"IMG_7678.jpg",
	"IMG_1708.jpg",
	"IMG_7683.jpg",
];

// /full-portfolio page, in display order.
const fullGallery = [
	// Same photos, same order as the homepage preview, so the top matches.
	...homeGallery,
	"IMG_9534.jpg",
	"IMG_7666.jpg",
	"IMG_7675.jpg",
	"IMG_7669.jpg",
	"IMG_7688.jpg",
	"IMG_7635.jpg",
	"IMG_7680.jpg",
	"991763B8-2329-4E74-8902-A8315489D121.jpg",
	"IMG_7636.jpg",
	"IMG_1325.jpg",
	"IMG_7624.jpg",
	"013355F8-6967-4C7B-AF4E-5F760C595FA5.jpeg",
	"IMG_7629.jpg",
	"IMG_0413.jpeg",
	"IMG_7626.jpg",
	"IMG_6141.jpg",
	"IMG_6162.jpg",
	"IMG_5161.jpg",
	"IMG_3099.jpeg",
	"IMG_3110.JPG",
	"IMG_6645.JPG",
	"IMG_6008.jpg",
	"IMG_7632.jpg",
	"IMG_6001.jpg",
	"IMG_6428.jpeg",
	"IMG_6981.jpg",
	"IMG_7627.jpg",
	"IMG_1683.jpg",
	"IMG_5156.jpg",
	"IMG_7216.jpg",
	"IMG_7622.jpg",
	"D089FC39-EF2A-42EA-B9C0-B025D0066451.jpeg",
	"lol13.jpg",
	"o.jpg",
	"IMG_7638.jpg",
	"sneak-1.jpeg",
	"IMG_4006.JPG",
	"IMG_4007.JPG",
	"IMG_1362.JPG",
	"IMG_7637.jpg",
	"IMG_7625.jpg",
	"laceeWGroom.jpg",
	"IMG_2952.JPG",
	"Kylie2.JPG",
	"IMG_3964.jpg",
	"cakeCrop.jpg",
];

// Widths of the WebP copies generated for each photo. A copy is only made
// when it is smaller than the original. The full-screen hero and photo bands
// are stored at 2400px, which stays sharp on Retina laptops without being heavy.
const SIZES = [600, 1100, 1500, 2000];

// "IMG_6645.JPG" -> "img-6645"
const slug = (file) =>
	file.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const widthsFor = (file) => {
	const { w } = images[file];
	const smaller = SIZES.filter((s) => s < w);
	return [...smaller, w];
};

const webpPath = (file, width) => `/images/optimized/${slug(file)}-${width}.webp`;

module.exports = { images, homeGallery, fullGallery, slug, widthsFor, webpPath };
