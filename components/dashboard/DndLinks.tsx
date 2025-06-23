"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableLinkItem } from "./SortableLinkItem";
import { LinkType } from "@/data/links";

interface Props {
  links: LinkType[];
  onReorder: (newLinks: LinkType[]) => void;
}

export const DndLinks = ({ links, onReorder }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    const updated = arrayMove(links, oldIndex, newIndex);
    onReorder(updated);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={links.map((link) => link.id!)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {links.map((link) => (
            <SortableLinkItem key={link.id} link={link} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
