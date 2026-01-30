import { Link } from 'react-router';
import { Button } from '@/components/atoms/button';

export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4">
      <h1 className="text-4xl font-bold">The Knowledge Kingdom</h1>
      <p className="max-w-md text-center text-muted-foreground">
        Backoffice portal. Manage kingdoms, villages, houses, and users.
      </p>
      <Button asChild>
        <Link to="/signin">Sign In</Link>
      </Button>
    </div>
  );
};
