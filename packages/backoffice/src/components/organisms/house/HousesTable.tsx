import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type House = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  visibility: string;
  isFree: boolean;
  entryPrice: number | null;
  sortOrder: number;
  createdAt: string;
};

type HousesTableProps = {
  houses: House[];
  kingdomId: string;
  villageId: string;
  onCreateClick: () => void;
  onEditClick?: (house: House) => void;
};

export const HousesTable = ({ houses, kingdomId, villageId, onCreateClick, onEditClick }: HousesTableProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Houses</CardTitle>
        <Button onClick={onCreateClick}>Create House</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Free</TableHead>
              <TableHead>Entry Price</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Created</TableHead>
              {onEditClick && <TableHead className="w-20">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {houses.map((house) => (
              <TableRow key={house.id}>
                <TableCell>
                  <Link
                    to={`/kingdoms/${kingdomId}/villages/${villageId}/houses/${house.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {house.name}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {house.description ?? '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={house.isFree ? 'secondary' : 'default'}>
                    {house.isFree ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>{house.entryPrice != null ? `${house.entryPrice} Quills` : '-'}</TableCell>
                <TableCell>{house.sortOrder}</TableCell>
                <TableCell>{new Date(house.createdAt).toLocaleDateString()}</TableCell>
                {onEditClick && (
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => onEditClick(house)}>
                      Edit
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {houses.length === 0 && (
              <EmptyState colSpan={onEditClick ? 7 : 6} message="No houses yet. Create one to get started." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
