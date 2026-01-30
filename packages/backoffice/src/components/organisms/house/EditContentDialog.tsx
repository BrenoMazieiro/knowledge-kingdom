import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { Select, SelectOption } from '@/components/atoms/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/atoms/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/atoms/form';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  type: z.enum(['BOOK', 'VIDEO', 'ARTICLE']),
  url: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  body: z.string().max(50000).optional(),
  description: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

type EditContentData = {
  id: string;
  version: number;
  title: string;
  type: string;
  url: string | null;
  body: string | null;
  description: string | null;
};

type EditContentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: EditContentData | null;
  onSubmit: (data: { id: string; version: number; title?: string; type?: string; url?: string; body?: string; description?: string }) => Promise<void>;
  loading: boolean;
};

export const EditContentDialog = ({ open, onOpenChange, content, onSubmit, loading }: EditContentDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', type: 'BOOK', url: '', body: '', description: '' },
  });

  useEffect(() => {
    if (content) {
      form.reset({
        title: content.title,
        type: content.type as 'BOOK' | 'VIDEO' | 'ARTICLE',
        url: content.url ?? '',
        body: content.body ?? '',
        description: content.description ?? '',
      });
    }
  }, [content, form]);

  const handleSubmit = async (data: FormValues) => {
    if (!content) return;
    await onSubmit({
      id: content.id,
      version: content.version,
      title: data.title,
      type: data.type,
      url: data.url || undefined,
      body: data.body || undefined,
      description: data.description || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
          <DialogDescription>Update the content details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectOption value="BOOK">Book</SelectOption>
                      <SelectOption value="VIDEO">Video</SelectOption>
                      <SelectOption value="ARTICLE">Article</SelectOption>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL (optional)</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
