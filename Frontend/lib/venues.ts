export type Venue = {
  id: string
  name: string
  image: string
  imageAlt: string
  tags: string[]
}

// Add new venues here — cards render automatically from this list.
export const venues: Venue[] = [
  {
    id: 'platinum-resorts',
    name: 'Platinum Resorts',
    image: '/venues/platinum-resorts/platinum-resorts (1).jpg',
    imageAlt:
      'Elegant ballroom interior with a crystal chandelier, draped curtains, and white floral arrangements',
    tags: ["hot-pick", "slideshow"]
  },
  {
    id: 'palki-palace',
    name: 'Palki Palace',
    image: '/venues/palki-palace/palki-palace (1).jpg',
    imageAlt:
      'Rooftop lounge at night with a city skyline, fire pit seating, and string lights',
    tags: ["hot-pick", "slideshow"]
  },
  {
    id: 'rai-farms',
    name: 'Rai Farms',
    image: '/venues/rai-farms/rai-farms (1).jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: ["hot-pick", "slideshow"]
  },
  {
    id: 'akm-resorts',
    name: 'AKM Resorts',
    image: '/venues/akm-resorts.jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: []
  },
  {
    id: 'bhullar-resorts',
    name: 'Bhullar Resorts',
    image: '/venues/bhullar-resort.jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: []
  },
  {
    id: 'grace-banquet',
    name: 'Grace Banquet',
    image: '/venues/grace-banquet.jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: []
  },
  {
    id: 'orchid-farms',
    name: 'Orchid Farms',
    image: '/venues/orchid-farms.jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: []
  },
  {
    id: 'sydney-heights-resorts',
    name: 'Sydney Heights Resorts',
    image: '/venues/sydney-heights-resorts.jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: []
  },
  {
    id: 'utsav-grand',
    name: 'Utsav Grand',
    image: '/venues/utsav-grand.jpg',
    imageAlt:
      'Outdoor garden ceremony with a floral arch, white chairs, and a rustic barn backdrop',
    tags: []
  }
]
