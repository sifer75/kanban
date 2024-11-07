import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { WorkspaceProps } from "@/lib/cards.utils";
import { createWorkspace } from "@/lib/workspace.request";
import { Plus } from "iconoir-react";

function CreateWorkspace() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (data: WorkspaceProps) => createWorkspace(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
      setIsDialogOpen(false);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="p-0 m-0 w-4.5 h-4.5">
          <Plus className="w-4.5 h-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Créer un workspace</DialogTitle>
          <DialogDescription>Ajouter un nouveau workspace</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-4 mb-2">
            <Label htmlFor="name" className="text-right">
              Titre
            </Label>
            <Input
              id="name"
              placeholder={`Nom du workspace`}
              className="col-span-3 text-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={23}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              placeholder={`Décrire le workspace`}
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkspace;
