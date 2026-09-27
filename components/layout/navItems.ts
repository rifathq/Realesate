import {
  Home,
  Heart,
  Bookmark,
  Calculator,
  Building2,
  UserCheck,
  Calendar,
  Signpost,
  Search,
  KeyRound,
  Binoculars,
  Tag,
  ClipboardList,
  Gem,
  Briefcase,
  Bell,
  LucideIcon
} from 'lucide-react';

export interface SubNavItem {
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  subItems?: SubNavItem[];
}

export const SECTION_A_ITEMS: NavItem[] = [
  {
    id: 'feed',
    label: 'Feed',
    href: '/feed',
    icon: Home
  },
  {
    id: 'favorites',
    label: 'Favorites & comments',
    href: '/saved',
    icon: Heart,
    badge: 'savedCount'
  },
  {
    id: 'saved-searches',
    label: 'Saved searches',
    href: '/saved-searches',
    icon: Bookmark
  },
  {
    id: 'mortgage-calc',
    label: 'Mortgage Calculator',
    href: '/mortgage',
    icon: Calculator
  },
  {
    id: 'my-homes',
    label: 'My homes',
    href: '/my-homes',
    icon: Home
  },
  {
    id: 'renter-dashboard',
    label: 'Renter dashboard',
    href: '/renter-dashboard',
    icon: Building2
  },
  {
    id: 'my-agent',
    label: 'My agent',
    href: '/my-agent',
    icon: UserCheck
  },
  {
    id: 'appointments',
    label: 'Appointments',
    href: '/appointments',
    icon: Calendar
  },
  {
    id: 'open-houses',
    label: 'Open house schedule',
    href: '/open-houses',
    icon: Signpost
  }
];

export const SECTION_B_ITEMS: NavItem[] = [
  {
    id: 'search-sale',
    label: 'Search for sale',
    href: '/search?mode=buy',
    icon: Search
  },
  {
    id: 'search-rentals',
    label: 'Search rentals',
    href: '/search?mode=rent',
    icon: KeyRound
  },
  {
    id: 'early-access',
    label: 'Early Access',
    href: '/early-access',
    icon: Binoculars,
    subItems: [
      { label: 'Exclusive Drops', href: '/early-access?tab=exclusive-drops' },
      { label: 'Pre-market Listings', href: '/early-access?tab=pre-market' },
      { label: 'VIP Open Houses', href: '/early-access?tab=vip-open-houses' }
    ]
  },
  {
    id: 'sell-my-home',
    label: 'Sell my home',
    href: '/sell',
    icon: Tag
  },
  {
    id: 'list-for-rent',
    label: 'List my home for rent',
    href: '/list-for-rent',
    icon: ClipboardList
  },
  {
    id: 'nestora-premier',
    label: 'Nestora Premier',
    href: '/premier',
    icon: Gem
  },
  {
    id: 'be-an-agent',
    label: 'Be an agent',
    href: '/careers/agent',
    icon: Briefcase
  },
  {
    id: 'notification-settings',
    label: 'Notification settings',
    href: '/settings/notifications',
    icon: Bell
  }
];
