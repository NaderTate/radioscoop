"use client";
import Dropzone from "@/components/dashboard/DropZone";
import { RxCross2 } from "react-icons/rx";
import { ChangeEvent, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Input } from "@/components/ui/input";
import { Image } from "@nextui-org/image";
function Card({ src, deleteImage }: { src: string; deleteImage: () => void }) {
  return (
    <div className="relative ">
      <RxCross2
        onClick={deleteImage}
        className="w-6 h-6 absolute right-0 top-0 bg-background rounded-bl-md cursor-pointer z-[2]"
      />

      {src && (
        <Image
          width={200}
          height={200}
          src={src}
          alt={"img"}
          className="rounded-md object-contain "
        />
      )}
    </div>
  );
}
function Day({
  updateData,
  removeDay,
  name,
  images,
}: {
  updateData: (name: string, images: { id: string; link: string }[]) => void;
  removeDay: (id: string) => void;
  name: string;
  images: { id: string; link: string }[];
}) {
  const [Images, setImages] = useState<{ id: string; link: string }[]>(images);
  const [uploading, setUploading] = useState(false);

  const deleteImg = (id: any) => {
    setImages((current: any) => current.filter((img: any) => img.id != id));
  };
  useEffect(() => {
    updateData(name, Images);
  }, [Images]);
  return (
    <div>
      <div className="flex justify-center ">
        <Input
          defaultValue={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateData(e.target.value, Images);
          }}
          placeholder="day"
          className="w-fit m-auto text-center border border-muted-foreground border-b-0"
        ></Input>
      </div>
      <div className="border border-muted-foreground rounded-md p-5 relative">
        <RxCross2
          onClick={removeDay}
          className="w-6 h-6 absolute right-0 top-0 bg-background rounded-bl-md cursor-pointer z-[2]"
        />
        {uploading && (
          <div>
            <p>Uploading...</p>
          </div>
        )}
        <div dir="ltr">
          <div
            className={`flex flex-wrap items-center ${
              images.length > 0 ? "justify-start" : "justify-center"
            } gap-5`}
          >
            <ReactSortable
              animation={150}
              list={Images}
              setList={setImages}
              className="flex flex-wrap gap-5 justify-start items-center mx-2"
            >
              {Images.map((image: { id: string; link: string }) => (
                <Card
                  key={image.id}
                  src={image.link}
                  deleteImage={() => {
                    deleteImg(image.id);
                  }}
                />
              ))}
            </ReactSortable>
            <Dropzone
              handleImages={async (file: File[]) => {
                setUploading(true);
                for (let i = 0; i < file.length; i++) {
                  const formData = new FormData();
                  formData.append("file", file[i]);
                  formData.append("upload_preset", "schedule");
                  const res = await fetch(
                    "https://api.cloudinary.com/v1_1//ddcjbeysn/image/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );
                  const data = await res.json();
                  setImages((current) => [
                    ...current,
                    { id: data.asset_id, link: data.secure_url },
                  ]);
                }
                setUploading(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Day;
