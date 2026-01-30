import { Link, useNavigate } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../../hooks/useAuth';
import { usePermission } from '../../hooks/usePermission';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';

const BM_SIGN_OUT_MUTATION = gql`
  mutation BMSignOut {
    bmSignOut
  }
`;

type NavItem = {
  label: string;
  href: string;
  adminOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Kingdoms', href: '/kingdoms' },
  { label: 'Users', href: '/users' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Managers', href: '/managers', adminOnly: true },
];

const permissionBadgeVariant = (level: string) => {
  switch (level) {
    case 'ADMIN': return 'destructive' as const;
    case 'EDITOR': return 'default' as const;
    default: return 'secondary' as const;
  }
};

export const Navbar = () => {
  const { user } = useAuth();
  const { isAdmin } = usePermission();
  const navigate = useNavigate();
  const [bmSignOut] = useMutation(BM_SIGN_OUT_MUTATION);

  const handleSignOut = async () => {
    await bmSignOut();
    navigate('/signin', { replace: true });
    window.location.reload();
  };

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-xl font-bold">
            The Knowledge Kingdom
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <Badge variant={permissionBadgeVariant(user.permissionLevel)}>
                {user.permissionLevel}
              </Badge>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
