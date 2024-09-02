import { DOMAINS } from "@/utils/config";
import { Select } from "@radix-ui/themes";

type Props = {
  domain: string;
  onChange: (domain: string) => void;
  className?: string;
};

export default function SelectDomain({ domain, onChange }: Props) {
  return (
    <Select.Root
      value={domain}
      onValueChange={(selectedDomain) => onChange(selectedDomain)}
      size="3"
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Domains</Select.Label>
          {DOMAINS.map((domain) => (
            <Select.Item key={domain} value={domain}>
              {domain}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
