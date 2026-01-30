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
  email: z.string().email('Must be a valid email'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  permissionLevel: z.enum(['VIEWER', 'EDITOR', 'ADMIN']),
});

type FormValues = z.infer<typeof formSchema>;

type InviteBMDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { email: string; name: string; permissionLevel: string }) => Promise<void>;
  loading: boolean;
};

export const InviteBMDialog = ({ open, onOpenChange, onSubmit, loading }: InviteBMDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', name: '', permissionLevel: 'VIEWER' },
  });

  const handleSubmit = async (data: FormValues) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Manager</DialogTitle>
          <DialogDescription>Invite a new backoffice manager.</DialogDescription>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissionLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission Level</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectOption value="VIEWER">Viewer</SelectOption>
                      <SelectOption value="EDITOR">Editor</SelectOption>
                      <SelectOption value="ADMIN">Admin</SelectOption>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Inviting...' : 'Invite'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
