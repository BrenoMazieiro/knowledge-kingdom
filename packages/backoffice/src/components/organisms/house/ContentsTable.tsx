import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type Content = {
  id: string;
  version: number;
  title: string;
  type: string;
  url: string | null;
  body: string | null;
  description: string | null;
  sortOrder: number;
  createdAt: string;
};

type ContentsTableProps = {
  contents: Content[];
  onCreateClick: () => void;
  onEditClick: (content: Content) => void;
  onDeleteClick: (content: Content) => void;
};

export const ContentsTable = ({ contents, onCreateClick, onEditClick, onDeleteClick }: ContentsTableProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Contents</CardTitle>
        <Button onClick={onCreateClick}>Add Content</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell><Badge variant="outline">{content.type}</Badge></TableCell>
                <TableCell className="max-w-xs truncate">
                  {content.url ? (
                    <a href={content.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {content.url}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Inline body</span>
                  )}
                </TableCell>
                <TableCell>{content.sortOrder}</TableCell>
                <TableCell>{new Date(content.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEditClick(content)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDeleteClick(content)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {contents.length === 0 && (
              <EmptyState colSpan={6} message="No content yet. Add some to get started." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
