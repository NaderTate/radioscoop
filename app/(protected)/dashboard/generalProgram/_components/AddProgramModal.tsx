"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Image,
  Spinner,
} from "@nextui-org/react";

import { useFetchSearchResults } from "../_hooks/useFetchSearchResults";

import { GoPlusCircle } from "react-icons/go";

const AddProgramModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { searchResults, fetchResults, addProgram, loading } =
    useFetchSearchResults();

  return (
    <>
      <Button
        color="primary"
        startContent={<GoPlusCircle />}
        className="my-5"
        onPress={onOpen}
      >
        اضافة برنامج
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent className="p-2 max-h-[90vh] overflow-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                اضافة برنامج
              </ModalHeader>
              <ModalBody>
                <Input
                  label="ابحث عن برنامج..."
                  variant="bordered"
                  onValueChange={fetchResults}
                />
                {loading && <Spinner />}
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Image width={100} height={100} src={result.img} />
                      <span>{result.name}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={async () => {
                        await addProgram(result.id);
                        onClose();
                      }}
                    >
                      اضافة
                    </Button>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  الغاء
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProgramModal;
