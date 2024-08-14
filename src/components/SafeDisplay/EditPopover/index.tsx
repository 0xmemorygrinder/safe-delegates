"use client";
import { FC, useMemo, useState } from "react";
import { 
  Button,
  PopoverTrigger,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  ButtonGroup,
  Stack,
  FormControl,
  FormLabel,
  Input } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export interface EditPopoverProps {
  label: string;
  onSave: (value: string) => void;
}

export const EditPopover: FC<EditPopoverProps> = ({ label, onSave }) => {
  const [value, setValue] = useState(label);
  const disabled = useMemo(() => value === label || value.trim().length === 0, [value, label]);

  return (
    <Popover
      placement='end-end'
    >
      <PopoverTrigger>
        <IconButton aria-label="edit" size='sm' variant="outline" color="white" icon={<EditIcon />} />
      </PopoverTrigger>
      <PopoverContent bg={"background.400"} color="white" p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="label">Label</FormLabel>
              <Input id={"label"} value={value} onChange={(e) => setValue(e.target.value)} />
            </FormControl>
            <ButtonGroup display='flex' justifyContent='flex-end'>
              <Button isDisabled={disabled} color="white" bg={disabled ? "primary.700" : "primary.500"} onClick={() => onSave(value)}>
                Save
              </Button>
            </ButtonGroup>
          </Stack>
      </PopoverContent>
    </Popover>
  )
}
