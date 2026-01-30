import { useState } from 'react';
import { useNavigate } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInInputSchema, type SignInInput } from '@kk/shared/schemas/auth';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/atoms/form';
import { FormError } from '@/components/molecules/FormError';

const BM_SIGN_IN_MUTATION = gql`
  mutation BMSignIn($input: BMSignInInput!) {
    bmSignIn(input: $input) {
      manager {
        id
        email
        name
        permissionLevel
      }
    }
  }
`;

export const SignInPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { refetch } = useAuth();
  const navigate = useNavigate();
  const [bmSignIn, { loading }] = useMutation(BM_SIGN_IN_MUTATION);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInInput) => {
    setServerError(null);
    try {
      await bmSignIn({ variables: { input: data } });
      await refetch();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Sign in failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">Enter your credentials to continue</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {serverError && <FormError message={serverError} />}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        Backoffice access only. Contact an admin for an invitation.
      </p>
    </div>
  );
};
