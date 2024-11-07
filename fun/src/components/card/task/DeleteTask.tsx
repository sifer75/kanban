import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { DialogCardDeleteProps } from "@/lib/dialogCard.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/lib/task.request";

const DeleteTask = React.forwardRef<HTMLButtonElement, DialogCardDeleteProps>(
  (props, ref) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { id, title } = props;
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const mutation = useMutation({
      mutationFn: (id: number) => deleteTask(id),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: async () => {
        toast({
          variant: "destructive",
          title: "Kanban supprimé",
          description: `Le projet ${title} a été supprimé`,
        });
        setIsDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["task"] });
      },
    });

    const handleDelete = () => {
      mutation.mutate(id);
      setIsDialogOpen(false);
    };

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} {...props}>
        <DialogTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className="flex items-center justify-start px-2 rounded-sm h-8 w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">{title}</DialogTitle>
            <DialogDescription>
              Cette action est irréversible !
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="username" className="text-right">
                souhaitez-vous supprimer ?
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => handleDelete()}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
export default DeleteTask;
