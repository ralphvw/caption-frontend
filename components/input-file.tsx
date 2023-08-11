import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { ButtonLoading } from "./button-loading";

export function InputFile({ handleFileChange, handleImageUpload, loading }:any) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 ml-60 mt-5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />{ loading ? <ButtonLoading></ButtonLoading> : 
      <Button type="submit" onClick={handleImageUpload}>Generate</Button> }
    </div>
  );
}
