import { Bell, ChevronRight, HelpCircle, LogOut, Mail, Phone, Shield, Smartphone } from "lucide-react";
import { CustomInstagram } from "@/domains/staff-dashboard";

const iconMap: any = {
  mail: Mail,
  shield: Shield,
  bell: Bell,
  help: HelpCircle,
  logout: LogOut,
  phone: Smartphone,
  instagram: CustomInstagram

};

export default function ListItem({
  icon,
  label,
  value,
}: {
  icon: keyof typeof iconMap;
  label: string;
  value?: string;
}) {
  const Icon = iconMap[icon];

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center">
          <Icon size={18} className="text-main" />
        </div>

        <div>
          <p className="text-xs text-else">{label}</p>
          {value && (
            <p className="text-sm text-main">{value}</p>
          )}
        </div>
      </div>

      <ChevronRight size={18} className="text-else" />
    </div>
  );
}
