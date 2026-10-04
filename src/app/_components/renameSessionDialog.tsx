'use client';

import { useState, useActionState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSpinner } from 'react-icons/fa6';
import { Field, FieldError } from '@/components/ui/field';
import { renameSessionAction } from '../actions';
import { renameSessionResponse } from '@/constants/chat';
import { toast } from 'sonner';

export const RenameSessionDialog = ({
  id,
  children,
  onSuccess,
}: {
  id: string;
  children: React.ReactNode;
  onSuccess: (newTitle: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(renameSessionAction, renameSessionResponse);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (state.success) {
      onSuccess(title);
      toast.success('Sessão renomeada com sucesso');
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Renomear Conversa</DialogTitle>
          <DialogDescription>
            Escolha um novo título para identificar facilmente esta conversa depois.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-2" action={formAction}>
          <Field>
            <Input
              name="title"
              type="text"
              placeholder="Digite o novo título..."
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <input name="id" type="hidden" value={id} />
            {!state.success && state.errors?.title && <FieldError>{state.errors.title}</FieldError>}
          </Field>

          <DialogFooter>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
              {pending ? (
                <>
                  <FaSpinner className="h-4 w-4 animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                'Salvar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
