import { TableRow, TableCell } from '@/components/atoms/table';

type EmptyStateProps = {
  colSpan: number;
  message: string;
};

export const EmptyState = ({ colSpan, message }: EmptyStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  );
};
