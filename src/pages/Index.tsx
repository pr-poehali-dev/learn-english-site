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
  category?: string;
}

interface QuizQuestion {
  id: number;
  word: string;
  correctAnswer: string;
  options: string[];
}

interface QuizResult {
  score: number;
  total: number;
  date: string;
}

const initialCards: FlashCard[] = [
  { id: 1, word: 'Hello', translation: 'Привет', learned: false, category: 'Базовые' },
  { id: 2, word: 'World', translation: 'Мир', learned: false, category: 'Базовые' },
  { id: 3, word: 'Learn', translation: 'Учить', learned: false, category: 'Образование' },
  { id: 4, word: 'Study', translation: 'Изучать', learned: false, category: 'Образование' },
  { id: 5, word: 'Book', translation: 'Книга', learned: false, category: 'Образование' },
  { id: 6, word: 'Teacher', translation: 'Учитель', learned: false, category: 'Образование' },
  { id: 7, word: 'Student', translation: 'Ученик', learned: false, category: 'Образование' },
  { id: 8, word: 'School', translation: 'Школа', learned: false, category: 'Образование' },
  { id: 9, word: 'Friend', translation: 'Друг', learned: false, category: 'Люди' },
  { id: 10, word: 'Family', translation: 'Семья', learned: false, category: 'Люди' },
  { id: 11, word: 'Mother', translation: 'Мать', learned: false, category: 'Люди' },
  { id: 12, word: 'Father', translation: 'Отец', learned: false, category: 'Люди' },
  { id: 13, word: 'Brother', translation: 'Брат', learned: false, category: 'Люди' },
  { id: 14, word: 'Sister', translation: 'Сестра', learned: false, category: 'Люди' },
  { id: 15, word: 'House', translation: 'Дом', learned: false, category: 'Место' },
  { id: 16, word: 'City', translation: 'Город', learned: false, category: 'Место' },
  { id: 17, word: 'Country', translation: 'Страна', learned: false, category: 'Место' },
  { id: 18, word: 'Street', translation: 'Улица', learned: false, category: 'Место' },
  { id: 19, word: 'Water', translation: 'Вода', learned: false, category: 'Природа' },
  { id: 20, word: 'Sun', translation: 'Солнце', learned: false, category: 'Природа' },
  { id: 21, word: 'Moon', translation: 'Луна', learned: false, category: 'Природа' },
  { id: 22, word: 'Tree', translation: 'Дерево', learned: false, category: 'Природа' },
  { id: 23, word: 'Food', translation: 'Еда', learned: false, category: 'Еда' },
  { id: 24, word: 'Apple', translation: 'Яблоко', learned: false, category: 'Еда' },
  { id: 25, word: 'Bread', translation: 'Хлеб', learned: false, category: 'Еда' },
  { id: 26, word: 'Coffee', translation: 'Кофе', learned: false, category: 'Еда' },
  { id: 27, word: 'Time', translation: 'Время', learned: false, category: 'Абстрактное' },
  { id: 28, word: 'Life', translation: 'Жизнь', learned: false, category: 'Абстрактное' },
  { id: 29, word: 'Love', translation: 'Любовь', learned: false, category: 'Абстрактное' },
  { id: 30, word: 'Work', translation: 'Работа', learned: false, category: 'Абстрактное' },
  { id: 31, word: 'Day', translation: 'День', learned: false, category: 'Время' },
  { id: 32, word: 'Night', translation: 'Ночь', learned: false, category: 'Время' },
  { id: 33, word: 'Week', translation: 'Неделя', learned: false, category: 'Время' },
  { id: 34, word: 'Year', translation: 'Год', learned: false, category: 'Время' },
  { id: 35, word: 'Money', translation: 'Деньги', learned: false, category: 'Финансы' },
  { id: 36, word: 'Car', translation: 'Машина', learned: false, category: 'Транспорт' },
  { id: 37, word: 'Phone', translation: 'Телефон', learned: false, category: 'Технологии' },
  { id: 38, word: 'Computer', translation: 'Компьютер', learned: false, category: 'Технологии' },
  { id: 39, word: 'Happy', translation: 'Счастливый', learned: false, category: 'Эмоции' },
  { id: 40, word: 'Good', translation: 'Хороший', learned: false, category: 'Качества' },
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
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

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

  const generateQuiz = () => {
    const learnedWords = cards.filter((card) => card.learned);
    if (learnedWords.length < 4) {
      alert('Выучи минимум 4 слова для прохождения теста!');
      return;
    }

    const shuffled = [...learnedWords].sort(() => Math.random() - 0.5);
    const quizQuestions: QuizQuestion[] = shuffled.slice(0, Math.min(10, learnedWords.length)).map((card, index) => {
      const wrongAnswers = cards
        .filter((c) => c.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c) => c.translation);
      
      const options = [card.translation, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        id: index + 1,
        word: card.word,
        correctAnswer: card.translation,
        options,
      };
    });

    setCurrentQuiz(quizQuestions);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    
    if (answer === currentQuiz[currentQuestionIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < currentQuiz.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
        const result: QuizResult = {
          score: quizScore + (answer === currentQuiz[currentQuestionIndex].correctAnswer ? 1 : 0),
          total: currentQuiz.length,
          date: new Date().toLocaleDateString('ru-RU'),
        };
        setQuizResults((prev) => [...prev, result]);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuiz([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
  };

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
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-6 h-auto p-1">
            <TabsTrigger value="cards" className="flex flex-col gap-1 py-3">
              <Icon name="Layers" size={20} />
              <span className="text-xs">Карточки</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex flex-col gap-1 py-3">
              <Icon name="Brain" size={20} />
              <span className="text-xs">Тест</span>
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

          <TabsContent value="quiz" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Проверь свои знания
              </h2>
              <p className="text-muted-foreground">Пройди тест по выученным словам</p>
            </div>

            {!quizStarted ? (
              <Card className="p-12 max-w-2xl mx-auto text-center">
                <div className="space-y-6">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Icon name="Brain" size={48} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                      Готов к тестированию?
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      У тебя выучено {learnedCount} {learnedCount === 1 ? 'слово' : 'слов'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {learnedCount < 4
                        ? 'Выучи минимум 4 слова для прохождения теста'
                        : `Тест будет содержать до ${Math.min(10, learnedCount)} вопросов`}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={generateQuiz}
                    disabled={learnedCount < 4}
                    className="px-8"
                  >
                    Начать тест
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ) : quizFinished ? (
              <Card className="p-12 max-w-2xl mx-auto text-center">
                <div className="space-y-6">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
                      (quizScore / currentQuiz.length) * 100 >= 70
                        ? 'bg-accent/20'
                        : 'bg-destructive/20'
                    }`}
                  >
                    <Icon
                      name={(quizScore / currentQuiz.length) * 100 >= 70 ? 'Trophy' : 'Target'}
                      size={48}
                      className={
                        (quizScore / currentQuiz.length) * 100 >= 70
                          ? 'text-accent'
                          : 'text-destructive'
                      }
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                      Тест завершён!
                    </h3>
                    <p className="text-5xl font-heading font-bold text-primary mb-4">
                      {quizScore}/{currentQuiz.length}
                    </p>
                    <p className="text-xl text-muted-foreground">
                      {(quizScore / currentQuiz.length) * 100 >= 90
                        ? 'Превосходно! 🌟'
                        : (quizScore / currentQuiz.length) * 100 >= 70
                        ? 'Хорошая работа! 👍'
                        : 'Продолжай учить слова! 📚'}
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={resetQuiz} variant="outline">
                      <Icon name="X" size={20} className="mr-2" />
                      Закрыть
                    </Button>
                    <Button onClick={generateQuiz}>
                      <Icon name="RotateCw" size={20} className="mr-2" />
                      Пройти ещё раз
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-sm">
                      Вопрос {currentQuestionIndex + 1} из {currentQuiz.length}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Счёт: {quizScore}/{currentQuiz.length}
                    </div>
                  </div>

                  <Progress
                    value={((currentQuestionIndex + 1) / currentQuiz.length) * 100}
                    className="h-2"
                  />

                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-3">Переведи слово:</p>
                    <h3 className="text-5xl font-heading font-bold text-primary mb-2">
                      {currentQuiz[currentQuestionIndex]?.word}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {currentQuiz[currentQuestionIndex]?.options.map((option, index) => {
                      const isCorrect =
                        option === currentQuiz[currentQuestionIndex].correctAnswer;
                      const isSelected = selectedAnswer === option;
                      const showResult = selectedAnswer !== null;

                      return (
                        <Button
                          key={index}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResult}
                          variant={
                            showResult
                              ? isCorrect
                                ? 'default'
                                : isSelected
                                ? 'destructive'
                                : 'outline'
                              : 'outline'
                          }
                          className={`h-auto py-4 text-lg justify-start ${
                            showResult && isCorrect ? 'bg-accent hover:bg-accent' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              {showResult && isCorrect ? (
                                <Icon name="Check" size={20} />
                              ) : showResult && isSelected ? (
                                <Icon name="X" size={20} />
                              ) : (
                                <span className="font-semibold">{String.fromCharCode(65 + index)}</span>
                              )}
                            </div>
                            <span className="flex-1 text-left">{option}</span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            )}
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

                {quizResults.length > 0 && (
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      История тестов
                    </h3>
                    <div className="space-y-3">
                      {quizResults.slice(-5).reverse().map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                (result.score / result.total) * 100 >= 70
                                  ? 'bg-accent/20 text-accent'
                                  : 'bg-destructive/20 text-destructive'
                              }`}
                            >
                              <Icon
                                name={(result.score / result.total) * 100 >= 70 ? 'Trophy' : 'Target'}
                                size={20}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">
                                {result.score}/{result.total} правильных
                              </p>
                              <p className="text-sm text-muted-foreground">{result.date}</p>
                            </div>
                          </div>
                          <Badge
                            variant={(result.score / result.total) * 100 >= 70 ? 'default' : 'secondary'}
                          >
                            {Math.round((result.score / result.total) * 100)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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