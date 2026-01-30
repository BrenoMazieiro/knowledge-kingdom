import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table';
import { EmptyState } from '@/components/molecules/EmptyState';

type QuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  sortOrder: number;
};

type Question = {
  id: string;
  version: number;
  text: string;
  difficulty: string;
  explanation: string | null;
  sortOrder: number;
  createdAt: string;
  options: QuestionOption[];
};

type QuestionsTableProps = {
  questions: Question[];
  onCreateClick: () => void;
  onEditClick: (question: Question) => void;
  onDeleteClick: (question: Question) => void;
};

export type { Question, QuestionOption };

const difficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY': return 'secondary' as const;
    case 'HARD': return 'destructive' as const;
    default: return 'default' as const;
  }
};

export const QuestionsTable = ({ questions, onCreateClick, onEditClick, onDeleteClick }: QuestionsTableProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Questions</CardTitle>
        <Button onClick={onCreateClick}>Add Question</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Text</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Options</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="max-w-xs truncate font-medium">
                  {question.text}
                </TableCell>
                <TableCell>
                  <Badge variant={difficultyVariant(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>{question.options.length}</TableCell>
                <TableCell>{new Date(question.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEditClick(question)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDeleteClick(question)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {questions.length === 0 && (
              <EmptyState colSpan={5} message="No questions yet. Add some to get started." />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
