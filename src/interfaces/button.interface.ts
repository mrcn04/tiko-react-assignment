export default interface IButton {
  type?: JSX.IntrinsicElements['button']['type'];
  name: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}
