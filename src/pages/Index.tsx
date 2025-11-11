import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FlashCard {
  id: number;
  word: string;
  translation: string;
  learned: boolean;
}

const initialCards: FlashCard[] = [
  { id: 1, word: 'Hello', translation: 'Привет', learned: false },
  { id: 2, word: 'World', translation: 'Мир', learned: false },
  { id: 3, word: 'Learn', translation: 'Учить', learned: false },
  { id: 4, word: 'Study', translation: 'Изучать', learned: false },
  { id: 5, word: 'Book', translation: 'Книга', learned: false },
  { id: 6, word: 'Teacher', translation: 'Учитель', learned: false },
  { id: 7, word: 'Student', translation: 'Ученик', learned: false },
  { id: 8, word: 'School', translation: 'Школа', learned: false },
];

const idioms = [
  { id: 1, idiom: 'Break a leg', meaning: 'Удачи (перед выступлением)', example: 'Break a leg on your presentation!' },
  { id: 2, idiom: 'Piece of cake', meaning: 'Проще простого', example: 'This test was a piece of cake.' },
  { id: 3, idiom: 'Hit the books', meaning: 'Начать заниматься', example: 'I need to hit the books tonight.' },
];

const grammarTopics = [
  { id: 1, title: 'Present Simple', description: 'Простое настоящее время для регулярных действий', icon: 'Clock' },
  { id: 2, title: 'Past Simple', description: 'Простое прошедшее время для завершённых действий', icon: 'History' },
  { id: 3, title: 'Future Simple', description: 'Простое будущее время для планов и предсказаний', icon: 'CalendarDays' },
  { id: 4, title: 'Present Continuous', description: 'Настоящее длительное время для действий в процессе', icon: 'Play' },
];

const Index = () => {
  const [cards, setCards] = useState<FlashCard[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardFlip = (id: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const markAsLearned = (id: number) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, learned: !card.learned } : card))
    );
  };

  const learnedCount = cards.filter((card) => card.learned).length;
  const progress = (learnedCount / cards.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Languages" size={48} className="text-primary" />
            EnglishMaster
          </h1>
          <p className="text-xl text-muted-foreground">
            Твой персональный путь к свободному английскому
          </p>
        </header>

        <Tabs defaultValue="cards" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-auto p-1">
            <TabsTrigger value="cards" className="flex flex-col gap-1 py-3">
              <Icon name="Layers" size={20} />
              <span className="text-xs">Карточки</span>
            </TabsTrigger>
            <TabsTrigger value="dictionary" className="flex flex-col gap-1 py-3">
              <Icon name="BookOpen" size={20} />
              <span className="text-xs">Словарь</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex flex-col gap-1 py-3">
              <Icon name="TrendingUp" size={20} />
              <span className="text-xs">Прогресс</span>
            </TabsTrigger>
            <TabsTrigger value="idioms" className="flex flex-col gap-1 py-3">
              <Icon name="Lightbulb" size={20} />
              <span className="text-xs">Идиомы</span>
            </TabsTrigger>
            <TabsTrigger value="grammar" className="flex flex-col gap-1 py-3">
              <Icon name="GraduationCap" size={20} />
              <span className="text-xs">Грамматика</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Изучай слова с карточками
              </h2>
              <p className="text-muted-foreground">Нажми на карточку, чтобы увидеть перевод</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="relative h-48 cursor-pointer group"
                    style={{ perspective: '1000px' }}
                    onClick={() => handleCardFlip(card.id)}
                  >
                    <div
                      className={`absolute w-full h-full transition-all duration-600 ${
                        flippedCards.has(card.id) ? '[transform:rotateY(180deg)]' : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <Card
                        className={`absolute w-full h-full flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-xl transition-shadow ${
                          card.learned ? 'border-accent border-2' : 'border-2'
                        }`}
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <div className="text-center">
                          <p className="text-4xl font-heading font-bold text-primary mb-2">
                            {card.word}
                          </p>
                          <p className="text-sm text-muted-foreground">Нажми для перевода</p>
                        </div>
                        {card.learned && (
                          <Badge className="absolute top-3 right-3 bg-accent">
                            <Icon name="Check" size={14} />
                          </Badge>
                        )}
                      </Card>

                      <Card
                        className="absolute w-full h-full flex flex-col items-center justify-center p-6 shadow-lg border-2 border-secondary"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="text-center">
                          <p className="text-4xl font-heading font-bold text-secondary mb-2">
                            {card.translation}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">Русский перевод</p>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsLearned(card.id);
                    }}
                    variant={card.learned ? 'default' : 'outline'}
                    className="w-full mt-3"
                  >
                    {card.learned ? (
                      <>
                        <Icon name="Check" size={16} className="mr-2" />
                        Выучено
                      </>
                    ) : (
                      <>
                        <Icon name="Circle" size={16} className="mr-2" />
                        Отметить выученным
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dictionary" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Твой словарь
              </h2>
              <p className="text-muted-foreground">Все изученные слова в одном месте</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  className={`p-5 flex items-center justify-between transition-all hover:shadow-md ${
                    card.learned ? 'bg-accent/5 border-accent' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        card.learned ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon name={card.learned ? 'Check' : 'BookOpen'} size={24} />
                    </div>
                    <div>
                      <p className="text-xl font-heading font-semibold text-foreground">
                        {card.word}
                      </p>
                      <p className="text-muted-foreground">{card.translation}</p>
                    </div>
                  </div>
                  <Button
                    variant={card.learned ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => markAsLearned(card.id)}
                  >
                    {card.learned ? 'Забыл' : 'Выучил'}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Твой прогресс
              </h2>
              <p className="text-muted-foreground">Отслеживай свои достижения</p>
            </div>

            <Card className="p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-6xl font-heading font-bold text-primary mb-2">
                    {learnedCount}/{cards.length}
                  </p>
                  <p className="text-xl text-muted-foreground">слов выучено</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Общий прогресс</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-4" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Icon name="Target" size={32} className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{cards.length}</p>
                    <p className="text-sm text-muted-foreground">Всего слов</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <Icon name="CheckCircle2" size={32} className="mx-auto mb-2 text-accent" />
                    <p className="text-2xl font-bold text-foreground">{learnedCount}</p>
                    <p className="text-sm text-muted-foreground">Изучено</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Icon name="Clock" size={32} className="mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold text-foreground">
                      {cards.length - learnedCount}
                    </p>
                    <p className="text-sm text-muted-foreground">Осталось</p>
                  </div>
                </div>

                <div className="pt-6">
                  <img
                    src="https://cdn.poehali.dev/projects/b3eac451-e5ec-4b3d-bb16-704561fb7267/files/89f2868a-b861-4ea0-8f57-1507b8339bd8.jpg"
                    alt="English Tenses Timeline"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    Таблица времён английского языка
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="idioms" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Английские идиомы
              </h2>
              <p className="text-muted-foreground">Популярные выражения и их значения</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {idioms.map((item, index) => (
                <Card
                  key={item.id}
                  className="p-6 hover:shadow-lg transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Lightbulb" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                        {item.idiom}
                      </h3>
                      <p className="text-secondary font-medium">{item.meaning}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">Пример:</p>
                    <p className="text-foreground">{item.example}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grammar" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Грамматика
              </h2>
              <p className="text-muted-foreground">Основные грамматические темы</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grammarTopics.map((topic, index) => (
                <Card
                  key={topic.id}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={topic.icon as any} size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{topic.description}</p>
                      <Button variant="outline" size="sm" className="group">
                        Изучить
                        <Icon
                          name="ArrowRight"
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;