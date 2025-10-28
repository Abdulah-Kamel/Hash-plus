export const navLinks = [
  {
    id: 1,
    label: 'الرئيسية',
    href: '/',
    isActive: true,
  },
  {
    id: 2,
    label: 'الدورات',
    href: '/shop',
  },
  {
    id: 3,
    label: 'التعليم',
    href: '/shop',
    hasDropdown: true,
    dropdownItems: [
      { id: 'edu-1', label: 'البرامج الدراسيهية', href: '/shop/?category=education' },
      { id: 'edu-2', label: 'مذكرات', href: '/shop/?category=notes' },
      { id: 'edu-3', label: 'معسكرات', href: '/shop/?category=quizzes' },
    ],
  },
  {
    id: 4,
    label: 'المجتمع',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { id: 'comm-1', label: 'مقالات', href: '#' },
      { id: 'comm-2', label: 'مذكرات', href: '#' },
      { id: 'comm-3', label: 'معسكرات', href: '#' },
    ],
  },
  {
    id: 5,
    label: 'المركز الاعلامى',
    href: '/about-us',
  },
  {
    id: 6,
    label: 'المقالات',
    href: '/blog',
  },
];
