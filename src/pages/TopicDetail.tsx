import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const TopicDetail = () => {
  const { id } = useParams();
  const [isLoggedIn] = useState(true);
  const [language] = useState<'ru' | 'uk' | 'en'>('ru');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const topic = {
    id: id || "1",
    title: "Как настроить LuckPerms на Paper 1.20?",
    content: "Привет! Помогите разобраться с настройкой LuckPerms на Paper 1.20. Установил плагин, но не понимаю как правильно настроить группы и права. Есть у кого рабочий конфиг?",
    author: { displayName: "NewAdmin", prefix: { label: "Новичок", color: "#8E9196" } },
    category: "Помощь",
    replies: [
      {
        id: "1",
        content: "Начни с базовой настройки. Создай группы через /lp creategroup <название>. Потом добавь права через /lp group <группа> permission set <право>",
        author: { displayName: "ServerPro", prefix: { label: "★ Эксперт", color: "#8b5cf6" } },
        createdAt: new Date("2024-12-18T10:35:00")
      },
      {
        id: "2",
        content: "Еще рекомендую почитать официальную документацию на luckperms.net - там все очень подробно расписано с примерами.",
        author: { displayName: "HelpfulUser", prefix: { label: "Активист", color: "#22c55e" } },
        createdAt: new Date("2024-12-18T10:40:00")
      }
    ],
    createdAt: new Date("2024-12-18T10:30:00"),
    views: 234,
    tags: ["luckperms", "paper", "права"]
  };

  return (
    <Layout isLoggedIn={isLoggedIn} language={language}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Badge variant="outline" className="border-primary/50 text-primary mb-3">
            {topic.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-pixel text-primary terminal-glow mb-4">
            {topic.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Icon name="User" size={14} />
              <span style={{ color: topic.author.prefix.color }}>{topic.author.prefix.label}</span>
              <span>{topic.author.displayName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageSquare" size={14} />
              {topic.replies.length} ответов
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              {topic.views} просмотров
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              {topic.createdAt.toLocaleString()}
            </div>
          </div>
          <div className="flex gap-1 flex-wrap mt-3">
            {topic.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">#{tag}</Badge>
            ))}
          </div>
        </div>

        <Card className="card-glow border-primary/20 bg-card/80 mb-6">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{topic.content}</p>
            <Separator className="my-4 bg-border" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="ThumbsUp" size={14} className="mr-2" />
                  Полезно (12)
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Share2" size={14} className="mr-2" />
                  Поделиться
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={isSubscribed ? "border-primary text-primary" : ""}
              >
                <Icon name="Bell" size={14} className="mr-2" />
                {isSubscribed ? "Подписан" : "Подписаться"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-pixel text-primary">Ответы ({topic.replies.length})</h2>
          {topic.replies.map((reply) => (
            <Card key={reply.id} className="card-glow border-primary/20 bg-card/80">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: reply.author.prefix.color }} className="font-semibold text-sm">
                        {reply.author.prefix.label}
                      </span>
                      <span className="font-semibold">{reply.author.displayName}</span>
                      <span className="text-xs text-muted-foreground">
                        {reply.createdAt.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{reply.content}</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="ghost" size="sm">
                        <Icon name="ThumbsUp" size={14} className="mr-1" />
                        5
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Ответить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isLoggedIn && (
          <Card className="card-glow border-primary/20 bg-card/80">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-pixel text-sm text-primary">Ваш ответ</h3>
              <Textarea 
                placeholder="Напишите ваш ответ..."
                className="bg-muted border-border min-h-32"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить ответ
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TopicDetail;
