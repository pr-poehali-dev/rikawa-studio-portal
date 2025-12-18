import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Resource } from "@/types";

const Resources = () => {
  const [isLoggedIn] = useState(true);
  const [language] = useState<'ru' | 'uk' | 'en'>('ru');
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const mockResources: Resource[] = [
    {
      id: "1",
      title: "EconomyPlus - Продвинутая экономика",
      description: "Полноценная система экономики с банками, налогами и аукционом",
      type: "plugin",
      author: { id: "1", displayName: "MasterDev", email: "", balance: 0, totalEarnings: 0, joinedAt: new Date(), isAdmin: false, isOwner: false, stats: { resources: 12, topics: 45, messages: 230, downloads: 3400, timeOnSite: 0 } },
      price: 500,
      downloads: 1248,
      rating: 4.8,
      trustScore: 95,
      minecraftVersions: ["1.20.x", "1.19.x", "1.18.x"],
      tags: ["экономика", "плагин", "spigot"],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-12-10"),
      isPaid: true,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "2",
      title: "ShaderPack Ultra HD",
      description: "Реалистичные шейдеры с поддержкой RTX",
      type: "shader",
      author: { id: "2", displayName: "GraphicsGuru", email: "", balance: 0, totalEarnings: 0, joinedAt: new Date(), isAdmin: false, isOwner: false, stats: { resources: 8, topics: 12, messages: 89, downloads: 5600, timeOnSite: 0 } },
      price: 0,
      downloads: 5634,
      rating: 4.9,
      trustScore: 98,
      minecraftVersions: ["1.20.x", "1.19.x"],
      tags: ["шейдеры", "графика", "OptiFine"],
      createdAt: new Date("2024-02-20"),
      updatedAt: new Date("2024-12-15"),
      isPaid: false,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Survival+ Конфиг",
      description: "Готовая конфигурация для выживания с квестами",
      type: "config",
      author: { id: "3", displayName: "ConfigMaster", email: "", balance: 0, totalEarnings: 0, joinedAt: new Date(), isAdmin: true, isOwner: false, stats: { resources: 25, topics: 67, messages: 456, downloads: 8900, timeOnSite: 0 } },
      price: 300,
      downloads: 892,
      rating: 4.6,
      trustScore: 88,
      minecraftVersions: ["1.20.x"],
      tags: ["конфиг", "выживание", "квесты"],
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-12-01"),
      isPaid: true,
      imageUrl: "/placeholder.svg"
    }
  ];

  const getTrustBadge = (score: number) => {
    if (score >= 90) return { label: "Проверено", color: "bg-primary text-primary-foreground" };
    if (score >= 70) return { label: "Надёжно", color: "bg-accent text-accent-foreground" };
    return { label: "Новое", color: "bg-muted text-muted-foreground" };
  };

  const filteredResources = mockResources.filter(r => 
    filterType === "all" || r.type === filterType
  );

  return (
    <Layout isLoggedIn={isLoggedIn} language={language}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-pixel text-primary terminal-glow mb-2">Ресурсы</h1>
            <p className="text-muted-foreground">Плагины, моды, конфиги и другие материалы сообщества</p>
          </div>
          
          {isLoggedIn && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить ресурс
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-primary/20 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-pixel text-sm text-primary">Публикация ресурса</DialogTitle>
                  <DialogDescription>
                    Поделитесь своей работой с сообществом
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Название ресурса</Label>
                    <Input placeholder="Например: SuperPlugin v2.0" className="bg-muted border-border" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Тип ресурса</Label>
                    <Select>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plugin">Плагин</SelectItem>
                        <SelectItem value="mod">Мод</SelectItem>
                        <SelectItem value="config">Конфиг</SelectItem>
                        <SelectItem value="shader">Шейдер</SelectItem>
                        <SelectItem value="build">Сборка</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Textarea 
                      placeholder="Подробно опишите ваш ресурс, его возможности и особенности..."
                      className="bg-muted border-border min-h-32"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Версии Minecraft</Label>
                      <Input placeholder="1.20.x, 1.19.x" className="bg-muted border-border" />
                      <p className="text-xs text-muted-foreground">Через запятую</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Теги</Label>
                      <Input placeholder="экономика, pvp, rpg" className="bg-muted border-border" />
                      <p className="text-xs text-muted-foreground">Для удобного поиска</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Цена (₽)</Label>
                    <Input type="number" placeholder="0 для бесплатного" className="bg-muted border-border" />
                    <p className="text-xs text-destructive">Комиссия платформы: 15%</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Файл ресурса</Label>
                    <Input type="file" className="bg-muted border-border" />
                  </div>

                  <div className="bg-muted/50 p-4 rounded border border-border space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="AlertCircle" size={18} className="text-accent mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-semibold text-foreground mb-1">Перед публикацией проверьте:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Файл не содержит вредоносного кода</li>
                          <li>Указаны корректные версии Minecraft</li>
                          <li>Описание подробное и понятное</li>
                          <li>Вы имеете право на публикацию</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Опубликовать ресурс
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Tabs value={filterType} onValueChange={setFilterType} className="flex-1">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="plugin">Плагины</TabsTrigger>
              <TabsTrigger value="mod">Моды</TabsTrigger>
              <TabsTrigger value="config">Конфиги</TabsTrigger>
              <TabsTrigger value="shader">Шейдеры</TabsTrigger>
              <TabsTrigger value="build">Сборки</TabsTrigger>
              <TabsTrigger value="other">Другое</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="recent">Новые</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="downloads">По скачиваниям</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const trustBadge = getTrustBadge(resource.trustScore);
            return (
              <Link key={resource.id} to={`/resources/${resource.id}`}>
                <Card className="card-glow border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all h-full group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="border-primary/50 text-primary capitalize">
                        {resource.type}
                      </Badge>
                      <Badge className={trustBadge.color}>
                        <Icon name="ShieldCheck" size={12} className="mr-1" />
                        {trustBadge.label}
                      </Badge>
                    </div>

                    <CardTitle className="text-primary group-hover:terminal-glow transition-all line-clamp-2">
                      {resource.title}
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-3">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="User" size={14} />
                      <span>{resource.author.displayName}</span>
                      {resource.author.isAdmin && (
                        <Badge variant="outline" className="border-accent/50 text-accent text-xs">
                          <Icon name="Shield" size={10} className="mr-1" />
                          Админ
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.minecraftVersions.slice(0, 3).map((ver, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {ver}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Download" size={14} />
                          {resource.downloads}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-accent" />
                          {resource.rating}
                        </div>
                      </div>
                      
                      {resource.isPaid ? (
                        <span className="font-bold text-primary">{resource.price}₽</span>
                      ) : (
                        <Badge className="bg-primary/10 text-primary">Бесплатно</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <Card className="card-glow border-primary/20 bg-card/80 p-12 text-center">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-pixel text-primary mb-2">Ресурсов не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры или будьте первым, кто добавит ресурс!</p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
