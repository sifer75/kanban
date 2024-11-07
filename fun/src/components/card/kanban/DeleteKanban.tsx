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
import { deleteKanban } from "@/lib/kanban.request";

const DeleteKanban = React.forwardRef<HTMLButtonElement, DialogCardDeleteProps>(
  (props, ref) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { id, title } = props;
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const mutation = useMutation({
      mutationFn: (id: number) => deleteKanban(id),
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
        queryClient.invalidateQueries({ queryKey: ["kanban"] });
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
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">Supprimer le kanban</DialogTitle>
            <DialogDescription>
              Cette action est irréversible !
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="username" className="text-right"></Label>
              Souhaitez vous supprimer ?
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={(event) => {
                event.stopPropagation();
                mutation.mutate(id);
              }}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default DeleteKanban;
