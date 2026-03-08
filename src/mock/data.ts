import { Order, Product, User } from '../core/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Relógio Cronógrafo Clássico',
    slug: 'relogio-cronografo-classico',
    description:
      'Uma peça atemporal com pulseira de aço inoxidável e cristal de safira.',
    price: 299.99,
    category_id: 'mock-watches',
    category_name: 'Relógios',
    category_slug: 'watches',
    brand: 'Luxe Time',
    main_image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 15,
    is_featured: true,
    specs: {
      movement: 'Quartz',
      material: 'Aço inoxidável',
    },
    rating: 4.8,
    reviews_count: 124,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '5',
    name: 'Relógio Fitness Inteligente',
    slug: 'relogio-fitness-inteligente',
    description:
      'Acompanhe sua saúde e mantenha-se conectado com este smartwatch elegante.',
    price: 199.0,
    category_id: 'mock-watches',
    category_name: 'Relógios',
    category_slug: 'watches',
    brand: 'FitTime',
    main_image:
      'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 30,
    is_featured: false,
    specs: {
      connectivity: 'Bluetooth',
      battery: '48h',
    },
    rating: 4.4,
    reviews_count: 342,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '7',
    name: 'Rolex Submariner Luxo',
    slug: 'rolex-submariner-luxo',
    description:
      'Relógio premium inspirado no Rolex Submariner com acabamento impecável.',
    price: 1250.0,
    category_id: 'mock-watches',
    category_name: 'Relógios',
    category_slug: 'watches',
    brand: 'Rolex Style',
    main_image:
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 5,
    is_featured: true,
    specs: {
      movement: 'Automatic',
      material: 'Steel',
    },
    rating: 4.9,
    reviews_count: 78,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '8',
    name: 'Relógio Rolex Datejust Dourado',
    slug: 'rolex-datejust-dourado',
    description:
      'Elegante relógio dourado estilo Rolex Datejust para ocasiões especiais.',
    price: 1400,
    category_id: 'mock-watches',
    category_name: 'Relógios',
    category_slug: 'watches',
    brand: 'Rolex Style',
    main_image:
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 6,
    is_featured: false,
    specs: {
      movement: 'Automatic',
      finish: 'Gold tone',
    },
    rating: 5,
    reviews_count: 44,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '2',
    name: 'Óculos de Sol Aviador',
    slug: 'oculos-de-sol-aviador',
    description: 'Lentes polarizadas com armação leve de titânio.',
    price: 159.99,
    category_id: 'mock-glasses',
    category_name: 'Óculos',
    category_slug: 'glasses',
    brand: 'Aviator',
    main_image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 24,
    is_featured: true,
    specs: {
      lens: 'Polarized',
      protection: 'UV400',
    },
    rating: 4.5,
    reviews_count: 89,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '6',
    name: 'Óculos Redondos Retrô',
    slug: 'oculos-redondos-retro',
    description:
      'Armações de inspiração vintage com tecnologia de bloqueio de luz azul.',
    price: 120.0,
    category_id: 'mock-glasses',
    category_name: 'Óculos',
    category_slug: 'glasses',
    brand: 'Retro Vision',
    main_image:
      'https://images.unsplash.com/photo-1511499767390-903390e62bc0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767390-903390e62bc0?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 12,
    is_featured: false,
    specs: {
      frame: 'Metal',
      lens_type: 'Blue light',
    },
    rating: 4.6,
    reviews_count: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '9',
    name: 'Óculos de Sol Luxury Black',
    slug: 'oculos-de-sol-luxury-black',
    description: 'Óculos premium com lentes UV400 e armação reforçada.',
    price: 210,
    category_id: 'mock-glasses',
    category_name: 'Óculos',
    category_slug: 'glasses',
    brand: 'Luxury Vision',
    main_image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 18,
    is_featured: false,
    specs: {
      protection: 'UV400',
      frame: 'Reforçada',
    },
    rating: 4.7,
    reviews_count: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '3',
    name: 'Bolsa de Ombro em Couro',
    slug: 'bolsa-de-ombro-em-couro',
    description: 'Bolsa de couro italiano feita à mão com alça ajustável.',
    price: 450.0,
    category_id: 'mock-bags',
    category_name: 'Bolsas',
    category_slug: 'shoulder-bags',
    brand: 'Milano',
    main_image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 8,
    is_featured: true,
    specs: {
      material: 'Couro italiano',
      strap: 'Ajustável',
    },
    rating: 4.9,
    reviews_count: 56,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '10',
    name: 'Bolsa Feminina Luxury Shoulder',
    slug: 'bolsa-feminina-luxury-shoulder',
    description: 'Bolsa elegante para uso diário com acabamento premium.',
    price: 380,
    category_id: 'mock-bags',
    category_name: 'Bolsas',
    category_slug: 'shoulder-bags',
    brand: 'Luxury Bags',
    main_image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 14,
    is_featured: false,
    specs: {
      finish: 'Premium',
      usage: 'Diário',
    },
    rating: 4.8,
    reviews_count: 72,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '11',
    name: 'Bolsa Executiva Masculina',
    slug: 'bolsa-executiva-masculina',
    description: 'Bolsa executiva de couro legítimo ideal para trabalho.',
    price: 520,
    category_id: 'mock-bags',
    category_name: 'Bolsas',
    category_slug: 'shoulder-bags',
    brand: 'Executive Line',
    main_image:
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 9,
    is_featured: false,
    specs: {
      material: 'Couro legítimo',
      use_case: 'Trabalho',
    },
    rating: 4.7,
    reviews_count: 39,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '4',
    name: 'Carteira Minimalista',
    slug: 'carteira-minimalista',
    description:
      'Carteira fina com bloqueio RFID feita de couro de bezerro premium.',
    price: 75.0,
    category_id: 'mock-accessories',
    category_name: 'Joias',
    category_slug: 'accessories',
    brand: 'Minimal Line',
    main_image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 45,
    is_featured: false,
    specs: {
      security: 'RFID',
      material: 'Couro premium',
    },
    rating: 4.7,
    reviews_count: 210,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '12',
    name: 'Corrente de Ouro 18k',
    slug: 'corrente-de-ouro-18k',
    description: 'Corrente masculina em ouro 18k com acabamento polido.',
    price: 890,
    category_id: 'mock-accessories',
    category_name: 'Joias',
    category_slug: 'accessories',
    brand: 'Gold Line',
    main_image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 7,
    is_featured: true,
    specs: {
      material: 'Ouro 18k',
      finish: 'Polido',
    },
    rating: 4.9,
    reviews_count: 88,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: '13',
    name: 'Corrente Dourada Premium',
    slug: 'corrente-dourada-premium',
    description: 'Corrente elegante dourada estilo luxo.',
    price: 350,
    category_id: 'mock-accessories',
    category_name: 'Joias',
    category_slug: 'accessories',
    brand: 'Luxury Chain',
    main_image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 20,
    is_featured: false,
    specs: {
      style: 'Luxo',
      finish: 'Dourado',
    },
    rating: 4.6,
    reviews_count: 33,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_USER: User = {
  id: 'u1',
  email: 'admin@luxe.com',
  name: 'Alex Johnson',
  role: 'admin',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    userId: 'u1',
    items: [{ ...MOCK_PRODUCTS[0], quantity: 1 }],
    total: 299.99,
    status: 'Delivered',
    createdAt: '2024-02-15T10:30:00Z',
    shippingAddress: {
      fullName: 'Alex Johnson',
      address: '123 Luxury Ave',
      city: 'New York',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'Cartão de Crédito',
  },
  {
    id: 'ord_2',
    userId: 'u1',
    items: [{ ...MOCK_PRODUCTS[1], quantity: 2 }],
    total: 319.98,
    status: 'Shipped',
    createdAt: '2024-03-01T14:20:00Z',
    shippingAddress: {
      fullName: 'Alex Johnson',
      address: '123 Luxury Ave',
      city: 'New York',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
  },
];