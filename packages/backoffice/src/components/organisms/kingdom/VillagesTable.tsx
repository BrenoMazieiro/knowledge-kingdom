import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type Village = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  visibility: string;
  status: string;
  sortOrder: number;
  createdAt: string;
};

type VillagesTableProps = {
  villages: Village[];
  kingdomId: string;
  onCreateClick: () => void;
  onEditClick?: (village: Village) => void;
};

const statusVariant = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'default' as const;
    case 'BLOCKED': return 'destructive' as const;
    default: return 'secondary' as const;
  }
};

export const VillagesTable = ({ villages, kingdomId, onCreateClick, onEditClick }: VillagesTableProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Villages</CardTitle>
        <Button onClick={onCreateClick}>Create Village</Button>
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
              {onEditClick && <TableHead className="w-20">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {villages.map((village) => (
              <TableRow key={village.id}>
                <TableCell>
                  <Link
                    to={`/kingdoms/${kingdomId}/villages/${village.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {village.name}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {village.description ?? '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(village.status)}>{village.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{village.visibility}</Badge>
                </TableCell>
                <TableCell>{village.sortOrder}</TableCell>
                <TableCell>{new Date(village.createdAt).toLocaleDateString()}</TableCell>
                {onEditClick && (
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => onEditClick(village)}>
                      Edit
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {villages.length === 0 && (
              <EmptyState colSpan={onEditClick ? 7 : 6} message="No villages yet. Create one to get started." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
