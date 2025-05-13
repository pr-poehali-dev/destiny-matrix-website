import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";

interface DateInputProps {
  onCalculate: (date: string) => void;
  isLoading: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ onCalculate, isLoading }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      onCalculate(date.toISOString());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="ritual-circle"></div>

      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-destiny-softPurple font-cinzel tracking-wider"
        >
          Имя искателя тайн
        </Label>
        <Input
          id="name"
          placeholder="Введите ваше истинное имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="destiny-input text-destiny-softPurple placeholder:text-destiny-softPurple/40"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="birthdate"
          className="text-destiny-softPurple font-cinzel tracking-wider"
        >
          Дата вашего рождения
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal destiny-input text-destiny-softPurple flex items-center bg-opacity-60 backdrop-blur-sm"
            >
              <Icon name="Calendar" className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: ru })
              ) : (
                <span>Выберите дату вашего явления в этот мир</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-destiny-shadow border border-destiny-purple/30">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              initialFocus
              locale={ru}
              className="bg-destiny-shadow text-destiny-softPurple"
            />
          </PopoverContent>
        </Popover>
      </div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={!date || isLoading}
          className="w-full bg-destiny-mystic hover:bg-destiny-purple text-white transition-all border border-destiny-purple/50 shadow-[0_0_15px_rgba(138,75,175,0.3)]"
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
              Открытие астральных каналов...
            </>
          ) : (
            <>
              <span className="mr-2">⍟</span>
              Раскрыть тайны матрицы судьбы
              <span className="ml-2">⍟</span>
            </>
          )}
        </Button>
      </motion.div>

      <p className="text-xs text-center text-destiny-softPurple/50 italic mt-4">
        Внимание: познание истинной сущности может изменить восприятие
        реальности
      </p>
    </motion.form>
  );
};

export default DateInput;
