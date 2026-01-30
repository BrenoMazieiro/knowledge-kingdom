type FormErrorProps = {
  message: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
      {message}
    </div>
  );
};
