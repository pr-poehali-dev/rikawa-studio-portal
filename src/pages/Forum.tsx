import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const Forum = () => {
  const [isLoggedIn] = useState(true);
  const [language] = useState<'ru' | 'uk' | 'en'>('ru');

  const topics = [
    {
      id: "1",
      title: "Как настроить LuckPerms на Paper 1.20?",
      author: { displayName: "NewAdmin", prefix: { label: "Новичок", color: "#8E9196" } },
      category: "Помощь",
      replies: 12,
      views: 234,
      isPinned: false,
      isLocked: false,
      lastReply: new Date("2024-12-18T10:30:00"),
      tags: ["luckperms", "paper", "права"]
    },
    {
      id: "2",
      title: "[ОБЪЯВЛЕНИЕ] Обновление платформы - новые возможности",
      author: { displayName: "RikawaTeam", prefix: { label: "👑 Владелец", color: "#ef4444" } },
      category: "Новости",
      replies: 45,
      views: 1203,
      isPinned: true,
      isLocked: false,
      lastReply: new Date("2024-12-18T14:15:00"),
      tags: ["объявление", "обновление"]
    },
    {
      id: "3",
      title: "Лучшие плагины для экономики 2024",
      author: { displayName: "ServerPro", prefix: { label: "★ Эксперт", color: "#8b5cf6" } },
      category: "Обсуждения",
      replies: 28,
      views: 567,
      isPinned: false,
      isLocked: false,
      lastReply: new Date("2024-12-18T12:45:00"),
      tags: ["экономика", "плагины", "рекомендации"]
    }
  ];

  return (
    <Layout isLoggedIn={isLoggedIn} language={language}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-pixel text-primary terminal-glow mb-2">Форум</h1>
            <p className="text-muted-foreground">Обсуждения, вопросы и помощь сообщества</p>
          </div>
          
          {isLoggedIn && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать тему
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-primary/20 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-pixel text-sm text-primary">Новая тема</DialogTitle>
                  <DialogDescription>Создайте тему для обсуждения</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок темы</Label>
                    <Input placeholder="Кратко опишите суть вопроса" className="bg-muted border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="help">Помощь</SelectItem>
                        <SelectItem value="discussion">Обсуждения</SelectItem>
                        <SelectItem value="showcase">Витрина проектов</SelectItem>
                        <SelectItem value="suggestions">Предложения</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Содержание</Label>
                    <Textarea 
                      placeholder="Подробно опишите вопрос или тему для обсуждения..."
                      className="bg-muted border-border min-h-40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Теги</Label>
                    <Input placeholder="плагины, помощь, конфиг" className="bg-muted border-border" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Создать тему
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-6">
          <Card className="card-glow border-primary/20 bg-card/80">
            <CardHeader>
              <CardTitle className="text-primary text-2xl">1,234</CardTitle>
              <CardDescription>Активных тем</CardDescription>
            </CardHeader>
          </Card>
          <Card className="card-glow border-accent/20 bg-card/80">
            <CardHeader>
              <CardTitle className="text-accent text-2xl">8,945</CardTitle>
              <CardDescription>Сообщений</CardDescription>
            </CardHeader>
          </Card>
          <Card className="card-glow border-primary/20 bg-card/80">
            <CardHeader>
              <CardTitle className="text-primary text-2xl">567</CardTitle>
              <CardDescription>Участников</CardDescription>
            </CardHeader>
          </Card>
          <Card className="card-glow border-muted/20 bg-card/80">
            <CardHeader>
              <CardTitle className="text-foreground text-2xl">125</CardTitle>
              <CardDescription>Онлайн сейчас</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-3">
          {topics.map((topic) => (
            <Link key={topic.id} to={`/forum/${topic.id}`}>
              <Card className="card-glow border-primary/20 bg-card/80 hover:border-primary/40 transition-all group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {topic.isPinned && (
                          <Icon name="Pin" size={16} className="text-accent" />
                        )}
                        {topic.isLocked && (
                          <Icon name="Lock" size={16} className="text-muted-foreground" />
                        )}
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {topic.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                          {topic.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={14} />
                          <span style={{ color: topic.author.prefix.color }}>{topic.author.prefix.label}</span>
                          <span>{topic.author.displayName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="MessageSquare" size={14} />
                          {topic.replies} ответов
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          {topic.views} просмотров
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {topic.lastReply.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex gap-1 flex-wrap">
                        {topic.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">#{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Forum;
