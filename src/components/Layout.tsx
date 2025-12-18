import { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Language } from "@/types";
import { useTranslation } from "@/lib/translations";

interface LayoutProps {
  children: ReactNode;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

const Layout = ({ children, isLoggedIn = false, onLogin, language = 'ru', onLanguageChange }: LayoutProps) => {
  const t = useTranslation(language);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);

  const mainNav = [
    { label: t('nav.home'), path: '/', icon: 'Home' },
    { label: t('nav.services'), path: '/services', icon: 'Briefcase' },
    { label: t('nav.generators'), path: '/generators', icon: 'Wrench' },
    { label: t('nav.resources'), path: '/resources', icon: 'Package' },
    { label: t('nav.forum'), path: '/forum', icon: 'MessageSquare' },
    { label: t('nav.tools'), path: '/tools', icon: 'Settings' },
    { label: t('nav.shop'), path: '/shop', icon: 'ShoppingBag' },
    { label: t('nav.support'), path: '/support', icon: 'LifeBuoy' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <Icon name="Terminal" size={20} className="text-primary terminal-glow" />
                </div>
                <h1 className="text-lg md:text-xl font-pixel text-primary terminal-glow hidden sm:block">RikawaStudio</h1>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-card border-primary/20 w-64">
                  <nav className="flex flex-col gap-2 mt-8">
                    {mainNav.map((item) => (
                      <Link key={item.path} to={item.path}>
                        <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                          <Icon name={item.icon} size={18} className="mr-3" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-md hidden lg:block">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={(val) => onLanguageChange?.(val as Language)}>
                <SelectTrigger className="w-16 h-9 bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>

              {isLoggedIn ? (
                <>
                  <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
                    <Icon name="Bell" size={20} />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-xs">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                  <Button variant="outline" className="border-primary/50" onClick={() => navigate('/profile')}>
                    <Icon name="User" size={16} className="mr-2" />
                    <span className="hidden sm:inline">{t('user.profile')}</span>
                  </Button>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Icon name="LogIn" size={16} className="mr-2" />
                      {t('auth.login')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-primary/20">
                    <DialogHeader>
                      <DialogTitle className="font-pixel text-sm text-primary">{t('auth.login')}</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Войдите для доступа ко всем возможностям платформы
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Email" className="bg-muted border-border" />
                      <Input type="password" placeholder="Пароль" className="bg-muted border-border" />
                      <Button className="w-full bg-primary hover:bg-primary/90" onClick={onLogin}>
                        {t('auth.login')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 mt-3 overflow-x-auto pb-2">
            {mainNav.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary whitespace-nowrap">
                  <Icon name={item.icon} size={14} className="mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="min-h-[calc(100vh-200px)]">{children}</main>

      <footer className="border-t border-primary/20 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 border border-primary flex items-center justify-center">
                  <Icon name="Terminal" size={16} className="text-primary" />
                </div>
                <span className="font-pixel text-sm text-primary">RikawaStudio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Цифровая студия для Minecraft-проектов
              </p>
            </div>
            
            <div>
              <h3 className="font-pixel text-xs text-primary mb-4">Платформа</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/resources" className="hover:text-primary">Ресурсы</Link></li>
                <li><Link to="/forum" className="hover:text-primary">Форум</Link></li>
                <li><Link to="/shop" className="hover:text-primary">Магазин</Link></li>
                <li><Link to="/status" className="hover:text-primary">Статус</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-pixel text-xs text-primary mb-4">Инструменты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/generators" className="hover:text-primary">Генераторы</Link></li>
                <li><Link to="/tools" className="hover:text-primary">Утилиты</Link></li>
                <li><Link to="/services" className="hover:text-primary">Услуги</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-pixel text-xs text-primary mb-4">Связь</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://vk.ru/rikawastudio" target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-2">
                    <Icon name="ExternalLink" size={14} />
                    VK
                  </a>
                </li>
                <li><Link to="/support" className="hover:text-primary">Поддержка</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 RikawaStudio. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
