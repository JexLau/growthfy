import React from 'react';
import * as LucideIcons from 'lucide-react';

interface EmptyStateProps {
  icon?: keyof typeof LucideIcons;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'AlertCircle',
  title,
  description,
  action,
}) => {
  const Icon = LucideIcons[icon] as React.ElementType;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && <Icon className="mb-4 h-12 w-12 text-slate-400" />}
      <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-white">{title}</h3>
      {description && <p className="mb-6 max-w-md text-slate-500 dark:text-slate-400">{description}</p>}
      {action}
    </div>
  );
};