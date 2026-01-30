import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type BackofficeManager = {
  id: string;
  email: string;
  name: string;
  permissionLevel: string;
  createdAt: string;
};

type BMTableProps = {
  managers: BackofficeManager[];
};

const permissionVariant = (level: string) => {
  switch (level) {
    case 'ADMIN': return 'destructive' as const;
    case 'EDITOR': return 'default' as const;
    default: return 'secondary' as const;
  }
};

export const BMTable = ({ managers }: BMTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backoffice Managers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Permission Level</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell className="font-medium">{manager.name}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>
                  <Badge variant={permissionVariant(manager.permissionLevel)}>
                    {manager.permissionLevel}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(manager.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {managers.length === 0 && (
              <EmptyState colSpan={4} message="No managers found." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
