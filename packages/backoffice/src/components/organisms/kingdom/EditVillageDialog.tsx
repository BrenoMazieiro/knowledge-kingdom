import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Select, SelectOption } from '@/components/atoms/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/atoms/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/atoms/form';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  iconUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
});

type FormValues = z.infer<typeof formSchema>;

type EditVillageData = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  visibility: string;
};

type EditVillageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  village: EditVillageData | null;
  onSubmit: (data: { id: string; version: number; name: string; description?: string; iconUrl?: string; visibility?: string }) => Promise<void>;
  loading: boolean;
};

export const EditVillageDialog = ({ open, onOpenChange, village, onSubmit, loading }: EditVillageDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '', iconUrl: '', visibility: 'PUBLIC' },
  });

  useEffect(() => {
    if (village) {
      form.reset({
        name: village.name,
        description: village.description ?? '',
        iconUrl: '',
        visibility: (village.visibility as 'PUBLIC' | 'PRIVATE') ?? 'PUBLIC',
      });
    }
  }, [village, form]);

  const handleSubmit = async (data: FormValues) => {
    if (!village) return;
    await onSubmit({
      id: village.id,
      version: village.version,
      name: data.name,
      description: data.description || undefined,
      iconUrl: data.iconUrl || undefined,
      visibility: data.visibility,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Village</DialogTitle>
          <DialogDescription>Update the village details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectOption value="PUBLIC">Public</SelectOption>
                      <SelectOption value="PRIVATE">Private</SelectOption>
                    </Select>
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
