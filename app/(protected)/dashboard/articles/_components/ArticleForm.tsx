"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { FaRegEdit } from "react-icons/fa";

import { useHandleAdminData } from "../_hooks/useHandleAdminData";
import { Admin, Post } from "@prisma/client";

type Props = {
  article?: Post;
};
function ArticleForm({ article }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { adminData, setAdminData, isPending, onSubmit } = useHandleAdminData({
    ...article,
  });

  return (
    <>
      <Button
        className={article ? "" : "w-36"}
        color={article ? "default" : "primary"}
        variant={article ? "light" : "solid"}
        size={article ? "sm" : "lg"}
        onPress={onOpen}
        isIconOnly={article ? false : true}
      >
        {article ? <FaRegEdit size={16} /> : "اضافة مقالة"}
      </Button>
      <Modal placeholder="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-2xl font-bold">
                  {article ? "تعديل" : "اضافة"} مقالة
                </h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  variant="bordered"
                  label="الاسم"
                  defaultValue={adminData.name}
                  onValueChange={(e) => {
                    setAdminData({ ...adminData, name: e });
                  }}
                />
                <Input
                  variant="bordered"
                  label="الايميل"
                  defaultValue={adminData.email}
                  onValueChange={(e) => {
                    setAdminData({ ...adminData, email: e });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  الغاء
                </Button>
                <Button
                  isLoading={isPending}
                  isDisabled={isPending || !adminData.name || !adminData.email}
                  color="primary"
                  onPress={async () => {
                    await onSubmit();
                    onClose();
                  }}
                >
                  {article ? "تعديل" : "اضافة"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ArticleForm;
