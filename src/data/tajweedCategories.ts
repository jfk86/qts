export interface TajweedCategory {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  tooltip: string;
}

export const tajweedCategories: TajweedCategory[] = [
  {
    id: 'madd',
    name: 'Madd',
    nameArabic: 'مَدّ',
    description: 'Elongation of vowels',
    tooltip: 'Proper elongation of long vowels (2, 4, or 6 counts)'
  },
  {
    id: 'ghunna',
    name: 'Ghunna',
    nameArabic: 'غُنَّة',
    description: 'Nasal sound',
    tooltip: 'Nasal sound produced with noon and meem'
  },
  {
    id: 'qalqalah',
    name: 'Qalqalah',
    nameArabic: 'قَلْقَلَة',
    description: 'Echoing sound',
    tooltip: 'Slight bouncing sound with ق ط ب ج د'
  },
  {
    id: 'ikhfa',
    name: 'Ikhfa',
    nameArabic: 'إِخْفَاء',
    description: 'Hiding/concealing',
    tooltip: 'Hiding the noon sakinah before certain letters'
  },
  {
    id: 'idgham',
    name: 'Idgham',
    nameArabic: 'إِدْغَام',
    description: 'Merging',
    tooltip: 'Merging noon sakinah into following letter'
  },
  {
    id: 'izhar',
    name: 'Izhar',
    nameArabic: 'إِظْهَار',
    description: 'Clear pronunciation',
    tooltip: 'Clear pronunciation of noon sakinah'
  },
  {
    id: 'iqlab',
    name: 'Iqlab',
    nameArabic: 'إِقْلاَب',
    description: 'Substitution',
    tooltip: 'Changing noon sakinah to meem before baa'
  },
  {
    id: 'tarqeeq',
    name: 'Tarqeeq',
    nameArabic: 'تَرْقِيق',
    description: 'Thin/soft pronunciation',
    tooltip: 'Soft, thin pronunciation of letters'
  },
  {
    id: 'tafkheem',
    name: 'Tafkheem',
    nameArabic: 'تَفْخِيم',
    description: 'Thick/heavy pronunciation',
    tooltip: 'Heavy, thick pronunciation of emphatic letters'
  },
  {
    id: 'ra_rules',
    name: 'Ra Rules',
    nameArabic: 'أَحْكَام الرَّاء',
    description: 'Rules for the letter Ra',
    tooltip: 'Heavy or light pronunciation of the letter Ra'
  },
  {
    id: 'lam_rules',
    name: 'Lam Rules',
    nameArabic: 'أَحْكَام اللاَّم',
    description: 'Rules for the letter Lam',
    tooltip: 'Heavy or light pronunciation of Lam in Allah'
  },
  {
    id: 'waqf',
    name: 'Waqf',
    nameArabic: 'وَقْف',
    description: 'Stopping rules',
    tooltip: 'Proper stopping at the end of verses or words'
  },
  {
    id: 'hamzah',
    name: 'Hamzah',
    nameArabic: 'هَمْزَة',
    description: 'Glottal stop',
    tooltip: 'Proper pronunciation of hamzah (glottal stop)'
  },
  {
    id: 'makharij',
    name: 'Makharij',
    nameArabic: 'مَخَارِج',
    description: 'Articulation points',
    tooltip: 'Correct articulation points of letters'
  },
  {
    id: 'sifat',
    name: 'Sifat',
    nameArabic: 'صِفَات',
    description: 'Letter characteristics',
    tooltip: 'Inherent characteristics of Arabic letters'
  },
  {
    id: 'other',
    name: 'Other',
    nameArabic: 'أُخْرَى',
    description: 'Other mistakes',
    tooltip: 'Other pronunciation or recitation mistakes'
  }
];