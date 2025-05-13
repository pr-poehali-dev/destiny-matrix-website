
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Icon from '@/components/ui/icon';

interface DateInputProps {
  onCalculate: (date: string) => void;
  isLoading: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ onCalculate, isLoading }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      onCalculate(date.toISOString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Ваше имя (опционально)</Label>
        <Input
          id="name"
          placeholder="Введите ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="destiny-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthdate">Дата рождения</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !date && 'text-muted-foreground'
              } destiny-input flex items-center`}
            >
              <Icon name="Calendar" className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP', { locale: ru }) : <span>Выберите дату рождения</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              initialFocus
              locale={ru}
              className="rounded-lg border shadow-md"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        type="submit"
        disabled={!date || isLoading}
        className="w-full bg-destiny-purple hover:bg-destiny-purple/90 text-white transition-all"
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            Расчет...
          </>
        ) : (
          'Рассчитать матрицу судьбы'
        )}
      </Button>
    </form>
  );
};

export default DateInput;
