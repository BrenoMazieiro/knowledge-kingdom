import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">This territory has not been discovered yet.</p>
      <Link to="/" className="text-primary underline">Return to the Kingdom</Link>
    </div>
  );
};
