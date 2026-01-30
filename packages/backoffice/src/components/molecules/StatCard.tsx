import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';

type StatCardProps = {
  label: string;
  value: string | number;
};

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};
