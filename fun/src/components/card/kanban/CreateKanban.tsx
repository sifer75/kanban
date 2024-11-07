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
import { KanbanProps } from "@/lib/cards.utils";
import { createKanban } from "@/lib/kanban.request";
import { useParams } from "react-router-dom";
import { Plus } from "iconoir-react";
import { Textarea } from "@/components/ui/textarea";

function CreateKanban() {
  const queryClient = useQueryClient();
  const { workspaceId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const mutation = useMutation({
    mutationFn: (data: KanbanProps) => createKanban(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["kanban", workspaceId],
      });
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="px-3 py-2 flex gap-2.5 rounded-xl">
          <Plus />
          <span className="text-sm font-normal">Nouveau</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Créer un kanban</DialogTitle>
          <DialogDescription>Ajouter un nouveau kanban</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4 mb-2">
            <Label htmlFor="name" className="text-right">
              Titre
            </Label>
            <Input
              id="name"
              placeholder={`Nom du kanban`}
              className="col-span-3 text-gray-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>{" "}
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
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              if (!workspaceId) return;
              const id = Number(workspaceId);
              mutation.mutate({
                title,
                workspaceId: id,
                description: description,
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

export default CreateKanban;
