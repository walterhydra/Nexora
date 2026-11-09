export const pricingTiers = {
  starter: [
    {
      id: 'landing-page',
      name: 'Landing Page',
      price: '₹2,499',
      duration: '3 days',
      rawPrice: 2499,
      popular: false,
      features: [
        '1-page custom design',
        'Mobile responsive',
        'Contact form + WhatsApp',
        'Google Maps embed',
        'SEO-ready meta tags'
      ]
    },
    {
      id: 'business-website',
      name: 'Business Website',
      price: '₹6,999',
      duration: '7 days',
      rawPrice: 6999,
      popular: true,
      features: [
        'Up to 5 pages',
        'Custom UI design',
        'SEO + sitemap',
        'WhatsApp integration',
        '1 month free support'
      ]
    },
    {
      id: 'ecommerce-store',
      name: 'E-Commerce Store',
      price: '₹11,999',
      duration: '12 days',
      rawPrice: 11999,
      popular: false,
      features: [
        'Product catalogue',
        'Cart & checkout',
        'Payment gateway',
        'Order management',
        'Mobile-first design'
      ]
    }
  ],
  intermediate: [
    {
      id: 'web-application',
      name: 'Web Application',
      price: '₹12,999',
      duration: '10 days',
      rawPrice: 12999,
      popular: false,
      features: [
        'Full MERN stack',
        'User auth + roles',
        'Admin dashboard',
        'API integrations',
        'Deployment included'
      ]
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      price: '₹11,999',
      duration: '15 days',
      rawPrice: 11999,
      popular: true,
      features: [
        'React Native (iOS + Android)',
        'Push notifications',
        'User auth',
        'App Store upload',
        '6 weeks support'
      ]
    },
    {
      id: 'marketing-starter-pack',
      name: 'Marketing Starter Pack',
      price: '₹6,999',
      duration: '5 days',
      rawPrice: 6999,
      popular: false,
      features: [
        'Logo + brand kit',
        '8 social media creatives',
        'Content calendar (1 month)',
        'Instagram/Facebook page setup',
        'Social profile optimization'
      ]
    }
  ],
  growth: [
    {
      id: 'custom-web-app',
      name: 'Custom Web App',
      price: '₹22,999',
      duration: '15 days',
      rawPrice: 22999,
      popular: false,
      features: [
        'Up to 12 responsive pages',
        'React / Next.js architecture',
        'Custom API integration',
        'User auth & dashboard',
        '2 months post-launch support'
      ]
    },
    {
      id: 'erp-portal',
      name: 'ERP / Portal System',
      price: '₹42,999',
      duration: '25 days',
      rawPrice: 42999,
      popular: true,
      features: [
        'Custom business workflow logic',
        'Role-based access control',
        'Automated inventory / reports',
        'Real-time telemetry & alerts',
        '3 months SLA priority support'
      ]
    },
    {
      id: 'saas-platform',
      name: 'SaaS Platform MVP',
      price: '₹65,999',
      duration: '35 days',
      rawPrice: 65999,
      popular: false,
      features: [
        'Multi-tenant architecture',
        'Subscription & billing engine',
        'Scalable cloud database',
        'Automated CI/CD pipelines',
        '4 months priority engineer support'
      ]
    }
  ],
  enterprise: [
    {
      id: 'dedicated-pod',
      name: 'Dedicated Dev Pod',
      price: '₹99,999',
      duration: 'monthly',
      rawPrice: 99999,
      popular: false,
      features: [
        'Dedicated senior fullstack team',
        'Sprint-based agile delivery',
        'Direct Slack / WhatsApp channel',
        'Unlimited code revisions',
        'Daily async progress updates'
      ]
    },
    {
      id: 'enterprise-arch',
      name: 'Enterprise Architecture',
      price: 'Custom',
      duration: '4-8 weeks',
      rawPrice: 'Custom',
      popular: true,
      features: [
        'Full legacy modernize or rebuild',
        'High-availability cloud setup (K8s/AWS)',
        'Advanced security & pen-testing',
        '24/7/365 uptime monitoring',
        'Dedicated technical director'
      ]
    },
    {
      id: 'digital-transformation',
      name: 'Digital Transformation',
      price: 'Custom',
      duration: 'Milestone',
      rawPrice: 'Custom',
      popular: false,
      features: [
        'End-to-end multi-system overhaul',
        'AI agent integration & workflows',
        'Executive roadmap & governance',
        'Multi-year SLA & on-site training',
        '100% white-label IP handover'
      ]
    }
  ]
};

// Fallback legacy export
export const pricing = pricingTiers.starter;
