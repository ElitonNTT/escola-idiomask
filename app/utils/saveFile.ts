import { prisma } from "@/lib/prisma/prismaClient";
import { Image } from "@prisma/client";
import axios from "axios";
import { writeFileSync } from "fs";
import { extname } from "path";
import sharp from "sharp";
import { v4 } from "uuid";

export default async function saveFile(file: File): Promise<[string, Image?]> {
  const output = "/uploads/";
  const fileName = v4() + extname(file.name);
  const filePath = output + fileName;

  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(process.cwd() + "/public" + filePath, buffer);

  const body = new FormData();
  body.append("file", new Blob([buffer], { type: file.type }), fileName);

  try {
    const { data } = await axios.post(
      "https://vestibular.faculdadefama.edu.br/api/upload",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const url = `https://vestibular.faculdadefama.edu.br/api/${data.path}`;

    if (imageMimes.includes(file.type)) {
      const { width, height } = await sharp(buffer).metadata();
      const created = await prisma.image.create({
        data: { url, mime: file.type, width, height },
      });

      return [url, created];
    }

    return [url];
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

const imageMimes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml"];
