// import './globals.css'
"use client";
import { useState } from "react";
import axios from "axios";
import { InputFile } from "@/components/input-file";
import { TypographyH1 } from "@/components/header-h1";
import { TypographyBlockquote } from "@/components/block-quote";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast({
        description: "Select an image",
      });
      setLoading(false);
      console.error("No file selected.");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      console.log(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL)
      const response = await axios.post(
        process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL || '',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setCaption(response.data.caption);
    } catch (error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        description: 'Network Error'
      })
      console.error("Error uploading image:", error);
    }
  };

  const handleFileChange = (event: any) => {
    setCaption('')
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(undefined);
    }
  };

  return (
    <div>
      <ModeToggle></ModeToggle>
      <TypographyH1></TypographyH1>
      <Avatar className="ml-60">
        <AvatarImage src={imagePreview}></AvatarImage>
      </Avatar>
      <InputFile
        handleFileChange={handleFileChange}
        handleImageUpload={handleImageUpload}
        loading={loading}
      ></InputFile>
      <TypographyBlockquote text={caption}></TypographyBlockquote>
    </div>
  );
}
