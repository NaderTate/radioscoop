"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";

function ImagesSection({ image }: { image: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex justify-center">
        <Image
          alt="cover"
          width={1500}
          height={400}
          src="https://b.l3n.co/i/SB2Yqz.png"
          className="object-cover h-48 sm:h-96 w-screen brightness-90 shadow-lg shadow-blue-400/50 "
        />
      </div>
      <div className="flex justify-center">
        <Image
          onClick={onOpen}
          src={image}
          alt=""
          width={200}
          height={200}
          className="object-contain rounded-full w-40 sm:w-[20vw] -mt-24 shadow-lg shadow-blue-400/50 z-10 sticky cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-2 max-h-[95vh] w-fit">
          <ModalBody>
            <div className="flex justify-center">
              <Image
                src={image}
                alt=""
                width={500}
                height={500}
                className="rounded-md object-contain max-h-[90vh] w-full"
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImagesSection;
