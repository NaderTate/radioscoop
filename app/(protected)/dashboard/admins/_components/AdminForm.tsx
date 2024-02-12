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

import { Admin } from "@prisma/client";

import { FaRegEdit } from "react-icons/fa";

import { useHandleAdminData } from "../_hooks/useHandleAdminData";

type Props = {
  admin?: Admin;
};
function AdminForm({ admin }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { adminData, setAdminData, isPending, onSubmit } = useHandleAdminData({
    ...admin,
  });
  return (
    <>
      <Button
        className={admin ? "" : "w-36"}
        color={admin ? "default" : "primary"}
        variant={admin ? "light" : "solid"}
        size={admin ? "sm" : "lg"}
        onPress={onOpen}
        isIconOnly={admin ? false : true}
      >
        {admin ? (
          <FaRegEdit className="cursor-pointer" size={16} />
        ) : (
          "اضافة مشرف"
        )}
      </Button>
      <Modal placeholder="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-2xl font-bold">
                  {admin ? "تعديل" : "اضافة"} مشرف
                </h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  variant="bordered"
                  label="الاسم"
                  defaultValue={adminData.email}
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
                <Input
                  variant="bordered"
                  label="الباسوورد"
                  defaultValue={adminData.password}
                  onValueChange={(e) => {
                    setAdminData({ ...adminData, password: e });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  الغاء
                </Button>
                <Button
                  isLoading={isPending}
                  isDisabled={
                    isPending || !adminData.password || !adminData.email
                  }
                  color="primary"
                  onPress={async () => {
                    await onSubmit();
                    onClose();
                  }}
                >
                  {admin ? "تعديل" : "اضافة"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminForm;
