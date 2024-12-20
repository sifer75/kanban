import { Button } from "@/components/ui/button";
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
import { TaskProps } from "@/lib/cards.utils";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/lib/task.request";
import { Plus } from "iconoir-react";

function CreateTask({ ...props }) {
  const queryClient = useQueryClient();
  const { elementId } = useParams<{ elementId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const mutation = useMutation({
    mutationFn: (data: TaskProps) => createTask(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} {...props}>
      <DialogTrigger asChild>
        <Button className="px-3 py-2 flex gap-2.5 rounded-xl">
          <Plus />
          <span className="text-sm font-normal">Nouvelle Tache</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Créer une task</DialogTitle>
          <DialogDescription>Ajouter une nouvelle task</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4 mb-2">
            <Label htmlFor="name" className="text-right">
              Titre
            </Label>
            <Input
              id="name"
              placeholder={`Nom du task`}
              className="col-span-3 text-gray-500"
              onChange={(e) => setTitle(e.target.value)}
              maxLength={25}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              placeholder={`Décrire la task`}
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              mutation.mutate({
                title,
                description,
                kanbanId: Number(elementId),
              });
            }}
          >
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
