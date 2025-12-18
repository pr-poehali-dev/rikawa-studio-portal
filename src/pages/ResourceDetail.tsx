import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const ResourceDetail = () => {
  const { id } = useParams();
  const [isLoggedIn] = useState(true);
  const [language] = useState<'ru' | 'uk' | 'en'>('ru');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const resource = {
    id: id || "1",
    title: "EconomyPlus - Продвинутая экономика",
    description: "Полноценная система экономики для вашего сервера с поддержкой банков, налогов, аукциона и магазинов. Включает API для интеграции с другими плагинами.",
    type: "plugin",
    author: { 
      id: "1", 
      displayName: "MasterDev",
      isAdmin: false,
      prefix: { id: "1", label: "★ Разработчик", color: "#22c55e", isSpecial: false }
    },
    price: 500,
    downloads: 1248,
    rating: 4.8,
    reviews: 87,
    trustScore: 95,
    minecraftVersions: ["1.20.x", "1.19.x", "1.18.x"],
    tags: ["экономика", "плагин", "spigot", "paper"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-10"),
    isPaid: true,
    changelog: [
      { version: "2.1.0", date: "2024-12-10", changes: ["Добавлена поддержка 1.20.x", "Исправлены ошибки аукциона", "Оптимизация производительности"] },
      { version: "2.0.5", date: "2024-11-20", changes: ["Исправление критических багов", "Добавлен API для разработчиков"] }
    ]
  };

  return (
    <Layout isLoggedIn={isLoggedIn} language={language}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-primary/50 text-primary capitalize">
                    {resource.type}
                  </Badge>
                  <Badge className="bg-primary/10 text-primary">
                    <Icon name="ShieldCheck" size={12} className="mr-1" />
                    Проверено (95%)
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-pixel text-primary terminal-glow mb-3">
                  {resource.title}
                </h1>
                <Link to={`/profile/${resource.author.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="User" size={16} />
                  <span style={{ color: resource.author.prefix?.color }}>{resource.author.prefix?.label}</span>
                  <span>{resource.author.displayName}</span>
                </Link>
              </div>
            </div>

            <Card className="card-glow border-primary/20 bg-card/80">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
                
                <Separator className="my-4 bg-border" />
                
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="changelog">Обновления</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы ({resource.reviews})</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card className="card-glow border-primary/20 bg-card/80">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-pixel text-sm text-primary mb-3">Возможности</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-primary mt-1" />
                          <span>Полная система экономики с множественными валютами</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-primary mt-1" />
                          <span>Банковская система с процентами и кредитами</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-primary mt-1" />
                          <span>Аукцион для торговли между игроками</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-primary mt-1" />
                          <span>API для интеграции с другими плагинами</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="changelog">
                <Card className="card-glow border-primary/20 bg-card/80">
                  <CardContent className="p-6 space-y-4">
                    {resource.changelog.map((log, idx) => (
                      <div key={idx} className="pb-4 border-b border-border last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-primary/10 text-primary">{log.version}</Badge>
                          <span className="text-sm text-muted-foreground">{log.date}</span>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {log.changes.map((change, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="Minus" size={14} className="mt-1" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="card-glow border-primary/20 bg-card/80">
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground py-8">Отзывы будут доступны после покупки</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="card-glow border-primary/20 bg-card/80 sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {resource.isPaid ? `${resource.price}₽` : "Бесплатно"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "border-accent text-accent" : ""}
                  >
                    <Icon name={isFavorite ? "Heart" : "Heart"} size={16} className="mr-2" />
                    В избранное
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={isSubscribed ? "border-primary text-primary" : ""}
                  >
                    <Icon name="Bell" size={16} className="mr-2" />
                    {isSubscribed ? "Подписан" : "Подписаться"}
                  </Button>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
                      <Icon name="Flag" size={16} className="mr-2" />
                      Пожаловаться
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-primary/20">
                    <DialogHeader>
                      <DialogTitle className="font-pixel text-sm text-primary">Пожаловаться на ресурс</DialogTitle>
                      <DialogDescription>
                        Укажите причину жалобы
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select>
                        <SelectTrigger className="bg-muted border-border">
                          <SelectValue placeholder="Выберите причину" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="virus">Содержит вирусы</SelectItem>
                          <SelectItem value="stolen">Украденный контент</SelectItem>
                          <SelectItem value="broken">Не работает</SelectItem>
                          <SelectItem value="misleading">Вводящее описание</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea placeholder="Дополнительная информация..." className="bg-muted border-border" />
                      <Button className="w-full bg-destructive hover:bg-destructive/90">
                        Отправить жалобу
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Separator className="bg-border" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Скачиваний</span>
                    <span className="font-bold">{resource.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Рейтинг</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-accent" />
                      <span className="font-bold">{resource.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Обновлено</span>
                    <span className="font-bold">{resource.updatedAt.toLocaleDateString()}</span>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <h4 className="font-pixel text-xs text-primary mb-2">Версии Minecraft</h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.minecraftVersions.map((ver, idx) => (
                      <Badge key={idx} variant="secondary">{ver}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetail;
