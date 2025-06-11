import * as React from 'react';
import { icons } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof icons;

interface IconPickerProps {
  value: IconName;
  onChange: (icon: IconName) => void;
  className?: string;
}

const iconList: IconName[] = [
  'House', 'Landmark', 'Wallet', 'Banknote', 'Car', 'TrainFront', 'Plane',
  'UtensilsCrossed', 'Coffee', 'Pizza', 'ShoppingBasket', 'Gift', 'Book',
  'GraduationCap', 'HeartPulse', 'Dumbbell', 'Briefcase', 'Ticket', 'Scissors', 'Wrench', 'Baby'
];

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const SelectedIcon = icons[value];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start font-normal gap-2", className)}
        >
          {SelectedIcon ? (
            <>
              <SelectedIcon className="h-4 w-4" />
              {value}
            </>
          ) : (
            'Selecione um ícone'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid grid-cols-8 gap-1">
          {iconList.map((iconName) => {
            const Icon = icons[iconName];
            return (
              <Button
                key={iconName}
                variant="outline"
                size="icon"
                onClick={() => {
                  onChange(iconName);
                  setIsOpen(false);
                }}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}