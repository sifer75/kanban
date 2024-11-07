import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KanbanProps } from "@/lib/cards.utils";
import { useNavigate } from "react-router-dom";
import EditKanban from "./EditKanban";
import DeleteKanban from "./DeleteKanban";
import { Calendar } from "iconoir-react";
import dayjs from "dayjs";

function KanbanCard({
  title,
  description,
  workspaceId,
  id,
  updateAt,
}: KanbanProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/workspace/${workspaceId}/${id}`);
  };

  function ReadDate({ updateAt }: { updateAt: Date }) {
    const formattedDate = dayjs(updateAt).format("DD MM YYYY");
    const formattedHour = dayjs(updateAt).format("HH");
    const formattedMinutes = dayjs(updateAt).format("mm");
    return (
      <p className="text-[#757575] text-sm">
        Modifié par Fabien le {formattedDate} à {formattedHour}h
        {formattedMinutes}
      </p>
    );
  }

  return (
    <div
      className="border-2 border-selectionButton flex flex-col gap-2.5 p-4 rounded-lg w-[427px] h-40"
      onClick={handleCardClick}
    >
      <div className="w-full flex justify-between items-center">
        <p className="overflow-hidden truncate">{title}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-4 h-4">
              <Calendar className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <EditKanban
                  titleCard={title}
                  id={id as number}
                  descriptionCard={description}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DeleteKanban title={title} id={id as number} />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="color-[#000000] w-full h-full overflow-hidden truncate">
        {description}
      </p>
      <ReadDate updateAt={updateAt as Date} />
    </div>
  );
}

export default KanbanCard;
