import { Product, User, Order } from '../core/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Relógio Cronógrafo Clássico',
    description: 'Uma peça atemporal com pulseira de aço inoxidável e cristal de safira.',
    price: 299.99,
    category: 'Relógios',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 124,
    stock: 15,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Óculos de Sol Aviador',
    description: 'Lentes polarizadas com armação leve de titânio.',
    price: 159.99,
    category: 'Óculos',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewsCount: 89,
    stock: 24,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Bolsa de Ombro em Couro',
    description: 'Bolsa de couro italiano feita à mão com alça ajustável.',
    price: 450.00,
    category: 'Bolsas',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 56,
    stock: 8,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Carteira Minimalista',
    description: 'Carteira fina com bloqueio RFID feita de couro de bezerro premium.',
    price: 75.00,
    category: 'Joias',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 210,
    stock: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Relógio Fitness Inteligente',
    description: 'Acompanhe sua saúde e mantenha-se conectado com este smartwatch elegante.',
    price: 199.00,
    category: 'Relógios',
    image: 'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewsCount: 342,
    stock: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Óculos Redondos Retrô',
    description: 'Armações de inspiração vintage com tecnologia de bloqueio de luz azul.',
    price: 120.00,
    category: 'Óculos',
    image: 'https://images.unsplash.com/photo-1511499767390-903390e62bc0?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 45,
    stock: 12,
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  email: 'admin@luxe.com',
  name: 'Alex Johnson',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    userId: 'u1',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    total: 299.99,
    status: 'Entregue',
    createdAt: '2024-02-15T10:30:00Z',
    shippingAddress: {
      fullName: 'Alex Johnson',
      address: '123 Luxury Ave',
      city: 'New York',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: 'ord_2',
    userId: 'u1',
    items: [
      { ...MOCK_PRODUCTS[1], quantity: 2 }
    ],
    total: 319.98,
    status: 'Enviado',
    createdAt: '2024-03-01T14:20:00Z',
    shippingAddress: {
      fullName: 'Alex Johnson',
      address: '123 Luxury Ave',
      city: 'New York',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'PayPal'
  }
];
