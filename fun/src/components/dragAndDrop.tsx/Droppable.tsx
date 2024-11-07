import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}
const Droppable = ({ id, children }: DroppableProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ minHeight: "200px", padding: "10px", border: "2px dashed #ccc" }}
    >
      {children}
    </div>
  );
};

export default Droppable;
