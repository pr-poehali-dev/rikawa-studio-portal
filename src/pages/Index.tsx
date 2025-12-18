import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [gradientColors, setGradientColors] = useState<string[]>(["#22c55e", "#8b5cf6"]);
  const [gradientText, setGradientText] = useState("RikawaStudio");
  const [commandType, setCommandType] = useState("luckperms");
  const [commandParams, setCommandParams] = useState({ user: "", permission: "" });

  const services = [
    {
      icon: "Code",
      title: "Разработка плагинов",
      description: "Создание кастомных плагинов под ваши требования с полной документацией",
      price: "от 3000₽"
    },
    {
      icon: "Globe",
      title: "Веб-сайты",
      description: "Создание сайтов для Minecraft-проектов с админ-панелью и интеграциями",
      price: "от 5000₽"
    },
    {
      icon: "Sparkles",
      title: "Генераторы и утилиты",
      description: "Разработка инструментов для администрирования и оформления серверов",
      price: "от 2000₽"
    },
    {
      icon: "Palette",
      title: "Оформление сообществ",
      description: "Дизайн и настройка Discord, VK, оформление игровых интерфейсов",
      price: "от 1500₽"
    }
  ];

  const generateGradientCommand = () => {
    const colors = gradientColors.map(c => c.replace("#", ""));
    return `<gradient:${colors.join(":")}>${gradientText}</gradient>`;
  };

  const generateCommand = () => {
    if (commandType === "luckperms") {
      return `/lp user ${commandParams.user} permission set ${commandParams.permission}`;
    } else if (commandType === "essentials") {
      return `/give ${commandParams.user} diamond 64`;
    }
    return "";
  };

  const addGradientColor = () => {
    setGradientColors([...gradientColors, "#ffffff"]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 border-2 border-primary flex items-center justify-center">
                <Icon name="Terminal" size={20} className="text-primary terminal-glow" />
              </div>
              <h1 className="text-xl font-pixel text-primary terminal-glow">RikawaStudio</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setActiveSection("home")}
              >
                Главная
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setActiveSection("services")}
              >
                Услуги
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setActiveSection("generators")}
              >
                Генераторы
              </Button>
              <a href="https://vk.ru/rikawastudio" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  VK
                </Button>
              </a>
            </nav>

            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Icon name="LogIn" size={16} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-primary/20">
                    <DialogHeader>
                      <DialogTitle className="font-pixel text-sm text-primary">Вход в систему</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Войдите в личный кабинет для управления заказами
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="login">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="user@example.com" className="bg-muted border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Пароль</Label>
                          <Input id="password" type="password" className="bg-muted border-border" />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsLoggedIn(true)}>
                          Войти
                        </Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="display-name">Отображаемое имя</Label>
                          <Input id="display-name" placeholder="Ваше имя на сайте" className="bg-muted border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email</Label>
                          <Input id="reg-email" type="email" placeholder="user@example.com" className="bg-muted border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Пароль</Label>
                          <Input id="reg-password" type="password" className="bg-muted border-border" />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsLoggedIn(true)}>
                          Создать аккаунт
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button variant="outline" className="border-primary/50" onClick={() => setActiveSection("dashboard")}>
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === "home" && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-20">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                <Icon name="Zap" size={14} className="mr-1" />
                Цифровая студия для Minecraft
              </Badge>
              <h2 className="text-4xl md:text-6xl font-pixel text-primary terminal-glow leading-tight">
                Системы<br />и инструменты<br />для вашего проекта
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
                Мы работаем не с шаблонами, а с архитектурой, логикой и атмосферой игровых миров
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setActiveSection("services")}>
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  Наши услуги
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50" onClick={() => setActiveSection("generators")}>
                  <Icon name="Wrench" size={18} className="mr-2" />
                  Генераторы
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="card-glow border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">42+ проекта</CardTitle>
                  <CardDescription>Выполненных заказов с полной документацией</CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-glow border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 border border-accent flex items-center justify-center mb-4">
                    <Icon name="Activity" size={24} className="text-accent" />
                  </div>
                  <CardTitle className="text-accent">Активная студия</CardTitle>
                  <CardDescription>Работаем 24/7 над вашими проектами</CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-glow border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-destructive/10 border border-destructive flex items-center justify-center mb-4">
                    <Icon name="Shield" size={24} className="text-destructive" />
                  </div>
                  <CardTitle className="text-destructive">Гарантия качества</CardTitle>
                  <CardDescription>Поддержка после запуска проекта</CardDescription>
                </CardHeader>
              </Card>
            </section>

            <section className="bg-card/50 border border-primary/20 p-8 rounded-lg card-glow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 border border-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-pixel text-primary mb-3">О студии</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    RikawaStudio — это цифровая студия, создающая системы и инструменты для Minecraft-проектов.
                    Мы работаем не с шаблонами и быстрыми решениями, а с архитектурой, логикой и атмосферой игровых миров.
                    Плагины, сайты, генераторы, оформление сообществ — всё создаётся как единый организм.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === "services" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-pixel text-primary terminal-glow">Услуги</h2>
              <p className="text-muted-foreground">Выберите направление для вашего проекта</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <Card key={idx} className="card-glow border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center group-hover:bg-primary/20 transition-all">
                        <Icon name={service.icon} size={24} className="text-primary" />
                      </div>
                      <Badge variant="outline" className="border-primary/50 text-primary">{service.price}</Badge>
                    </div>
                    <CardTitle className="text-primary">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Заказать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-primary/20">
                        <DialogHeader>
                          <DialogTitle className="font-pixel text-sm text-primary">Оформление заказа</DialogTitle>
                          <DialogDescription>
                            Заказ услуги: {service.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Способ связи</Label>
                            <Select>
                              <SelectTrigger className="bg-muted border-border">
                                <SelectValue placeholder="Выберите способ связи" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vk">VK</SelectItem>
                                <SelectItem value="telegram">Telegram</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Ваш контакт (ссылка или username)</Label>
                            <Input placeholder="https://vk.com/id123 или @username" className="bg-muted border-border" />
                          </div>
                          <div className="space-y-2">
                            <Label>Опишите ваши пожелания</Label>
                            <Textarea 
                              placeholder="Расскажите подробнее о проекте, что вы хотите получить..." 
                              className="bg-muted border-border min-h-32"
                            />
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Отправить заявку
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "generators" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-pixel text-primary terminal-glow">Генераторы</h2>
              <p className="text-muted-foreground">Практические инструменты для администраторов</p>
            </div>

            <Tabs defaultValue="gradient" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
                <TabsTrigger value="gradient">Генератор градиентов</TabsTrigger>
                <TabsTrigger value="commands">Генератор команд</TabsTrigger>
              </TabsList>

              <TabsContent value="gradient">
                <Card className="card-glow-purple border-accent/20 bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-accent">Генератор градиентов</CardTitle>
                    <CardDescription>Создавайте красивые градиенты для текста в Minecraft</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Текст</Label>
                      <Input 
                        value={gradientText} 
                        onChange={(e) => setGradientText(e.target.value)}
                        className="bg-muted border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Цвета градиента</Label>
                        <Button size="sm" variant="outline" onClick={addGradientColor}>
                          <Icon name="Plus" size={16} className="mr-1" />
                          Добавить цвет
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {gradientColors.map((color, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input 
                              type="color" 
                              value={color}
                              onChange={(e) => {
                                const newColors = [...gradientColors];
                                newColors[idx] = e.target.value;
                                setGradientColors(newColors);
                              }}
                              className="w-16 h-10 p-1 bg-muted border-border cursor-pointer"
                            />
                            <Input 
                              value={color}
                              onChange={(e) => {
                                const newColors = [...gradientColors];
                                newColors[idx] = e.target.value;
                                setGradientColors(newColors);
                              }}
                              className="flex-1 bg-muted border-border"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-border" />

                    <div className="space-y-2">
                      <Label>Предпросмотр</Label>
                      <div 
                        className="p-6 rounded-lg border border-accent/20 bg-black/50 text-center overflow-hidden"
                        style={{
                          background: `linear-gradient(90deg, ${gradientColors.join(", ")}), #000`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          maxWidth: "100%"
                        }}
                      >
                        <span className="text-2xl font-bold break-all">{gradientText}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Готовая команда</Label>
                      <div className="bg-muted p-4 rounded border border-border font-mono text-sm break-all">
                        {generateGradientCommand()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="commands">
                <Card className="card-glow-purple border-accent/20 bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-accent">Генератор команд</CardTitle>
                    <CardDescription>Генерация популярных Minecraft команд</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Тип команды</Label>
                      <Select value={commandType} onValueChange={setCommandType}>
                        <SelectTrigger className="bg-muted border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luckperms">LuckPerms - права</SelectItem>
                          <SelectItem value="essentials">Essentials - предметы</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {commandType === "luckperms" && (
                      <>
                        <div className="space-y-2">
                          <Label>Никнейм игрока</Label>
                          <Input 
                            value={commandParams.user}
                            onChange={(e) => setCommandParams({...commandParams, user: e.target.value})}
                            placeholder="Steve"
                            className="bg-muted border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Право доступа</Label>
                          <Input 
                            value={commandParams.permission}
                            onChange={(e) => setCommandParams({...commandParams, permission: e.target.value})}
                            placeholder="essentials.fly"
                            className="bg-muted border-border"
                          />
                        </div>
                      </>
                    )}

                    {commandType === "essentials" && (
                      <div className="space-y-2">
                        <Label>Никнейм игрока</Label>
                        <Input 
                          value={commandParams.user}
                          onChange={(e) => setCommandParams({...commandParams, user: e.target.value})}
                          placeholder="Steve"
                          className="bg-muted border-border"
                        />
                      </div>
                    )}

                    <Separator className="bg-border" />

                    <div className="space-y-2">
                      <Label>Готовая команда</Label>
                      <div className="bg-muted p-4 rounded border border-border font-mono text-sm break-all">
                        {generateCommand() || "Заполните параметры выше"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === "dashboard" && isLoggedIn && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-pixel text-primary terminal-glow">Личный кабинет</h2>
              <p className="text-muted-foreground">Управление заказами и профилем</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-glow border-primary/20 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-primary">Активных заказов</CardTitle>
                  <div className="text-4xl font-bold text-primary terminal-glow">3</div>
                </CardHeader>
              </Card>
              <Card className="card-glow border-accent/20 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-accent">Завершённых</CardTitle>
                  <div className="text-4xl font-bold text-accent">12</div>
                </CardHeader>
              </Card>
              <Card className="card-glow border-muted/20 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">Всего потрачено</CardTitle>
                  <div className="text-4xl font-bold text-foreground">48,500₽</div>
                </CardHeader>
              </Card>
            </div>

            <Card className="card-glow border-primary/20 bg-card/80">
              <CardHeader>
                <CardTitle className="text-primary">История заказов</CardTitle>
                <CardDescription>Все ваши заказы с подробной информацией</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "#001", title: "Разработка плагина для экономики", status: "В работе", stage: "Тестирование", color: "accent" },
                    { id: "#002", title: "Создание сайта для проекта", status: "Завершён", stage: "Передан клиенту", color: "primary" },
                    { id: "#003", title: "Генератор конфигов", status: "Ожидание", stage: "Уточнение деталей", color: "destructive" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50 hover:bg-muted transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full bg-${order.color} animate-glow-pulse`} />
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">{order.id}</div>
                          <div className="font-semibold text-foreground">{order.title}</div>
                          <div className="text-sm text-muted-foreground">{order.stage}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`border-${order.color}/50 text-${order.color}`}>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-primary/20 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 border border-primary flex items-center justify-center">
                <Icon name="Terminal" size={16} className="text-primary" />
              </div>
              <span className="font-pixel text-sm text-primary">RikawaStudio</span>
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              Официальная группа: <a href="https://vk.ru/rikawastudio" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vk.ru/rikawastudio</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 RikawaStudio. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
