import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type LeaderboardEntry = {
  userId: string;
  gameName: string;
  totalQuills: number;
  conquests: number;
  badgesEarned: number;
  rank: number;
};

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
};

export const LeaderboardTable = ({ entries }: LeaderboardTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Players</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Game Name</TableHead>
              <TableHead>Quills</TableHead>
              <TableHead>Conquests</TableHead>
              <TableHead>Badges</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.userId}>
                <TableCell>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-bold">
                    {entry.rank}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{entry.gameName}</TableCell>
                <TableCell>{entry.totalQuills.toLocaleString()}</TableCell>
                <TableCell>{entry.conquests}</TableCell>
                <TableCell>{entry.badgesEarned}</TableCell>
              </TableRow>
            ))}
            {entries.length === 0 && (
              <EmptyState colSpan={5} message="No leaderboard data yet." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
