'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth, UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Search, 
  Menu,
  Volume2,
  Headphones,
  BookMarked,
  MessageCircle,
  Youtube,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState('ar')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  const handleActionClick = () => {
    if (isSignedIn) {
      router.push('/search')
    } else {
      router.push('/sign-up')
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Implement search functionality here
      console.log('Searching for:', searchQuery)
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const t = (ar: string, en: string) => language === 'ar' ? ar : en

  return (
       <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">{t('القرآن الكريم', 'AnanQuran')}</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium">
            <Link href="#features" className="transition-colors hover:text-primary">{t('الميزات', 'Features')}</Link>
            <Link href="#explore" className="transition-colors hover:text-primary">{t('استكشف', 'Explore')}</Link>
            <Link href="#community" className="transition-colors hover:text-primary">{t('المجتمع', 'Community')}</Link>
          </nav>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Select onValueChange={handleLanguageChange} defaultValue={language}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Button variant="default" size="sm" onClick={handleActionClick}>
                {t('ابدأ الآن', 'Get Started')}
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'left' : 'right'}>
                <nav className="flex flex-col space-y-4">
                  <Link href="#features" className="text-lg font-medium">{t('الميزات', 'Features')}</Link>
                  <Link href="#explore" className="text-lg font-medium">{t('استكشف', 'Explore')}</Link>
                  <Link href="#community" className="text-lg font-medium">{t('المجتمع', 'Community')}</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6"
              {...fadeIn}
            >
              {t('استكشف حكمة القرآن الكريم', 'Explore the Wisdom of the Quran')}
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              {t('اكتشف وادرس وتأمل في القرآن الكريم مع أدواتنا المتقدمة ومجتمعنا النابض بالحياة.', 'Discover, study, and reflect on the Holy Quran with our advanced tools and vibrant community.')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" onClick={handleActionClick}>
                {isSignedIn ? t('ابدأ البحث', 'Start Searching') : t('ابدأ الآن', 'Get Started')}
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">{t('تعرف على المزيد', 'Learn More')}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">{t('ميزات قوية', 'Powerful Features')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: t("بحث متقدم", "Advanced Search"), icon: Search, description: t("ابحث عن الآيات بسرعة باستخدام أدوات البحث القوية", "Find verses quickly with our powerful search tools") },
                { title: t("تلاوات صوتية", "Audio Recitations"), icon: Headphones, description: t("استمع إلى تلاوات جميلة من قراء مشهورين", "Listen to beautiful recitations from renowned Qaris") },
                { title: t("دراسة آية بآية", "Verse-by-Verse Study"), icon: BookMarked, description: t("تعمق في كل آية مع الترجمات والتفاسير", "Deep dive into each verse with translations and tafsir") },
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-background p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="explore" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">{t('استكشف القرآن', 'Explore the Quran')}</h2>
            <Tabs defaultValue="search" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">{t('بحث', 'Search')}</TabsTrigger>
                <TabsTrigger value="browse">{t('تصفح', 'Browse')}</TabsTrigger>
                <TabsTrigger value="recite">{t('استماع', 'Listen')}</TabsTrigger>
              </TabsList>
              <TabsContent value="search" className="mt-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                  <Input
                    type="search"
                    placeholder={t('ابحث في القرآن...', 'Search the Quran...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? t('جاري البحث...', 'Searching...') : t('بحث', 'Search')}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="browse" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((surah) => (
                    <Button key={surah} variant="outline" className="h-auto py-4">
                      {t(`سورة ${surah}`, `Surah ${surah}`)}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="recite" className="mt-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">{t('آية اليوم', "Today's Verse")}</h3>
                  <p className="text-right text-2xl mb-4 leading-relaxed">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="mb-4 italic">
                    {t('"بسم الله الرحمن الرحيم"', '"In the name of Allah, the Entirely Merciful, the Especially Merciful."')}
                  </p>
                  <Button>
                    <Volume2 className="mr-2 h-4 w-4" />
                    {t('استمع للتلاوة', 'Listen to Recitation')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="community" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">{t('انضم إلى مجتمعنا', 'Join Our Community')}</h2>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="bg-background p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">{t('مجموعة تيليجرام', 'Telegram Group')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('انضم إلى مجموعتنا على تيليجرام للنقاشات والتحديثات.', 'Join our Telegram group for discussions and updates.')}
                </p>
                <Button variant="outline" asChild>
                  <Link href="https://t.me/ananalmasri" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('انضم إلى المجموعة', 'Join Group')}
                  </Link>
                </Button>
              </motion.div>
              <motion.div 
                className="bg-background p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">{t('قناة يوتيوب', 'YouTube Channel')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('تابع قناتنا على يوتيوب للحصول على محتوى تعليمي وتلاوات.', 'Follow our YouTube channel for educational content and recitations.')}
                </p>
                <Button variant="outline" asChild>
                  <Link href="https://www.youtube.com/@anan-almasri" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    {t('اشترك في القناة', 'Subscribe to Channel')}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold  mb-6">{t('هل أنت مستعد لبدء رحلتك؟', 'Ready to Start Your Journey?')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t('انضم إلى الآلاف ممن يكتشفون حكمة القرآن كل يوم.', 'Join thousands of others who are discovering the wisdom of the Quran every day.')}
            </p>
            <Button size="lg" onClick={handleActionClick}>
              {isSignedIn ? t('ابدأ البحث', 'Start Searching') : t('ابدأ الآن', 'Get Started Now')}
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-background py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t('مستكشف القرآن', 'Quran Explorer')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('اكتشف حكمة القرآن من خلال أدواتنا المتقدمة ومجتمعنا النابض بالحياة.', 'Discover the wisdom of the Quran through our advanced tools and vibrant community.')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('روابط سريعة', 'Quick Links')}</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary">{t('الميزات', 'Features')}</Link></li>
                <li><Link href="#explore" className="text-sm text-muted-foreground hover:text-primary">{t('استكشف', 'Explore')}</Link></li>
                <li><Link href="#community" className="text-sm text-muted-foreground hover:text-primary">{t('المجتمع', 'Community')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('قانوني', 'Legal')}</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">{t('شروط الخدمة', 'Terms of Service')}</Link></li>
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">{t('سياسة الخصوصية', 'Privacy Policy')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('تواصل', 'Connect')}</h3>
              <ul className="space-y-2">
                <li><Link href="https://t.me/ananalmasri" className="text-sm text-muted-foreground hover:text-primary">Telegram</Link></li>
                <li><Link href="https://www.youtube.com/@anan-almasri" className="text-sm text-muted-foreground hover:text-primary">YouTube</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('مستكشف القرآن. جميع الحقوق محفوظة.', 'Quran Explorer. All rights reserved.')}
          </div>
        </div>
      </footer>
    </div>
  )
}