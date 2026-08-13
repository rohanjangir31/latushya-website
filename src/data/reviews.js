// ============================================================
// LATUSHYA — Customer Reviews
//
// HOW TO ADD A REAL REVIEW:
// 1. Copy the template object below
// 2. Fill in all fields with real customer data
// 3. Set isPlaceholder: false
// 4. Save this file — the website updates automatically
//
// PHOTO: Use a real customer photo URL, or set avatar to null
//        for an initial-based avatar
// ============================================================

const reviews = [
  {
    id: 1,
    name: 'Anusha Pal',
    date: '3 months ago',
    rating: 5,
    text: 'We recently worked with Latushya Interiors, and the experience has been excellent. They have successfully completed multiple projects for us, each delivered with great quality and attention to detail. Their pricing is reasonable, and the overall service has been consistently reliable.\\n\\nA special thanks to Chandan Kumar, whose unique design ideas—especially for the kitchen and wardrobes—really stood out. His creativity and practical approach made a big difference in the final outcome.\\n\\nOverall, we had a great experience and would highly recommend Latushya Interiors to anyone looking for quality work and professional service.',
    avatar: 'A',
    project: 'Kitchen and Wardrobes',
    isPlaceholder: false,
  },
  {
    id: 2,
    name: 'Nikitha Joyce',
    date: '2 years ago',
    rating: 5,
    text: "I recently had Latushya install a wardrobe with sliding mirror doors in my bedroom, and I'm thrilled with the outcome. The wardrobe's quality and elegance have transformed my space. The installation was smooth, with their team arriving on time and paying close attention to detail. The sliding mirror doors are both beautiful and functional, making my daily routine more convenient. The extra storage space is like a bonus. Customer service from them was exceptional throughout, always responsive to my questions. After several months of use, the wardrobe still looks and functions like new. Considering the quality and experience, I highly recommend Latushya for wardrobe installations. Thank you for enhancing my home with this fantastic addition!",
    avatar: 'N',
    project: 'Sliding Mirror Wardrobe',
    isPlaceholder: false,
  },
  {
    id: 3,
    name: 'Vivek Patil',
    date: '2 years ago',
    rating: 5,
    text: "I recently had Latushya install sliding wardrobe doors in my home, and I am thrilled with the results. The team was professional, offering a wide range of customizable designs and materials that perfectly matched my decor. The installation was smooth and efficient, with meticulous attention to detail.\\n\\nLatushya's exceptional customer service made the entire process seamless. They were responsive and provided valuable advice throughout. I highly recommend Latushya for their quality craftsmanship and outstanding service. Thank you for transforming my space!",
    avatar: 'V', // Avatar is a photo in the screenshot, but we'll use initial for now
    project: 'Sliding Wardrobe Doors',
    isPlaceholder: false,
  },
  {
    id: 5,
    name: 'rishab sharma',
    date: '1 year ago',
    rating: 5,
    text: 'Just got my entire interior done for my house. extremely professional and very artistic these guys are and wonderful attitude strongly recommend for interiors',
    avatar: 'r',
    project: 'Complete Interiors',
    isPlaceholder: false,
  },
  {
    id: 6,
    name: 'Roopika cs',
    date: '2 months ago',
    rating: 5,
    text: 'I recently got the interiors of my bedroom wardrobe done and had a great experience overall. The design was fully customized to my preferences and executed really well. It was a smooth and pleasant experience from start to finish.',
    avatar: 'R',
    project: 'Bedroom Wardrobe',
    isPlaceholder: false,
  }
];

export default reviews;
