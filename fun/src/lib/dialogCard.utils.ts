export interface DialogCardProps {
  titleCard: string;
  descriptionCard: string;
  id: number;
  onClose?: () => void;
}

export interface DialogCardDeleteProps {
  title: string;
  id: number;
}
