import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { Select, SelectOption } from '@/components/atoms/select';
import { Label } from '@/components/atoms/label';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/atoms/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/atoms/form';
import type { Question } from './QuestionsTable';

const formSchema = z.object({
  text: z.string().min(5, 'Question text must be at least 5 characters').max(1000),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  explanation: z.string().max(2000).optional(),
  option1Text: z.string().min(1, 'Option text is required'),
  option2Text: z.string().min(1, 'Option text is required'),
  option3Text: z.string().min(1, 'Option text is required'),
  option4Text: z.string().min(1, 'Option text is required'),
  correctOption: z.enum(['0', '1', '2', '3']),
});

type FormValues = z.infer<typeof formSchema>;

type EditQuestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
  onSubmit: (data: {
    id: string;
    version: number;
    text: string;
    difficulty: string;
    explanation?: string;
    options: { text: string; isCorrect: boolean }[];
  }) => Promise<void>;
  loading: boolean;
};

export const EditQuestionDialog = ({ open, onOpenChange, question, onSubmit, loading }: EditQuestionDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '', difficulty: 'EASY', explanation: '',
      option1Text: '', option2Text: '', option3Text: '', option4Text: '',
      correctOption: '0',
    },
  });

  useEffect(() => {
    if (question) {
      const sortedOptions = [...question.options].sort((a, b) => a.sortOrder - b.sortOrder);
      const correctIdx = sortedOptions.findIndex((o) => o.isCorrect);
      form.reset({
        text: question.text,
        difficulty: question.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        explanation: question.explanation ?? '',
        option1Text: sortedOptions[0]?.text ?? '',
        option2Text: sortedOptions[1]?.text ?? '',
        option3Text: sortedOptions[2]?.text ?? '',
        option4Text: sortedOptions[3]?.text ?? '',
        correctOption: String(correctIdx >= 0 ? correctIdx : 0) as '0' | '1' | '2' | '3',
      });
    }
  }, [question, form]);

  const handleSubmit = async (data: FormValues) => {
    if (!question) return;
    const optionTexts = [data.option1Text, data.option2Text, data.option3Text, data.option4Text];
    const correctIdx = parseInt(data.correctOption, 10);
    await onSubmit({
      id: question.id,
      version: question.version,
      text: data.text,
      difficulty: data.difficulty,
      explanation: data.explanation || undefined,
      options: optionTexts.map((text, i) => ({ text, isCorrect: i === correctIdx })),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>Update the question and options.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectOption value="EASY">Easy</SelectOption>
                      <SelectOption value="MEDIUM">Medium</SelectOption>
                      <SelectOption value="HARD">Hard</SelectOption>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              <Label>Options (select the correct one)</Label>
              {(['option1Text', 'option2Text', 'option3Text', 'option4Text'] as const).map((name, idx) => (
                <div key={name} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="correctOption"
                    render={({ field }) => (
                      <input
                        type="radio"
                        value={String(idx)}
                        checked={field.value === String(idx)}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Option ${idx + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
