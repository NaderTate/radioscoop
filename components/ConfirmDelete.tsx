"use client";
import { useTransition } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  id: string;
  deleteAction: Function;
};

export default function ConfirmDelete({ id, deleteAction }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Button
        variant="light"
        color="danger"
        size="sm"
        isIconOnly
        onPress={onOpen}
      >
        <MdDeleteOutline size={20} />
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">هل أنت متأكد؟</h1>
                <h3 className="font-thin text-sm">
                  لا يمكنك التراجع عن هذا الإجراء
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10">
                  <Button color="danger" variant="light" onPress={onClose}>
                    الغاء
                  </Button>
                  <Button
                    isDisabled={isPending}
                    isLoading={isPending}
                    color="primary"
                    onPress={() => {
                      startTransition(() => {
                        deleteAction(id).then(() => {
                          onClose();
                        });
                      });
                    }}
                  >
                    حذف
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
