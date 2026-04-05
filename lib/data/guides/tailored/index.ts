import fs from 'fs';
import path from 'path';
import type { Guide } from '../types';

const TAILORED_FILES = [
  'airbnb-short-term-rental-first-property',
  'childcare-babysitting-nanny-business',
  'cleaning-business',
  'coaching-online-education',
  'consulting-any-type',
  'e-commerce-online-selling',
  'fitness-personal-training',
  'food-truck-pop-up-food-business',
  'freelance-tech-it-services',
  'freelancer-independent-creator',
  'hair-nail-beauty-solo',
  'home-services-handyman',
  'lawn-care-landscaping',
  'logistics-freight-independent-trucking',
  'marketing-freelancer-micro-agency',
  'other-home-property-services',
  'personal-errands-concierge-services',
  'pet-services-solo',
  'photography-videography',
  'private-healthcare-medspa-practices',
  'real-estate-agencies-brokerages',
  'snack-bar-concession-catering-solo',
  'software-publishers-saas',
  'specialty-retail-pop-up-shop',
  'specialty-trade-solo',
];

const TAILORED_DIR = path.join(process.cwd(), 'lib/data/guides/tailored');

export const getTailoredGuides = (): Guide[] => {
  const allGuides: Guide[] = [];
  for (const file of TAILORED_FILES) {
    const raw = fs.readFileSync(path.join(TAILORED_DIR, `${file}.json`), 'utf-8');
    allGuides.push(...(JSON.parse(raw) as Guide[]));
  }
  return allGuides;
};

export const getTailoredGuidesByCategory = (categorySlug: string): Guide[] => {
  const filePath = path.join(TAILORED_DIR, `${categorySlug}.json`);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Guide[];
};
