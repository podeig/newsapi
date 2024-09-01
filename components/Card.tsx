type Props = {
  children: React.ReactElement;
};

export default function Card({ children }: Props) {
  return <div>{children}</div>;
}
