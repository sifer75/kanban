import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PencilLine } from "lucide-react";
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
import { DialogCardProps } from "@/lib/dialogCard.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkspace } from "@/lib/workspace.request";
import React, { useState } from "react";

const EditWorkspace = React.forwardRef<HTMLButtonElement, DialogCardProps>(
  (props, ref) => {
    const { titleCard, descriptionCard, id, onClose } = props;
    const queryClient = useQueryClient();
    const [title, setTitle] = useState<string>(titleCard ?? "");
    const [description, setDescription] = useState<string>(
      descriptionCard ?? ""
    );
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const mutation = useMutation({
      mutationFn: (data: { title: string; description: string; id: number }) =>
        updateWorkspace({
          id,
          title: data.title,
          description: data.description,
        }),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: async () => {
        setIsDialogOpen(false);
        if (onClose) onClose();
        queryClient.invalidateQueries({ queryKey: ["workspace"] });
      },
    });
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className="flex items-center justify-start px-2 py-1.5 rounded-sm h-8 w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <PencilLine className="w-4 h-4 mr-2" />
            Éditer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Modifier le nom du projet
            </DialogTitle>
            <DialogDescription>
              Modifier les informations du projet
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start gap-4 mb-2">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={title}
              placeholder={"Nom du projet"}
              className="col-span-3 text-gray-500"
              onChange={(e) => setTitle(e.target.value)}
              onClick={(event) => event.stopPropagation()}
            />
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea
              defaultValue={descriptionCard}
              placeholder={"Description du projet"}
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={(event) => {
                event.stopPropagation();
                mutation.mutate({
                  id: id,
                  title: title,
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
);

export default EditWorkspace;
