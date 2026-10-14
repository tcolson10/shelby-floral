// Client reviews. All of them appear on /full-testimonials; the names in
// `featured` also rotate in the homepage carousel.
const testimonials = [
	{
		text: "I absolutely loved having Shelby Floral do my flowers! The flowers were perfectly on time where I needed them and she made everything so simple and organized for me. It was just one less thing I had to worry about on my wedding day and I was so obsessed with how amazing my florals were! I completely trusted them and their talents and they executed everything PERFECTLY!! 1000% would recommend them!",
		name: "Bailey B.",
	},
	{
		text: "Shelby Floral made my dream bouquet for my wedding! The flowers were beautifully put together and made on time so I never had to worry about anything. I loved them, I still look at the pics at least once a week they just were so gorgeous. They were the perfect final touch!",
		name: "Kensie W.",
	},
	{
		text: "Shelby Floral is an absolute dream to work with!! They were able to understand and execute my wedding floral vision perfectly. They are SO knowledgeable and made the planning so much fun, instead of stressful. I strongly recommend them to everyone I know.",
		name: "Grace G.",
	},
	{
		text: "Shelby Floral was incredible! I feel like the vision I had was kind of scattered, but they executed it perfectly and exceeded any expectations I had. I still get so many compliments on the florals from my wedding!",
		name: "Lacee J.",
	},
	{
		text: "Shelby Floral was amazing to work with! I showed them all of my inspo pics and they made all of my wedding flower dreams come true. They made sure I had flowers everywhere I wanted and my bouquet was gorgeous! They also did all the flowers and table settings for my baby shower a year later and it was to die for. They really listened to what I wanted and brought it to life! I can't wait to keep using them for all my future events. Absolutely recommend to anyone and everyone!",
		name: "Michelle C.",
	},
	{
		text: "10/10. Booked Shelby Floral after seeing their work on Instagram and they did not disappoint. My arch was the most beautiful thing I have ever seen in my life and I am not exaggerating.",
		name: "Tatum R.",
	},
	{
		text: "I was so nervous going into it because I had no idea what I wanted and flowers are so expensive. But they made me feel completely at ease from the first conversation and somehow took my scattered Pinterest board and made it into something so beautiful I actually started crying when I saw my bouquet. My mom still brings it up every time I see her!!",
		name: "Audrey M.",
	},
	{
		text: "I told them I wanted simple and romantic and they nailed it completely. My bouquet was exactly what I had been picturing and I couldn't stop staring at it all night!!",
		name: "Jess T.",
	},
	{
		text: "We hired Shelby Floral for our daughter's wedding and they were absolutely wonderful. So easy to work with and so responsive the whole time. The ceremony arch stopped people in their tracks and we had multiple guests asking for their info before the night was even over!!",
		name: "Diane H.",
	},
	{
		text: "I honestly had no idea how much the florals would change the whole feel of a wedding until I saw ours. The venue looked like an absolute dream and my husband and I are still talking about how perfect everything was. So happy we went with them!!",
		name: "Rylee N.",
	},
	{
		text: "They did my bridal shower AND my bachelorette and both were so gorgeous!! I love that they can do it all, not just weddings. Every single thing they put together was exactly what I had in mind.",
		name: "Savannah K.",
	},
	{
		text: "I reached out not really knowing what I wanted and they helped me figure out my whole vision from scratch. By the wedding day everything was set up perfectly and I didn't have to stress about a single thing. The flowers were stunning but honestly knowing it was all handled was everything to me.",
		name: "Chloe W.",
	},
	{
		text: "My bouquet showed up fresh and full and exactly the right colors. Every photo from that day I am obsessed with and the flowers are a huge reason why!!",
		name: "Mia F.",
	},
	{
		text: "We used Shelby Floral for a work event and I was honestly shocked by how incredible everything looked. I wasn't sure if they did non-wedding stuff but they totally nailed the vibe. The arrangements were the most talked about thing there and we are already planning to use them again.",
		name: "Rachel D.",
	},
	{
		text: "Getting married is stressful and most vendors made it more stressful. Shelby Floral was genuinely one of the most fun parts of the whole planning process. They got our vision, they communicated, and they showed up and made it real. Loved working with them so much.",
		name: "Peyton A.",
	},
	{
		text: "I could not recommend them more!! Everything was so beautiful and they were so easy to work with the whole time. Fast responses, gorgeous results, just an amazing experience overall.",
		name: "Lauren S.",
	},
	{
		text: "I wanted something really different, dried and fresh mixed together with earthy tones, nothing traditional at all. I was honestly nervous no one would get it but they understood immediately. The final result was even better than my inspo pics and so many people told us our wedding felt totally unique.",
		name: "Natalie B.",
	},
	{
		text: "They did our ceremony flowers and our rehearsal dinner and both were absolutely stunning!! I have already recommended them to like four friends who are engaged. Cannot say enough good things.",
		name: "Harper C.",
	},
	{
		text: "I was upfront that we were working with a tighter budget and they never made me feel weird about it at all. They worked with what we had and the flowers were so gorgeous. I was genuinely shocked by how beautiful everything turned out!!",
		name: "Brooke V.",
	},
	{
		text: "Every single thing was perfect, from the welcome sign all the way down to the little bud vases on the tables. You could tell so much care went into every arrangement. Our photographer was obsessed with the florals and honestly so were we!!",
		name: "Olivia T.",
	},
];

export const featured = testimonials.filter((t) =>
	["Kensie W.", "Grace G.", "Lacee J.", "Tatum R.", "Peyton A.", "Jess T.", "Lauren S."].includes(t.name)
);

export default testimonials;
