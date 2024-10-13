import { 
  //BookOpen, 
  Layers, 
  Search, 
  Target, 
  AlignLeft, 
  AlignRight, 
  ArrowLeftRight, 
  //CornerDownRight, 
  //CornerUpLeft, 
  //MoveRight, 
  //MoveLeft, 
  Type,
  BookText
} from "lucide-react";

export const sidebarOptions = [
  { name: 'الباحث', icon: Search, url: '/search' },

  { name: 'سور ', icon: BookText, url: '/complete-chapter' },
  { name: 'أجزاء ', icon: Layers, url: '/complete-section' },
  
  { name: 'آية محددة', icon: Target, url: '/specific-verse' },
  { name: 'بداية الآية', icon: AlignLeft, url: '/verse-begins' },
  { name: 'نهاية الآية', icon: AlignRight, url: '/verse-ends' },
  { name: 'نطاق الآية', icon: ArrowLeftRight, url: '/verse-range' },

  { name: 'كلمة محددة', icon: Type, url: '/specific-word' },
  // { name: 'بداية الكلمة', icon: CornerDownRight, url: '/word-begins' },
  // { name: 'نهاية الكلمة', icon: CornerUpLeft, url: '/word-ends' },
  // { name: 'الكلمة من البداية', icon: MoveRight, url: '/word-from-start' },
  // { name: 'الكلمة من النهاية', icon: MoveLeft, url: '/word-from-end' },
  // { name: 'الكلمات والحروف', icon: BookOpen, url: '/words-letters' },
];
