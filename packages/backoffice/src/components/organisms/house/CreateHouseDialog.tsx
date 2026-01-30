import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
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
  isFree: z.boolean(),
  entryPrice: z.string().optional(),
}).refine(
  (data) => data.isFree || (data.entryPrice && parseInt(data.entryPrice, 10) >= 0),
  { message: 'Entry price is required for paid houses', path: ['entryPrice'] },
);

type FormValues = z.infer<typeof formSchema>;

type CreateHouseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; description?: string; iconUrl?: string; visibility: string; isFree: boolean; entryPrice?: number }) => Promise<void>;
  loading: boolean;
};

export const CreateHouseDialog = ({ open, onOpenChange, onSubmit, loading }: CreateHouseDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '', iconUrl: '', visibility: 'PUBLIC', isFree: true, entryPrice: '' },
  });

  const isFree = form.watch('isFree');

  const handleSubmit = async (data: FormValues) => {
    await onSubmit({
      name: data.name,
      description: data.description || undefined,
      iconUrl: data.iconUrl || undefined,
      visibility: data.visibility,
      isFree: data.isFree,
      entryPrice: data.isFree ? undefined : parseInt(data.entryPrice ?? '0', 10),
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create House</DialogTitle>
          <DialogDescription>Add a new house to this village.</DialogDescription>
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
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="h-4 w-4 rounded-sm border-input"
                    />
                    <Label>Free</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isFree && (
              <FormField
                control={form.control}
                name="entryPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Price (Quills)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
