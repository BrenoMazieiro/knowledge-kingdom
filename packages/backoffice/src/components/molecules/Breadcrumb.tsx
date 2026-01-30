import { Link } from 'react-router';

type BreadcrumbItem = { label: string; href?: string };
type BreadcrumbProps = { items: BreadcrumbItem[] };

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground">{item.label}</Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
