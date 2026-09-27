export interface SalonService {
  id: string;
  name: string;
  category: 'hair' | 'beauty' | 'special';
  description: string;
  price: string;
  duration: string;
  highlight?: boolean;
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  numberOfPeople: number;
  message?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'styling' | 'haircuts' | 'color' | 'beauty' | 'interior';
  image: string;
  caption: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  review: string;
  service: string;
  date: string;
}
