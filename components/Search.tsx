import {
  Cross2Icon,
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

type Props = {
  query: string;
  onChange: (query: string) => void;
  className?: string;
};

export default function Search({ query, onChange, className }: Props) {
  return (
    <TextField.Root
      placeholder="Search articles..."
      autoFocus
      className={`lg:w-[300px] w-[200px] ${className}`}
      onChange={(e) => onChange(e.target.value)}
      value={query}
      size="3"
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      {query && (
        <TextField.Slot>
          <Cross2Icon
            height="14"
            width="14"
            onClick={() => onChange("")}
            className="cursor-pointer"
          />
        </TextField.Slot>
      )}
    </TextField.Root>
  );
}
