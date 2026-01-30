import { Link } from 'react-router';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type Kingdom = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  visibility: string;
  status: string;
  sortOrder: number;
  createdAt: string;
};

type KingdomsTableProps = {
  kingdoms: Kingdom[];
  onEdit: (kingdom: Kingdom) => void;
  onDelete: (kingdom: Kingdom) => void;
};

export type { Kingdom };

const statusVariant = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'default' as const;
    case 'BLOCKED': return 'destructive' as const;
    default: return 'secondary' as const;
  }
};

export const KingdomsTable = ({ kingdoms, onEdit, onDelete }: KingdomsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Kingdoms</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kingdoms.map((kingdom) => (
              <TableRow key={kingdom.id}>
                <TableCell>
                  <Link to={`/kingdoms/${kingdom.id}`} className="font-medium text-primary hover:underline">
                    {kingdom.name}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {kingdom.description ?? '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(kingdom.status)}>{kingdom.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{kingdom.visibility}</Badge>
                </TableCell>
                <TableCell>{kingdom.sortOrder}</TableCell>
                <TableCell>{new Date(kingdom.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(kingdom)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(kingdom)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {kingdoms.length === 0 && (
              <EmptyState colSpan={7} message="No kingdoms found. Create your first kingdom to get started." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
