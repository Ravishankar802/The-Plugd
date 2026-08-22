import {
  BadgeCheck,
  Car,
  Coffee,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  House,
  Lamp,
  Laptop,
  Plane,
  Rocket,
  Shirt,
  Smartphone,
  Sparkles,
  Ticket,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  BadgeCheck,
  Car,
  Coffee,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  House,
  Lamp,
  Laptop,
  Plane,
  Rocket,
  Shirt,
  Smartphone,
  Sparkles,
  Ticket,
};

interface CategoryIconProps extends Omit<LucideProps, "name"> {
  name?: string | null;
  iconName?: string | null;
}

export default function CategoryIcon({
  name,
  iconName,
  ...props
}: CategoryIconProps) {
  const target = name || iconName;
  const Icon = target && target in iconMap ? iconMap[target as keyof typeof iconMap] : Sparkles;
  return <Icon {...props} />;
}
