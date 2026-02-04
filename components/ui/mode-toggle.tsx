import { Button, buttonVariants } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { VariantProps } from 'class-variance-authority';

export function ModeToggle({ variant }: VariantProps<typeof buttonVariants>) {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <Button
      variant={variant}
      type="button"
      size="icon"
      className="cursor-pointer px-2"
      onClick={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] dark:block" />
    </Button>
  );
}
